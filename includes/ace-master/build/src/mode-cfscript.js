define("ace/mode/cfscript_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var CFScriptHighlightRules = function() {

    this.$rules = {
        start: [{
            include: "#comments"
        }, {
            include: "#cfcomments"
        }, {
            include: "#component-operators"
        }, {
            include: "#functions"
        }, {
            include: "#tag-operators"
        }, {
            include: "#cfscript-code"
        }],
        "#cfscript-code": [{
            include: "#braces"
        }, {
            include: "#closures"
        }, {
            include: "#sql-code"
        }, {
            include: "#keywords"
        }, {
            include: "#function-call"
        }, {
            include: "#constants"
        }, {
            include: "#variables"
        }, {
            include: "#strings"
        }],
        "#closures": [{
            token: "storage.closure.cfscript",
            regex: /\bfunction\b/,
            caseInsensitive: true,
            push: [{
                token: "meta.closure.cfscript",
                regex: /(?={)/,
                next: "pop"
            }, {
                include: "#parameters"
            }, {
                defaultToken: "meta.closure.cfscript"
            }]
        }],
        "#functions": [{
            token: [
                "meta.function.cfscript",
                "storage.modifier.access-control.cfscript",
                "meta.function.cfscript",
                "storage.type.return-type.void.cfscript",
                "storage.type.return-type.primitive.cfscript",
                "storage.type.return-type.object.cfscript",
                "meta.function.cfscript",
                "storage.type.function.cfscript",
                "meta.function.cfscript",
                "entity.name.function.constructor.cfscript",
                "entity.name.function.cfscript"
            ],
            regex: /^(\s*)(?:\b(private|package|public|remote)(\s+))?(?:\b(void)|(any|array|binary|boolean|component|date|guid|numeric|query|string|struct|xml|uuid)|([A-Za-z0-9_\.$]+))?(\s*)(function)(\s+)(?:(init)|([\w\$]+))\b/,
            caseInsensitive: true,
            push: [{
                token: "meta.function.cfscript",
                regex: /(?={)/,
                next: "pop"
            }, {
                include: "#parameters"
            }, {
                include: "#comments"
            }, {
                include: "#function-properties"
            }, {
                include: "#cfscript-code"
            }, {
                defaultToken: "meta.function.cfscript"
            }]
        }],
        "#parameters": [{
            token: "punctuation.definition.parameters.begin.cfscript",
            regex: /\(/,
            push: [{
                token: "punctuation.definition.parameters.end.cfscript",
                regex: /\)/,
                next: "pop"
            }, {
                token: "keyword.other.required.argument.cfscript",
                regex: /required/,
                caseInsensitive: true
            }, {
                include: "#storage-types"
            }, {
                token: "keyword.operator.argument-assignment.cfscript",
                regex: /=/
            }, {
                token: "constant.language.boolean.argument.cfscript",
                regex: /false|true|no|yes/,
                caseInsensitive: true
            }, {
                token: "variable.parameter.cfscript",
                regex: /\w/,
                caseInsensitive: true
            }, {
                token: "punctuation.definition.seperator.parameter.cfscript",
                regex: /,/
            }, {
                include: "#strings"
            }, {
                defaultToken: "meta.function.parameters.cfscript"
            }]
        }],
        "#function-properties": [{
            token: "entity.other.attribute-name.output.cfscript",
            regex: /\boutput/,
            caseInsensitive: true
        }, {
            token: "entity.other.attribute-name.any.cfscript",
            regex: /\b[\w]+/
        }],
        "#braces": [{
            token: "meta.brace.curly.cfscript",
            regex: /{|}/
        }, {
            token: "meta.brace.round.cfscript",
            regex: /\(|\)/
        }, {
            todo: {
                token: [
                    "variable.other.set.cfscript",
                    "text",
                    "punctuation.definition.set.begin.cfscript"
                ],
                regex: /((?:[\w]+)?)(\s*)(\[)/,
                push: [{
                    token: "punctuation.definition.set.end.cfscript",
                    regex: /\]/,
                    next: "pop"
                }, {
                    include: "#strings"
                }, {
                    token: "punctuation.definition.set.seperator.cfscript",
                    regex: /,/
                }, {
                    include: "$self"
                }]
            }
        }],
        "#tag-operators": [{
            token: "keyword.control.operator.conditional.cfscript",
            regex: /\b(?:else\s+if|else|if)\b/
        }, {
            token: "keyword.control.operator.switch.cfscript",
            regex: /\b(?:switch|case|default)\b/
        }, {
            token: [
                "meta.operator.cfscript",
                "entity.name.tag.operator.lock.cfscript",
                "entity.name.tag.operator.transaction.cfscript",
                "entity.name.tag.operator.thread.cfscript",
                "keyword.control.operator.abort.cfscript",
                "keyword.control.operator.exit.cfscript",
                "entity.name.tag.operator.include.cfscript",
                "entity.name.tag.operator.param.cfscript",
                "entity.name.tag.operator.thread.cfscript",
                "entity.name.tag.operator.import.cfscript",
                "keyword.control.operator.catch-exception.cfscript",
                "entity.name.tag.operator.property.cfscript",
                "entity.name.tag.operator.interface.cfscript",
                "entity.name.tag.operator.location.cfscript",
                "keyword.control.operator.break.cfscript",
                "entity.name.tag.operator.pageencoding.cfscript",
                "entity.name.tag.operator.schedule.cfscript",
                "keyword.control.operator.return.cfscript",
                "keyword.control.operator.catch-exception.cfscript",
                "keyword.control.operator.loop.cfscript",
                "entity.name.tag.operator.trace.cfscript",
                "entity.name.tag.operator.savecontent.cfscript",
                "entity.name.tag.operator.http.cfscript",
                "meta.operator.cfscript"
            ],
            regex: /^([\s}]*)(?:(lock)|(transaction)|(thread)|(abort)|(exit)|(include)|(param)|(thread)|(import)|(rethrow|throw)|(property)|(interface)|(location)|(break)|(pageencoding)|(schedule)|(return)|(try|catch|finally)|(for|in|do|while|break|continue)|(trace)|(savecontent)|(http|httpparam))\b(\s*)(?![^\w|"|'|\(|{|;])/,
            caseInsensitive: true,
            push: [{
                token: [
                    "punctuation.terminator.cfscript",
                    "meta.operator.cfscript"
                ],
                regex: /(;)|({)/,
                next: "pop"
            }, {
                token: "meta.brace.curly.cfscript",
                regex: /\(/,
                push: [{
                    token: "meta.brace.curly.cfscript",
                    regex: /\)/,
                    next: "pop"
                }, {
                    token: "punctuation.definition.seperator.arguments.cfscript",
                    regex: /,/
                }, {
                    token: "entity.other.operator-parameter.cfscript",
                    regex: /\w+\s*(?=\=)/,
                    caseInsensitive: true
                }, {
                    include: "#cfscript-code"
                }]
            }, {
                token: "entity.other.attribute-name.cfscript",
                regex: /\w+\s*(?=\=)/,
                caseInsensitive: true
            }, {
                include: "#cfcomments"
            }, {
                include: "#comments"
            }, {
                include: "#cfscript-code"
            }, {
                defaultToken: "meta.operator.cfscript"
            }]
        }],
        "#component-operators": [{
            token: [
                "entity.name.tag.operator.component.cfscript",
                "meta.operator.cfscript meta.class.component.cfscript"
            ],
            regex: /\b(component)\b(\s+)(?![\.\/>=,#\)])/,
            caseInsensitive: true,
            push: [{
                token: "meta.operator.cfscript meta.class.component.cfscript",
                regex: /(?=[;{\(])/,
                next: "pop"
            }, {
                include: "#component-extends-attribute"
            }, {
                token: "entity.other.attribute-name.cfscript",
                regex: /\w+\s*(?=\=)/,
                caseInsensitive: true
            }, {
                include: "#cfscript-code"
            }, {
                defaultToken: "meta.operator.cfscript meta.class.component.cfscript"
            }]
        }],
        "#component-extends-attribute": [{
            token: [
                "entity.name.tag.operator-attribute.extends.cfml",
                "meta.component.attribute-with-value.extends.cfml",
                "keyword.operator.assignment.cfscript",
                "meta.component.attribute-with-value.extends.cfml"
            ],
            regex: /\b(extends)\b(\s*)(=)(\s*)(?=")/,
            push: [{
                token: [],
                regex: /(?=[\s{])/,
                next: "pop"
            }, {
                token: "punctuation.definition.string.begin.cfscript",
                regex: /"/,
                push: [{
                    token: "punctuation.definition.string.end.cfscript",
                    regex: /"/,
                    next: "pop"
                }, {
                    defaultToken: "string.quoted.double.cfml"
                }]
            }, {
                token: "punctuation.definition.string.begin.cfscript",
                regex: /'/,
                push: [{
                    token: "punctuation.definition.string.end.cfscript",
                    regex: /'/,
                    next: "pop"
                }, {
                    defaultToken: "string.quoted.single.cfscript"
                }]
            }, {
                defaultToken: "meta.component.attribute-with-value.extends.cfml"
            }]
        }],
        "#storage-types": [{
            token: "storage.type.primitive.cfscript",
            regex: /\b(?:function|string|date|struct|array|void|binary|numeric|boolean|query|xml|uuid|any)\b/,
            caseInsensitive: true
        }],
        "#constants": [{
            token: "constant.numeric.cfscript",
            regex: /(?:\b[0-9]+|\.[0-9]+[0-9\.]*|0(?:x|X)[0-9a-fA-F]+|\.[0-9]+(?:(?:e|E)(?:\+|-)?[0-9]+)?(?:[LlFfUuDd]|UL|ul)?)\b/
        }, {
            token: "constant.language.cfscript",
            regex: /\b(?:true|false|null)\b/,
            caseInsensitive: true
        }, {
            token: "constant.other.cfscript",
            regex: /\b_?[A-Z][A-Z0-9_]+\b/
        }],
        "#comments": [{
            token: "punctuation.definition.comment.cfscript",
            regex: /\/\*\*\//
        }, {
            include: "text.html.javadoc"
        }, {
            include: "#comment-block"
        }, {
            token: [
                "punctuation.definition.comment.cfscript",
                "comment.line.double-slash.cfscript",
                "text"
            ],
            regex: /(\/\/)(.*?[^\s])(\s*$)/
        }],
        "#comment-block": [{
            token: "punctuation.definition.comment.cfscript",
            regex: /\/\*/,
            push: [{
                token: "punctuation.definition.comment.cfscript",
                regex: /\*\//,
                next: "pop"
            }, {
                defaultToken: "comment.block.cfscript"
            }]
        }],
        "#strings": [{
            include: "#string-quoted-double"
        }, {
            include: "#string-quoted-single"
        }],
        "#string-quoted-double": [{
            token: "punctuation.definition.string.begin.cfscript",
            regex: /"/,
            push: [{
                token: "punctuation.definition.string.end.cfscript",
                regex: /"(?!")/,
                next: "pop"
            }, {
                token: "constant.character.escape.quoted.double.cfscript",
                regex: /""/
            }, {
                include: "#nest_hash"
            }, {
                defaultToken: "string.quoted.double.cfscript"
            }]
        }],
        "#string-quoted-single": [{
            token: "punctuation.definition.string.begin.cfscript",
            regex: /'/,
            push: [{
                token: "punctuation.definition.string.end.cfscript",
                regex: /'(?!')/,
                next: "pop"
            }, {
                token: "constant.character.escape.quoted.single.cfscript",
                regex: /''/
            }, {
                include: "#nest_hash"
            }, {
                defaultToken: "string.quoted.single.cfscript"
            }]
        }],
        "#keywords": [{
            token: "keyword.other.new.cfscript",
            regex: /\bnew\b/,
            caseInsensitive: true
        }, {
            token: "keyword.operator.comparison.cfscript",
            regex: /===?|!|!=|<=|>=|<|>/
        }, {
            token: "keyword.operator.decision.cfscript",
            regex: /\b(?:GREATER|LESS|THAN|EQUAL\s+TO|DOES|CONTAINS|EQUAL|EQ|NEQ|LT|LTE|LE|GT|GTE|GE|AND|IS)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.operator.increment-decrement.cfscript",
            regex: /\-\-|\+\+/
        }, {
            token: "keyword.operator.arithmetic.cfscript",
            regex: /(?:\^|\-|\+|\*|\/|\\|%|\-=|\+=|\*=|\/=|%=|\bMOD\b)/,
            caseInsensitive: true
        }, {
            token: "keyword.operator.concat.cfscript",
            regex: /&|&=/
        }, {
            token: "keyword.operator.assignment.cfscript",
            regex: /=/
        }, {
            token: "keyword.operator.logical.cfscript",
            regex: /\b(?:NOT|!|AND|&&|OR|\|\||XOR|EQV|IMP)\b/,
            caseInsensitive: true
        }, {
            token: "keyword.operator.ternary.cfscript",
            regex: /\?|:/
        }, {
            token: "punctuation.terminator.cfscript",
            regex: /;/
        }],
        "#function-call": [{
            token: [
                "support.function.cfscript",
                "entity.name.function-call.cfscript",
                "meta.function-call.cfscript",
                "punctuation.definition.arguments.begin.cfscript"
            ],
            regex: /(?:(abs|acos|addsoaprequestheader|addsoapresponseheader|ajaxlink|ajaxonload|applicationstop|arrayappend|arrayavg|arrayclear|arraycontains|arraydelete|arraydeleteat|arrayfind|arrayfindnocase|arrayinsertat|arrayisdefined|arrayisempty|arraylen|arraymax|arraymin|arraynew|arrayprepend|arrayresize|arrayset|arraysort|arraysum|arrayswap|arraytolist|asc|asin|atn|authenticatedcontext|authenticateduser|binarydecode|binaryencode|bitand|bitmaskclear|bitmaskread|bitmaskset|bitnot|bitor|bitshln|bitshrn|bitxor|cacheget|cachegetallids|cachegetmetadata|cachegetproperties|cachegetsession|cacheput|cacheremove|cachesetproperties|ceiling|charsetdecode|charsetencode|chr|cjustify|compare|comparenocase|cos|createdate|createdatetime|createobject|createodbcdate|createodbcdatetime|createodbctime|createtime|createtimespan|createuuid|dateadd|datecompare|dateconvert|datediff|dateformat|datepart|day|dayofweek|dayofweekasstring|dayofyear|daysinmonth|daysinyear|decimalformat|decrementvalue|decrypt|decryptbinary|deleteclientvariable|deserializejson|de|directorycreate|directorydelete|directoryexists|directorylist|directoryrename|dollarformat|dotnettocftype|duplicate|encrypt|encryptbinary|entitydelete|entityload|entityloadbyexample|entityloadbypk|entitymerge|entitynew|entityreload|entitysave|entitytoquery|evaluate|exp|expandpath|fileclose|filecopy|filedelete|fileexists|fileiseof|filemove|fileopen|fileread|filereadbinary|filereadline|fileseek|filesetaccessmode|filesetattribute|filesetlastmodified|fileskipbytes|fileupload|fileuploadall|filewrite|filewriteline|find|findnocase|findoneof|firstdayofmonth|fix|formatbasen|generatesecretkey|getauthuser|getbasetagdata|getbasetaglist|getbasetemplatepath|getclientvariableslist|getcomponentmetadata|getcontextroot|getcurrenttemplatepath|getdirectoryfrompath|getencoding|getexception|getfilefrompath|getfileinfo|getfunctioncalledname|getfunctionlist|getgatewayhelper|gethttprequestdata|gethttptimestring|getk2serverdoccount|getk2serverdoccountlimit|getlocale|getlocaledisplayname|getlocalhostip|getmetadata|getmetricdata|getpagecontext|getrequest|getrequesturi|getprinterinfo|getprinterlist|getprofilesections|getprofilestring|getreadableimageformats|getsoaprequest|getsoaprequestheader|getsoapresponse|getsoapresponseheader|gettempdirectory|gettempfile|gettemplatepath|gettickcount|gettimezoneinfo|gettoken|getuserroles|getvfsmetadata|getwriteableimageformats|hash|hour|htmlcodeformat|htmleditformat|iif|imageaddborder|imageblur|imageclearrect|imagecopy|imagecrop|imagedrawarc|imagedrawbeveledrect|imagedrawcubiccurve|imagedrawline|imagedrawlines|imagedrawoval|imagedrawpoint|imagedrawquadraticcurve|imagedrawrect|imagedrawroundrect|imagedrawtext|imageflip|imagegetblob|imagegetbufferedimage|imagegetexifmetadata|imagegetexiftag|imagegetheight|imagegetiptcmetadata|imagegetiptctag|imagegetwidth|imagegrayscale|imageinfo|imagenegative|imagenew|imageoverlay|imagepaste|imageread|imagereadbase64|imageresize|imagerotate|imagerotatedrawingaxis|imagescaletofit|imagesetantialiasing|imagesetbackgroundcolor|imagesetdrawingcolor|imagesetdrawingstroke|imagesetdrawingtransparency|imagesharpen|imageshear|imagesheardrawingaxis|imagetranslate|imagetranslatedrawingaxis|imagewrite|imagewritebase64|imagexordrawingmode|incrementvalue|inputbasen|insert|int|isarray|isauthenticated|isauthorized|isbinary|isboolean|iscustomfunction|isdate|isddx|isdebugmode|isdefined|isimage|isimagefile|isinstanceof|isipv6|isjson|isk2serverabroker|isk2serverdoccountexceeded|isk2serveronline|isleapyear|islocalhost|isnull|isnumeric|isnumericdate|isobject|ispdffile|ispdfobject|isprotected|isquery|issimplevalue|issoaprequest|isspreadsheetfile|isspreadsheetobject|isstruct|isuserinanyrole|isuserinrole|isuserloggedin|isvalid|iswddx|isxml|isxmlattribute|isxmldoc|isxmlelem|isxmlnode|isxmlroot|javacast|jsstringformat|lcase|left|len|listappend|listchangedelims|listcontains|listcontainsnocase|listdeleteat|listfind|listfindnocase|listfirst|listgetat|listinsertat|listlast|listlen|listprepend|listqualify|listrest|listsetat|listsort|listtoarray|listvaluecount|listvaluecountnocase|ljustify|location|log|log10|lscurrencyformat|lsdateformat|lseurocurrencyformat|lsiscurrency|lsisdate|lsisnumeric|lsnumberformat|lsparsecurrency|lsparsedatetime|lsparseeurocurrency|lsparsenumber|lstimeformat|ltrim|max|mid|min|minute|month|monthasstring|now|numberformat|objectequals|objectload|objectsave|ormclearsession|ormclosesession|ormcloseallsessions|ormevictcollection|ormevictentity|ormevictqueries|ormexecutequery|ormflush|ormflushall|ormgetsession|ormgetsessionfactory|ormreload|paragraphformat|parameterexists|parsedatetime|pi|precisionevaluate|preservesinglequotes|quarter|queryaddcolumn|queryaddrow|queryconvertforgrid|querynew|querysetcell|quotedvaluelist|rand|randomize|randrange|refind|refindnocase|rematch|rematchnocase|releasecomobject|removechars|repeatstring|replace|replacelist|replacenocase|rereplace|rereplacenocase|reverse|right|rjustify|round|rtrim|second|sendgatewaymessage|serializejson|setencoding|setlocale|setprofilestring|setvariable|sgn|sin|sleep|spanexcluding|spanincluding|spreadsheetaddcolumn|spreadsheetaddimage|spreadsheetaddfreezepane|spreadsheetaddinfo|spreadsheetaddrow|spreadsheetaddrows|spreadsheetaddsplitpane|spreadsheetcreatesheet|spreadsheetdeletecolumn|spreadsheetdeletecolumns|spreadsheetdeleterow|spreadsheetdeleterows|spreadsheetformatcell|spreadsheetformatcolumn|spreadsheetformatcellrange|spreadsheetformatcolumns|spreadsheetformatrow|spreadsheetformatrows|spreadsheetgetcellcomment|spreadsheetgetcellformula|spreadsheetgetcellvalue|spreadsheetinfo|spreadsheetmergecells|spreadsheetnew|spreadsheetread|spreadsheetreadbinary|spreadsheetremovesheet|spreadsheetsetactivesheet|spreadsheetsetactivesheetnumber|spreadsheetsetcellcomment|spreadsheetsetcellformula|spreadsheetsetcellvalue|spreadsheetsetcolumnwidth|spreadsheetsetfooter|spreadsheetsetheader|spreadsheetsetrowheight|spreadsheetshiftcolumnsspreadsheetshiftrows|spreadsheetwrite|sqr|stripcr|structappend|structclear|structcopy|structcount|structdelete|structfind|structfindkey|structfindvalue|structget|structinsert|structisempty|structkeyarray|structkeyexists|structkeylist|structnew|structsort|structupdate|tan|threadjoin|threadterminate|throw|timeformat|tobase64|tobinary|toscript|tostring|trace|transactioncommit|transactionrollback|transactionsetsavepoint|trim|ucase|urldecode|urlencodedformat|urlsessionformat|val|valuelist|verifyclient|week|wrap|writedump|writelog|writeoutput|xmlchildpos|xmlelemnew|xmlformat|xmlgetnodetype|xmlnew|xmlparse|xmlsearch|xmltransform|xmlvalidate|year|yesnoformat)|(\w+))(\s*)(\()/,
            caseInsensitive: true,
            push: [{
                token: "punctuation.definition.arguments.end.cfscript",
                regex: /\)/,
                next: "pop"
            }, {
                token: "punctuation.definition.seperator.arguments.cfscript",
                regex: /,/
            }, {
                token: "entity.other.method-parameter.cfscript",
                regex: /\w+\s*(?=\=)/,
                caseInsensitive: true
            }, {
                include: "#cfcomments"
            }, {
                include: "#comments"
            }, {
                include: "#tag-operators"
            }, {
                include: "#cfscript-code"
            }, {
                defaultToken: "meta.function-call.cfscript"
            }]
        }],
        "#nest_hash": [{
            token: "string.escaped.hash.cfscript",
            regex: /##/
        }, {
            token: "punctuation.definition.hash.begin.cfscript",
            regex: /#(?=.*#)/,
            push: [{
                token: "punctuation.definition.hash.end.cfscript",
                regex: /#/,
                next: "pop"
            }, {
                include: "#cfscript-code"
            }, {
                defaultToken: "meta.inline.hash.cfscript"
            }]
        }],
        "#variables": [{
            token: "storage.modifier.var.cfscript",
            regex: /\bvar\b/,
            caseInsensitive: true
        }, {
            token: "variable.language.cfscript",
            regex: /\b(?:this|key)(?!\.)/,
            caseInsensitive: true
        }, {
            token: "punctuation.definition.seperator.variable.cfscript",
            regex: /\./
        }, {
            token: [
                "variable.language.cfscript",
                "variable.other.cfscript"
            ],
            regex: /\b(application|arguments|attributes|caller|cgi|client|cookie|flash|form|local|request|server|session|this|thistag|thread|threadlocal|url|variables|super|self|argumentcollection)\b|(\w+)/,
            caseInsensitive: true
        }],
        "#sql-code": [{
            token: [
                "entity.name.function.query.cfscript, meta.toc-list.query.cfscript",
                "source.sql.embedded.cfscript",
                "support.function.cfscript",
                "source.sql.embedded.cfscript"
            ],
            regex: /([\w+\.]+)(\.)(setsql)(\(\s*["|'])/,
            caseInsensitive: true,
            push: [{
                token: "punctuation.parenthesis.end.cfscript",
                regex: /["|']\s*\)/,
                next: "pop"
            }, {
                include: "#nest_hash"
            }, {
                include: "source.sql"
            }, {
                defaultToken: "source.sql.embedded.cfscript"
            }]
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
        }]
    }
    
    this.normalizeRules();
};

CFScriptHighlightRules.metaData = {
    comment: "This tmLanguage file is used internally by ColdFusion and Component tmLanguage files",
    fileTypes: [],
    foldingStartMarker: "^.*\\bfunction\\s*([\\w\\$]+\\s*)?\\([^\\)]*\\)(\\s*\\{[^\\}]*)?\\s*$",
    foldingStopMarker: "^\\s*\\}",
    name: "CFScript",
    scopeName: "source.cfscript"
}


oop.inherits(CFScriptHighlightRules, TextHighlightRules);

exports.CFScriptHighlightRules = CFScriptHighlightRules;
});

define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"], function(require, exports, module) {
"use strict";

var Range = require("../range").Range;

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;
});

define("ace/mode/behaviour/cstyle",["require","exports","module","ace/lib/oop","ace/mode/behaviour","ace/token_iterator","ace/lib/lang"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Behaviour = require("../behaviour").Behaviour;
var TokenIterator = require("../../token_iterator").TokenIterator;
var lang = require("../../lib/lang");

var SAFE_INSERT_IN_TOKENS =
    ["text", "paren.rparen", "punctuation.operator"];
var SAFE_INSERT_BEFORE_TOKENS =
    ["text", "paren.rparen", "punctuation.operator", "comment"];

var context;
var contextCache = {};
var initContext = function(editor) {
    var id = -1;
    if (editor.multiSelect) {
        id = editor.selection.index;
        if (contextCache.rangeCount != editor.multiSelect.rangeCount)
            contextCache = {rangeCount: editor.multiSelect.rangeCount};
    }
    if (contextCache[id])
        return context = contextCache[id];
    context = contextCache[id] = {
        autoInsertedBrackets: 0,
        autoInsertedRow: -1,
        autoInsertedLineEnd: "",
        maybeInsertedBrackets: 0,
        maybeInsertedRow: -1,
        maybeInsertedLineStart: "",
        maybeInsertedLineEnd: ""
    };
};

var getWrapped = function(selection, selected, opening, closing) {
    var rowDiff = selection.end.row - selection.start.row;
    return {
        text: opening + selected + closing,
        selection: [
                0,
                selection.start.column + 1,
                rowDiff,
                selection.end.column + (rowDiff ? 0 : 1)
            ]
    };
};

var CstyleBehaviour = function() {
    this.add("braces", "insertion", function(state, action, editor, session, text) {
        var cursor = editor.getCursorPosition();
        var line = session.doc.getLine(cursor.row);
        if (text == '{') {
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "{" && editor.getWrapBehavioursEnabled()) {
                return getWrapped(selection, selected, '{', '}');
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                if (/[\]\}\)]/.test(line[cursor.column]) || editor.inMultiSelectMode) {
                    CstyleBehaviour.recordAutoInsert(editor, session, "}");
                    return {
                        text: '{}',
                        selection: [1, 1]
                    };
                } else {
                    CstyleBehaviour.recordMaybeInsert(editor, session, "{");
                    return {
                        text: '{',
                        selection: [1, 1]
                    };
                }
            }
        } else if (text == '}') {
            initContext(editor);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == '}') {
                var matching = session.$findOpeningBracket('}', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        } else if (text == "\n" || text == "\r\n") {
            initContext(editor);
            var closing = "";
            if (CstyleBehaviour.isMaybeInsertedClosing(cursor, line)) {
                closing = lang.stringRepeat("}", context.maybeInsertedBrackets);
                CstyleBehaviour.clearMaybeInsertedClosing();
            }
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === '}') {
                var openBracePos = session.findMatchingBracket({row: cursor.row, column: cursor.column+1}, '}');
                if (!openBracePos)
                     return null;
                var next_indent = this.$getIndent(session.getLine(openBracePos.row));
            } else if (closing) {
                var next_indent = this.$getIndent(line);
            } else {
                CstyleBehaviour.clearMaybeInsertedClosing();
                return;
            }
            var indent = next_indent + session.getTabString();

            return {
                text: '\n' + indent + '\n' + next_indent + closing,
                selection: [1, indent.length, 1, indent.length]
            };
        } else {
            CstyleBehaviour.clearMaybeInsertedClosing();
        }
    });

    this.add("braces", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '{') {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.end.column, range.end.column + 1);
            if (rightChar == '}') {
                range.end.column++;
                return range;
            } else {
                context.maybeInsertedBrackets--;
            }
        }
    });

    this.add("parens", "insertion", function(state, action, editor, session, text) {
        if (text == '(') {
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return getWrapped(selection, selected, '(', ')');
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                CstyleBehaviour.recordAutoInsert(editor, session, ")");
                return {
                    text: '()',
                    selection: [1, 1]
                };
            }
        } else if (text == ')') {
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ')') {
                var matching = session.$findOpeningBracket(')', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("parens", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '(') {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ')') {
                range.end.column++;
                return range;
            }
        }
    });

    this.add("brackets", "insertion", function(state, action, editor, session, text) {
        if (text == '[') {
            initContext(editor);
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && editor.getWrapBehavioursEnabled()) {
                return getWrapped(selection, selected, '[', ']');
            } else if (CstyleBehaviour.isSaneInsertion(editor, session)) {
                CstyleBehaviour.recordAutoInsert(editor, session, "]");
                return {
                    text: '[]',
                    selection: [1, 1]
                };
            }
        } else if (text == ']') {
            initContext(editor);
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar == ']') {
                var matching = session.$findOpeningBracket(']', {column: cursor.column + 1, row: cursor.row});
                if (matching !== null && CstyleBehaviour.isAutoInsertedClosing(cursor, line, text)) {
                    CstyleBehaviour.popAutoInsertedClosing();
                    return {
                        text: '',
                        selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("brackets", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected == '[') {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == ']') {
                range.end.column++;
                return range;
            }
        }
    });

    this.add("string_dquotes", "insertion", function(state, action, editor, session, text) {
        if (text == '"' || text == "'") {
            initContext(editor);
            var quote = text;
            var selection = editor.getSelectionRange();
            var selected = session.doc.getTextRange(selection);
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) {
                return getWrapped(selection, selected, quote, quote);
            } else if (!selected) {
                var cursor = editor.getCursorPosition();
                var line = session.doc.getLine(cursor.row);
                var leftChar = line.substring(cursor.column-1, cursor.column);
                var rightChar = line.substring(cursor.column, cursor.column + 1);
                
                var token = session.getTokenAt(cursor.row, cursor.column);
                var rightToken = session.getTokenAt(cursor.row, cursor.column + 1);
                if (leftChar == "\\" && token && /escape/.test(token.type))
                    return null;
                
                var stringBefore = token && /string|escape/.test(token.type);
                var stringAfter = !rightToken || /string|escape/.test(rightToken.type);
                
                var pair;
                if (rightChar == quote) {
                    pair = stringBefore !== stringAfter;
                } else {
                    if (stringBefore && !stringAfter)
                        return null; // wrap string with different quote
                    if (stringBefore && stringAfter)
                        return null; // do not pair quotes inside strings
                    var wordRe = session.$mode.tokenRe;
                    wordRe.lastIndex = 0;
                    var isWordBefore = wordRe.test(leftChar);
                    wordRe.lastIndex = 0;
                    var isWordAfter = wordRe.test(leftChar);
                    if (isWordBefore || isWordAfter)
                        return null; // before or after alphanumeric
                    if (rightChar && !/[\s;,.})\]\\]/.test(rightChar))
                        return null; // there is rightChar and it isn't closing
                    pair = true;
                }
                return {
                    text: pair ? quote + quote : "",
                    selection: [1,1]
                };
            }
        }
    });

    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) {
            initContext(editor);
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) {
                range.end.column++;
                return range;
            }
        }
    });

};

    
CstyleBehaviour.isSaneInsertion = function(editor, session) {
    var cursor = editor.getCursorPosition();
    var iterator = new TokenIterator(session, cursor.row, cursor.column);
    if (!this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS)) {
        var iterator2 = new TokenIterator(session, cursor.row, cursor.column + 1);
        if (!this.$matchTokenType(iterator2.getCurrentToken() || "text", SAFE_INSERT_IN_TOKENS))
            return false;
    }
    iterator.stepForward();
    return iterator.getCurrentTokenRow() !== cursor.row ||
        this.$matchTokenType(iterator.getCurrentToken() || "text", SAFE_INSERT_BEFORE_TOKENS);
};

