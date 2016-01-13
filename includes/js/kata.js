$(document).ready(function() {

	var isFullscreen = false;

	var editor = ace.edit("editor");
	editor.setTheme("ace/theme/monokai");
	// editor.setTheme("ace/theme/clouds_midnight");
	editor.setFontSize(16);
	editor.getSession().setMode("ace/mode/cfscript");
	editor.getSession();
	editor.getSession().setUseWorker(false);

	var testEditor = ace.edit("test");
	testEditor.setTheme("ace/theme/monokai");
	testEditor.getSession().setMode("ace/mode/cfscript");
	testEditor.getSession().setUseWorker(false);
	// testEditor.setReadOnly(true);
	testEditor.setFontSize(16);
	testEditor.setShowPrintMargin(false);

	var resize = function() {

		if (isFullscreen) {
			$(".myeditor").css({"height": "800px", "width": "1200px"});
		}
		else {
			$(".myeditor").css({"height" : $(".panel-editor").height() - 40, "width": "auto"});
		}

		editor.resize();
		testEditor.resize();
	};

	resize();

	$(window).on("resize", function() {
		resize();
	});

	$(".glyphicon-fullscreen").on("click", function() {
		isFullscreen = true;
		var elem = document.getElementById($(this).data("target"));

		if (elem.requestFullscreen) {
		  elem.requestFullscreen();
		} else if (elem.msRequestFullscreen) {
		  elem.msRequestFullscreen();
		} else if (elem.mozRequestFullScreen) {
		  elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
		  elem.webkitRequestFullscreen();
		}

	});

	var exitFullscreenMode = function() {
		isFullscreen = false;
	};

	/* Detect when we exit fullscreen mode */
	$(document).on("fullscreenchange webkitfullscreenchange  msfullscreenchange mozfullscreenchange", function(e) {
		if (!document.fullscreenElement &&    // alternative standard method
      	!document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {
			exitFullscreenMode();
      	}
	})

	var displayResults = function(data) {
		$(".panel-danger").addClass("hidden");
		$(".panel-success").addClass("hidden");
		$(".text-danger").addClass("hidden");
		$(".loading").addClass("hidden");

		if (data.globalError) {
			$(".text-danger").html("<strong>Error: </strong>" + data.globalErrorMessage);
			$(".text-danger").removeClass("hidden");
		}
		else {
			$(".panel-success").find(".badge").text(data.totalPassed);
			$(".panel-danger").find(".badge").text((data.totalFailed + data.totalError));

			$(".panel-danger").find(".panel-body").html("");
			$(".panel-success").find(".panel-body").html("");

			for (var i = data.specs.length - 1; i >= 0; i--) {
				if (data.specs[i].status === "Failed" || data.specs[i].status === "Error") {
					var elem = $("<div>" + data.specs[i].name + "</div>");
					if (data.specs[i].errorMessage.length > 0) {
						var msg = $("<div class=\"container\"><strong>Error: </strong>" + data.specs[i].errorMessage + "</div>");
					}
					else {
						var msg = $("<div class=\"container\">" + data.specs[i].failMessage + "</div>");
					}
					elem.append(msg);
					$(".panel-danger").find(".panel-body").append(elem);
				}
				else {
					$(".panel-success").find(".panel-body").append($("<div>" + data.specs[i].name + "</div>"));
				}
			};

			if ($(".panel-danger").find(".panel-body").html().length > 0){
				$(".panel-danger").removeClass("hidden");
			}

			if ($(".panel-success").find(".panel-body").html().length > 0){
				$(".panel-success").removeClass("hidden");
			}
		}
	};

	var runTests = function() {
		var url = window.location.pathname + "/run";

		$("#output-tab a").tab("show");
		$("#output-tab").addClass("active");

		$(".panel-danger").addClass("hidden");
		$(".panel-success").addClass("hidden");
		$(".loading").removeClass("hidden");

		$.ajax({
			url: url,
			type: "POST",
			data: {
				content: editor.getValue(),
				testContent: testEditor.getValue()
			}
		}).done(displayResults);
	};

	$("button.run-tests").on("click", function(e) {
		e.preventDefault();
		runTests();
	});

	/* Keyboard shortcut */
	Mousetrap.bind('ctrl+s', function(e) {
		e.preventDefault();
	    runTests();
	});

	editor.commands.addCommand({
		name: 'runTests',
		bindKey: {
			win: 'Ctrl-S',
			mac: 'Command-S',
			sender: 'editor|cli'
		},
		exec: function(env, args, request) {
	    	runTests();
		}
	});

	testEditor.commands.addCommand({
		name: 'runTests',
		bindKey: {
			win: 'Ctrl-S',
			mac: 'Command-S',
			sender: 'editor|cli'
		},
		exec: function(env, args, request) {
	    	runTests();
		}
	});

	$("button.submit-solution").on("click", function(e) {
		e.preventDefault();
		var url = window.location.pathname + "/submit";

		$("#output-tab a").tab("show");
		$("#output-tab").addClass("active");

		$(".panel-danger").addClass("hidden");
		$(".panel-success").addClass("hidden");

		$(".loading").removeClass("hidden");

		$.ajax({
			url:  url,
			type: "POST",
			data: {content: editor.getValue()}
		}).done(function(data) {
			displayResults(data);

			if (data.specs.length == data.totalPassed) {
				$(".complete-modal").modal("show");
			}

		});
	});
});