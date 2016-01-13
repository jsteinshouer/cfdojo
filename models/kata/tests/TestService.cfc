/**
* Test Service
* 
* @file  models/kata/tests/TestService.cfc
* @author  Jason Steinshouer
*
*/
component output="false" singleton="true"  {

	property name="beanFactory" inject="wirebox";
	property name="fileService" inject="model:util.FileService";

	public function init(){
		return this;
	}

	public any function get(fileName="",content="") {

		var test = beanFactory.getInstance("kata.tests.Test");

		if (len(arguments.fileName)) {
			test.setFileName(arguments.fileName);
		}

		if (len(arguments.content)) {
			test.setContent(arguments.content);
		}
		else {
			/* Use default test template */
			test.setDefaultContent();
		}

		return test;
	}

	public any function getByFile(file = "") {

		var test = beanFactory.getInstance("kata.tests.Test");

		test.setFileName(listLast(arguments.file,"/"));

		/* Populate file content for base test */
		if (len(arguments.file) and fileExists(arguments.file)) {
			test.setContent(fileService.read(arguments.file));
		}
		
		return test;
	}

	public any function runUserTests(required kata) {

		fileService.createPath(arguments.kata.getSolutionPath());
		fileService.write(arguments.kata.getSolutionPath(type="solution"),arguments.kata.getSolution().getContent());
		fileService.write(arguments.kata.getTestPath(),arguments.kata.getUserTests().getContent());

		/* Create any file dependencies */
		var file = "";
		arguments.kata.getDependencies().each(function(file) {
			fileService.write("#kata.getBasePath()#/#file.getFileName()#",file.getContent());
		});

		// writeDump(fileService.listContents());abort;

		var test = new testbox.system.TestBox(arguments.kata.getTestComponentPath());
		
		return parseResults(test.run(reporter="raw"));
	}

	public any function runSolutionTests(required kata) {

		fileService.createPath(arguments.kata.getSolutionPath());
		fileService.write(arguments.kata.getSolutionPath(type="solution"),arguments.kata.getSolution().getContent());
		fileService.write(arguments.kata.getTestPath(type="solution"),arguments.kata.getSolutionTests().getContent());

		/* Create any file dependencies */
		var file = "";
		arguments.kata.getDependencies().each(function(file) {
			fileService.write("#kata.getBasePath()#/#file.getFileName()#",file.getContent());
		});

		// writeDump(fileService.listContents());abort;

		var test = new testbox.system.TestBox(arguments.kata.getTestComponentPath("solution"));
		
		return parseResults(test.run(reporter="raw"));
	}


	private any function parseResults(required testResults) {

		var results = {};

		if (isStruct(arguments.testResults.bundleStats[1].GlobalException)) {
			results["globalError"] = true;
			results["globalErrorMessage"] = arguments.testResults.bundleStats[1].GlobalException.Message;
		}
		else {

			var testSuite = arguments.testResults.bundleStats[1].SUITESTATS[1];

			results["globalError"] = false;
			results["globalErrorMessage"] = "";
			
			results["totalPassed"] = testSuite.TotalPass;
			results["totalFailed"] = testSuite.TotalFail;
			results["totalError"] = testSuite.TotalError;
			results["specs"] = [];

			for (var item in testSuite.SPECSTATS) {
				var errorMessage = "";

				if (item.status == "error") {
					errorMessage = item.error.message;
				}


				arrayAppend(results["specs"], {
					"name" = item.name,
					"status" = item.status,
					"failMessage" = item.failMessage,
					"errorMessage" = errorMessage
				});
			};
		}
		
		return results;
	}
	
	
}