CstyleBehaviour.$matchTokenType = function(token, types) {
    return types.indexOf(token.type || token) > -1;
};

CstyleBehaviour.recordAutoInsert = function(editor, session, bracket) {
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isAutoInsertedClosing(cursor, line, context.autoInsertedLineEnd[0]))
        context.autoInsertedBrackets = 0;
    context.autoInsertedRow = cursor.row;
    context.autoInsertedLineEnd = bracket + line.substr(cursor.column);
    context.autoInsertedBrackets++;
};

CstyleBehaviour.recordMaybeInsert = function(editor, session, bracket) {
    var cursor = editor.getCursorPosition();
    var line = session.doc.getLine(cursor.row);
    if (!this.isMaybeInsertedClosing(cursor, line))
        context.maybeInsertedBrackets = 0;
    context.maybeInsertedRow = cursor.row;
    context.maybeInsertedLineStart = line.substr(0, cursor.column) + bracket;
    context.maybeInsertedLineEnd = line.substr(cursor.column);
    context.maybeInsertedBrackets++;
};

CstyleBehaviour.isAutoInsertedClosing = function(cursor, line, bracket) {
    return context.autoInsertedBrackets > 0 &&
        cursor.row === context.autoInsertedRow &&
        bracket === context.autoInsertedLineEnd[0] &&
        line.substr(cursor.column) === context.autoInsertedLineEnd;
};

