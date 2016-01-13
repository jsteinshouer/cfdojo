component extends="coldbox.system.EventHandler" singleton="true" {

	property name="fileService" inject="model:util.FileService";
	property name="kataService" inject="model:kata.KataService";

	// Default Action
	function index(event,rc,prc){

		event.setView("main/index");
	}

	/* display kata  */
	function onMissingAction(event,missingAction,eventArguments){

		var kataNames = settings.kata.map(function(item) {
			return item.title;
		});

		kataIndex = kataNames.findNoCase(arguments.missingAction);

		if (kataIndex > 0) {

			var kata = settings.kata[kataIndex];

			if (structKeyExists(rc, "run")) {

				var results = kataService.run(
					filePath = "#lcase(event.getCurrentModule())#/#lcase(arguments.missingAction)#/#kata.file#",
					fileContent = rc.content,
					testSuite = "#event.getCurrentModule()#.kata.#kata.dir#.tests"
				);

				event.renderData( type="json", data=results);

			}
			else {
				prc.cfcPath = kata.file;
				prc.cfcContent = fileService.read("#getDirectoryFromPath("/")#\modules\#settings.kataBaseDir#\#kata.dir#\#kata.file#");
				prc.testContent = fileService.read("#getDirectoryFromPath("/")#\modules\#settings.kataBaseDir#\#kata.dir#\#kata.test#");
				prc.instructionPath = "/modules/#settings.kataBaseDir#/#kata.dir#/#kata.instructions#";
				prc.runUrl = "/index.cfm/#event.getCurrentModule()#/kata/#arguments.missingAction#/run";

				//writeDump(kataIndex);writeDump(kataNames.len());abort;
				if (kataIndex != kataNames.len()) {
					prc.nextUrl = "/index.cfm/#event.getCurrentModule()#/kata/#lcase(kataNames[kataIndex + 1])#";
				}
				event.setView("kata/index");
			}
		}

	}

	
}