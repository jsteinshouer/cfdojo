/**
*
* Service for handling Kata tests
* 
* @file  models.kata.KataService.cfc
* @author  Jason Steinshouer
* @description Kata service object
*
*/
component output="false" singleton="true" {

	property name="dsn" inject="coldbox:datasource:cfdojo";
	property name="beanFactory" inject="wirebox";
	property name="fileService" inject="util.FileService";
	property name="testService" inject="kata.tests.TestService";
	property name="solutionService" inject="kata.solutions.SolutionService";

	public function init() {
		return this;
	}

	public any function get(config = {}, configFile = "") {

		/* Get the config setting from file or parameter */
		if (len(arguments.configFile)) {
			var config = getConfig(arguments.configFile);
		}
		else {
			var config =  arguments.config;
		}
	
		var kata = populateFromConfig(config);

		return kata;
	}

	public struct function getConfig(required file) {

		if (len(arguments.file) and fileExists(arguments.file)) {
			var config = deserializeJSON(fileRead(arguments.file));
			config.path = replace(arguments.file,"/kata.json","");
		}
		else {
			throw "kata.json config file is missing";
		}

		if (!structKeyExists(config, "dependencies")) {
			config.dependencies = [];
		}
		
		return config;
	}

	public any function getInstruction(view = "",module = "") {

		var instruction = beanFactory.getInstance("kata.Instruction");

		instruction.setView(arguments.view);
		instruction.setModule(arguments.module);
		
		return instruction;
	}

	public any function run(required configFile, required content, required testContent) {

		if (len(arguments.configFile)) {
			var config = getConfig(arguments.configFile);
		}

		var kata = get(config={
			id = config.id,
			module = config.module,
			path = config.path,
			solution = {
				fileName = config.solutionFile,
				content = arguments.content
			},
			userTests = {
				fileName = config.testFile,
				content = arguments.testContent
			},
			dependencies = config.dependencies
		});

		return testService.runUserTests(kata);
	}


	public any function submit(required configFile, required content) {

		if (len(arguments.configFile)) {
			var config = getConfig(arguments.configFile);
		}

		var kata = get(config={
			id = config.id,
			module = config.module,
			path = config.path,
			solution = {
				fileName = config.solutionFile,
				content = arguments.content
			},
			solutionTestFile = config.solutionTestFile,
			dependencies = config.dependencies
		});

		var results = testService.runSolutionTests(kata);

		/* Mark the kata as complete if all tests pass */
		if (results.specs.len() eq results.totalPassed) {
			complete(kata);
		}

		return results;
	}

	/**
	*
	* Keep track of completed kata
	*
	*/
	public any function complete(required kata) {
		
		queryExecute("
				UPDATE kata
				SET
					complete = 1
				WHERE
					id = :id
					AND f_module_id = :module
			",
			{
				id = kata.getId(),
				module = kata.getModule()
			},
			{datasource = dsn.name}
		);
	}
	

	private any function populateFromConfig(config) {
		/* Local reference */
		var config = arguments.config;

		var kata = beanFactory.getInstance("kata.Kata");

		if (structKeyExists(config, "id")) {
			kata.setId(config.id);
		}

		if (structKeyExists(config, "title")) {
			kata.setTitle(config.title);
		}

		if (structKeyExists(config, "module")) {
			kata.setModule(config.module);
			kata.setInstruction(getInstruction(view="kata/#config.id#",module=config.module));
		}

		if (structKeyExists(config, "solutionFile")) {
			kata.setSolution(solutionService.getByFile("#config.path#/#config.solutionFile#"));
		}

		if (structKeyExists(config, "solution")) {
			kata.setSolution(solutionService.get(argumentCollection=config.solution));
		}

		if (structKeyExists(config, "testFile")) {
			kata.setUserTests(testService.getByFile("#config.path#/#config.testFile#"));
		}

		if (structKeyExists(config, "userTests")) {
			kata.setUserTests(testService.get(argumentCollection=config.userTests));
		}

		if (structKeyExists(config, "solutionTestFile")) {
			kata.setSolutionTests(testService.getByFile("#config.path#/#config.solutionTestFile#"));
		}

		if (structKeyExists(config, "solutionTests")) {
			kata.setSolutionTests(testService.get(argumentCollection=config.solutionTests));
		}

		if (structKeyExists(config, "dependencies") and config.dependencies.len()) {
			var files = [];
			var item = "";
			config.dependencies.each(function(item) {
				var file = beanFactory.getInstance("kata.Dependency");
				file.setFileName(item);
				file.setContent(fileService.read("#config.path#/#item#"));
				files.append(file);
			});
			kata.setDependencies(files);
		}
		
		return kata;
	}
	
}