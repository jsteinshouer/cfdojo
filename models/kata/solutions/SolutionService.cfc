/**
* Solution Service
*
* @file  /models/kata/solutions/SolutionService.cfc
* @author  Jason Steinshouer
*
*/
component output="false" singleton="true" {

	property name="beanFactory" inject="wirebox";
	property name="fileService" inject="model:util.FileService";

	public function init(){
		return this;
	}


	public any function get(fileName="",content="") {

		var solution = beanFactory.getInstance("kata.solutions.Solution");

		if (len(arguments.fileName)) {
			solution.setFileName(arguments.fileName);
		}

		if (len(arguments.content)) {
			solution.setContent(arguments.content);
		}

		return solution;
	}
	
	

	public any function getByFile(file = "") {

		var solution = beanFactory.getInstance("kata.solutions.Solution");

		solution.setFileName(listLast(arguments.file,"/"));

		/* Populate file content for base solution */
		if (len(arguments.file) and fileExists(arguments.file)) {
			solution.setContent(fileService.read(arguments.file));
		}
		
		return solution;
	}
}