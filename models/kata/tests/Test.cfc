/**
* Test Entity
*
* @file  models/kata/Test.cfc
* @author  Jason Steinshouer
*/
component output="false" accessors="true"  {

	property name="fileName" type="string" hint="Test file name";
	property name="content" type="string" hint="The users solution content";

	variables.DEFAULT_TEST_CONTENT = "component extends=""testbox.system.BaseSpec"" {

		// executes before all suites
		function beforeAll(){
			mySolution = new MySolution();
		}

		// All suites go in here
		function run( testResults, testBox ){
			// Make all tests pass
			describe(""My Tests"", function() {

				// it(""Should do something"", function() {
				// 	expect(true).toBe(true);
				// });

			});
		}

	}"

	/**
	* Constructor
	*/
	public function init(fileName="Tests.cfc",content=""){

		variables.fileName = arguments.fileName;

		if (len(arguments.content)) {
			variables.content = arguments.content;
		}
		else {
			setDefaultContent();
		}

		return this;
	}
	
	/**
	* Sets the 
	*/
	public void function setDefaultContent(solutionName="") {

		if (len(arguments.solutionName)) {
			setContent(replace(DEFAULT_TEST_CONTENT,"new MySolution()","new #arguments.solutionName#()"));
		}
		else {
			setContent(DEFAULT_TEST_CONTENT);
		}
	}
	
	
	
}