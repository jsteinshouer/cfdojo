define("ace/mode/cold_fusion_component_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var ColdFusionComponentHighlightRules = function() {

    this.$rules = {
        start: [{
            token: [
                "punctuation.definition.tag.cf.begin.cfml",
                "entity.name.tag.cf.component.cfml"
            ],
            regex: /(?:^\s+)?(<)(cfcomponent)(?![^>]*\/>)/,
            caseInsensitive: true,
            push: [{
                token: [
                    "punctuation.definition.tag.cf.begin.cfml",
                    "entity.name.tag.cf.component.cfml",
                    "punctuation.definition.tag.cf.end.cfml"
                ],
                regex: /(<\/)(cfcomponent)(>)(?:\s*$)?/,
                caseInsensitive: true,
                next: "pop"
            }, {
                token: "meta.tag.block.cf.component.cfml",
                regex: "(?<=cfcomponent)\\s",
                TODO: "FIXME: regexp doesn't have js equivalent",
                originalRegex: "(?<=cfcomponent)\\s",
                push: [{
                    token: "meta.tag.block.cf.component.cfml",
                    regex: /(?=>)/,
                    next: "pop"
                }, {
                    include: "#tag-stuff"
                }, {
                    defaultToken: "meta.tag.block.cf.component.cfml"
                }]
            }, {
                token: "punctuation.definition.tag.cf.end.cfml",
                regex: />/,
                push: [{
                    token: "text",
                    regex: /(?=<\/cfcomponent)/,
                    caseInsensitive: true,
                    next: "pop"
                }, {
                    include: "text.html.cfm"
                }]
            }, {
                defaultToken: "text.html.cfm.embedded.cfml"
            }]
        }, {
            include: "#cfcomments"
        }, {
            include: "source.cfscript"
        }],
        "#cfcomments": [{
            token: "comment.line.cfml",
            regex: /<!---.*--->/
        }, {
            token: "punctuation.definition.comment.cfml",
            regex: /<!---/,
            push: [{
                token: "punctuation.definition.comment.cfml",
                regex: /--->/,
                next: "pop"
            }, {
                include: "#cfcomments"
            }, {
                defaultToken: "comment.block.cfml"
            }]
        }],
        "#tag-stuff": [{
            include: "#tag-generic-attribute"
        }, {
            include: "#string-double-quoted"
        }, {
            include: "#string-single-quoted"
        }],
        "#tag-generic-attribute": [{
            token: "entity.other.attribute-name.html",
            regex: /\b[a-zA-Z\-:]+/
        }],
        "#string-double-quoted": [{
            token: "punctuation.definition.string.begin.html",
            regex: /"/,
            push: [{
                token: "punctuation.definition.string.end.html",
                regex: /"/,
                next: "pop"
            }, {
                include: "#entities"
            }, {
                defaultToken: "string.quoted.double.html"
            }]
        }],
        "#string-single-quoted": [{
            token: "punctuation.definition.string.begin.html",
            regex: /'/,
            push: [{
                token: "punctuation.definition.string.end.html",
                regex: /'/,
                next: "pop"
            }, {
                include: "#entities"
            }, {
                defaultToken: "string.quoted.single.html"
            }]
        }],
        "#entities": [{
            token: [
                "punctuation.definition.entity.html",
                "constant.character.entity.html",
                "punctuation.definition.entity.html"
            ],
            regex: /(&)([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+)(;)/
        }, {
            token: "invalid.illegal.bad-ampersand.html",
            regex: /&/
        }]
    }
    
    this.normalizeRules();
};

ColdFusionComponentHighlightRules.metaData = {
    fileTypes: ["cfc"],
    firstLineMatch: "",
    foldingStartMarker: "",
    foldingStopMarker: "",
    keyEquivalent: "",
    name: "ColdFusion Component",
    scopeName: "source.cfscript.cfc"
}


oop.inherits(ColdFusionComponentHighlightRules, TextHighlightRules);

exports.ColdFusionComponentHighlightRules = ColdFusionComponentHighlightRules;
});

define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

define("ace/mode/cold_fusion_component",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/cold_fusion_component_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var ColdFusionComponentHighlightRules = require("./cold_fusion_component_highlight_rules").ColdFusionComponentHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = ColdFusionComponentHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/cold_fusion_component"
}).call(Mode.prototype);

exports.Mode = Mode;
});
