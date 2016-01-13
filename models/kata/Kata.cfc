/**
* Kata Entity
* 
* @file  /models/kata/Kata.cfc
* @author  Jason Steinshouer
*
*/
component output="false" accessors="true" {

	property name="id" type="string" hint="Kata id";
	property name="title" type="string" hint="Kata title";
	property name="module" type="string" hint="Kata module";
	property name="solution" type="any" hint="the user's solution";
	property name="userTests" type="any" hint="the tests the user starts with";
	property name="solutionTests" type="any" hint="the tests that must pass for the solution to pass";
	property name="instruction" type="any" hint="Instruction entity for this kata";
	property name="dependencies" type="array" hint="Collection of additonal files needed for kata";
	/* inject wirebox for DI */
	property name="beanFactory" inject="wirebox";

	/**
	* Constructor
	* 
	* solution.inject kata.solutions.Solution
	* userTests.inject kata.tests.Test
	* solutionTests.inject kata.tests.Test
	* instruction.inject kata.Instruction
	* 
	*/
	public function init(
		id = "",
		title = "",
		module = "",
		solution,
		userTests,
		solutionTests,
		instruction,
		dependencies = []
	){

		variables.id = arguments.id;
		variables.title = arguments.title;
		variables.module = arguments.module;
		variables.solution = arguments.solution;
		variables.userTests = arguments.userTests;
		variables.solutionTests = arguments.solutionTests;
		variables.instruction = arguments.instruction;
		variables.dependencies = arguments.dependencies;

		return this;
	}

	/**
	* Get the file path for the solution
	* 
	*/
	public string function getBasePath() {
		
		return "kata/#module#/#id#";
	}

	/**
	* Get the component path for the solution
	* 
	*/
	public string function getBaseComponentPath() {
		
		return "kata.#module#.#id#";
	}

	/**
	* Get the file path for the solution
	* 
	*/
	public string function getSolutionPath() {
		
		return "#getBasePath()#/#solution.getFileName()#";
	}

	/**
	* Get the file path for the test suite
	* 
	*/
	public string function getTestPath(type="user") {
		
		if (arguments.type == "solution") {
			var path = "#getBasePath()#/#solutionTests.getFileName()#";
		}
		else {
			var path = "#getBasePath()#/#userTests.getFileName()#";
		}
		return path;
	}

	/**
	* Get the component path for the test suite
	* 
	*/
	public string function getTestComponentPath(type="user") {
		
		if (arguments.type == "solution") {
			var path = "#getBaseComponentPath()#.#replace(solutionTests.getFileName(),".cfc","")#";
		}
		else {
			var path = "#getBaseComponentPath()#.#replace(userTests.getFileName(),".cfc","")#";
		}
		return path;
	}
	
	
	
	
}