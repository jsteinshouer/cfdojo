/**
*
* Service to manage training modules
*
* @file  models/modules/ModuleService.cfc
* @author  Jason Steinshouer
* @date 1/22/2016
*
*/
component output="false" singleton="true" {

	property name="cbModuleService" inject="coldbox:moduleService";
	property name="cbModules" inject="coldbox:setting:modules";
	property name="moduleDAO" inject="modules.ModuleDAO";
	property name="moduleGateway" inject="modules.ModuleGateway";

	public function init(){
		return this;
	}

	/**
	*
	* Run sql setup script for database
	*
	*/
	public void function setupDB() {
		
		moduleDAO.setup();
	}
	

	/**
	*
	* Loads modules and kata into the database
	*
	*/
	public void function loadModules() {

		for (var module in cbModuleService.getLoadedModules()) { 
			/* Does this module contain a kata setting? */
			if (structKeyExists(cbModules[module].settings,"kata") && isArray(cbModules[module].settings.kata)) {
				cbModules[module].id = module;
				moduleDAO.save(cbModules[module]);
			}
		}
		
	}

	/**
	*
	* Get training modules
	*
	*/
	public array function getModules() {

		var modules = [];

		for (var module in cbModuleService.getLoadedModules()) {
			/* Does this module contain a kata setting? */
			if (structKeyExists(cbModules[module].settings,"kata") && isArray(cbModules[module].settings.kata) && module != "about") {

				modules.append({
					"id" = module,
					"title" = cbModules[module].title,
					"description" = cbModules[module].description,
					"author" = cbModules[module].author
				});
			}
		}
		
		return modules;
	}

	/**
	*
	* Get a modules configuration
	*
	*/
	public struct function getModuleConfig(required string module) {
		
		return (structKeyExists(cbModules,arguments.module)) ? cbModules[arguments.module] : {};
	}

	/**
	*
	* Get a kata configuration settings
	*
	*/
	public struct function getKataConfig(required string kataId, required string moduleId) {

		var settings = {};
		var kata = cbModules[arguments.moduleId].settings.kata;

		kata.each(function(item,index) {
			if (item.id == kataId) {
				settings = kata[index];
			}
		});

		return settings;
	}

	/**
	*
	* Get kata records from the database for a module
	*
	*/
	public query function getKata(required string module) {
		
		return moduleGateway.getKata(arguments.module);
	}

	/**
	*
	* Marks a kata record completed in the database
	*
	*/
	public void function completeKata(required string kataId, required string moduleId) {
		
		moduleDAO.completeKata(arguments.kataId,arguments.moduleId);
	}

	/**
	*
	* Gets the next kata
	*
	*/
	public string function getNextKata(required string kataId, required string moduleId) {

		var nextKata = "";
		var kata = cbModules[arguments.moduleId].settings.kata;

		kata.each(function(item,index) {
			if (item.id == kataId && kata.len() > index) {
				nextKata = kata[index + 1].id;
			}
		});

		return nextKata;
	}
	
	
	
	
}