CstyleBehaviour.isMaybeInsertedClosing = function(cursor, line) {
    return context.maybeInsertedBrackets > 0 &&
        cursor.row === context.maybeInsertedRow &&
        line.substr(cursor.column) === context.maybeInsertedLineEnd &&
        line.substr(0, cursor.column) == context.maybeInsertedLineStart;
};

CstyleBehaviour.popAutoInsertedClosing = function() {
    context.autoInsertedLineEnd = context.autoInsertedLineEnd.substr(1);
    context.autoInsertedBrackets--;
};

CstyleBehaviour.clearMaybeInsertedClosing = function() {
    if (context) {
        context.maybeInsertedBrackets = 0;
        context.maybeInsertedRow = -1;
    }
};



oop.inherits(CstyleBehaviour, Behaviour);

exports.CstyleBehaviour = CstyleBehaviour;
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

define("ace/mode/cfscript",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/cfscript_highlight_rules","ace/mode/matching_brace_outdent","ace/range","ace/mode/behaviour/cstyle","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var CFScriptHighlightRules = require("./cfscript_highlight_rules").CFScriptHighlightRules;
var MatchingBraceOutdent = require("./matching_brace_outdent").MatchingBraceOutdent;
var Range = require("../range").Range;
var CstyleBehaviour = require("./behaviour/cstyle").CstyleBehaviour;
var CStyleFoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = CFScriptHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CstyleBehaviour();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start" || state == "no_regex") {
            var match = line.match(/^.*(?:\bcase\b.*\:|[\{\(\[])\s*$/);
            if (match) {
                indent += tab;
            }
        } else if (state == "doc-start") {
            if (endState == "start" || endState == "no_regex") {
                return "";
            }
            var match = line.match(/^\s*(\/?)\*/);
            if (match) {
                if (match[1]) {
                    indent += " ";
                }
                indent += "* ";
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };
    this.$id = "ace/mode/cfscript"
}).call(Mode.prototype);

exports.Mode = Mode;
});
