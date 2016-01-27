/**
********************************************************************************
Copyright 2005-2007 ColdBox Framework by Luis Majano and Ortus Solutions, Corp
www.ortussolutions.com
********************************************************************************
*/
component {
	// Application properties
	this.name = hash( getCurrentTemplatePath() );
	this.sessionManagement = true;
	this.sessionTimeout = createTimeSpan(0,0,30,0);
	this.setClientCookies = true;

	/* Setup a sandbox for kata to use */
	this.datasources["KATA_SANDBOX"] = {
		  class: 'org.h2.Driver'
		, connectionString: 'jdbc:h2:#getDirectoryFromPath( getCurrentTemplatePath() )#/db/sandbox/sandbox;MODE=MSSQLServer'
	};

	/* Setup an application datasource */
	this.datasources["cfdojo"] = {
		  class: 'org.h2.Driver'
		, connectionString: 'jdbc:h2:#getDirectoryFromPath( getCurrentTemplatePath() )#/db/app/cfdojo;MODE=MSSQLServer'
	};

	/* Setup RAM directories and file structure */
	if (directoryExists("ram:///kata")) {
		directoryDelete("ram:///kata",true);
	}
	directoryCreate("ram:///kata");

	if (directoryExists("ram:///testbox")) {
		directoryDelete("ram:///testbox",true);
	}
	directoryCreate("ram:///testbox/system");
	directoryCopy(source="./modules/testbox/system",destination="ram:///testbox/system",recurse=true);	
	fileDelete("ram:///testbox/system/Application.cfc");	

	/* Create application mappings */
	this.mappings['/kata'] = "ram:///kata";
	this.mappings['/testbox'] = "ram:///testbox";

	// COLDBOX STATIC PROPERTY, DO NOT CHANGE UNLESS THIS IS NOT THE ROOT OF YOUR COLDBOX APP
	COLDBOX_APP_ROOT_PATH = getDirectoryFromPath( getCurrentTemplatePath() );
	// The web server mapping to this application. Used for remote purposes or static purposes
	COLDBOX_APP_MAPPING   = "";
	// COLDBOX PROPERTIES
	COLDBOX_CONFIG_FILE 	 = "";
	// COLDBOX APPLICATION KEY OVERRIDE
	COLDBOX_APP_KEY 		 = "";
	// JAVA INTEGRATION: JUST DROP JARS IN THE LIB FOLDER
	// You can add more paths or change the reload flag as well.
	this.javaSettings = { loadPaths = [ "lib" ], reloadOnChange = false };


	// application start
	public boolean function onApplicationStart(){

		/* Delete sandbox db when app loads */
		if (directoryExists("#getDirectoryFromPath( getCurrentTemplatePath() )#/db/sandbox")) {
			directoryDelete("#getDirectoryFromPath( getCurrentTemplatePath() )#/db/sandbox",true);
		}

		application.cbBootstrap = new coldbox.system.Bootstrap( COLDBOX_CONFIG_FILE, COLDBOX_APP_ROOT_PATH, COLDBOX_APP_KEY, COLDBOX_APP_MAPPING );
		application.cbBootstrap.loadColdbox();

		/* This doesnt seem to work */
		/* var moduleService = application.wirebox.getInstance(dsl="coldbox:moduleService");

		for (var module in moduleService.getLoadedModules()) { 
			this.datasources["KATA_SANDBOX_#ucase(module)#"] = {
				  class: 'org.h2.Driver'
				, connectionString: 'jdbc:h2:./db/#module#;MODE=MySQL'
			};
		} */

		return true;
	}

	// request start
	public boolean function onRequestStart(String targetPage){
		// Process ColdBox Request
		application.cbBootstrap.onRequestStart( arguments.targetPage );

		return true;
	}

	public void function onSessionStart(){
		application.cbBootStrap.onSessionStart();
	}

	public void function onSessionEnd( struct sessionScope, struct appScope ){
		arguments.appScope.cbBootStrap.onSessionEnd( argumentCollection=arguments );
	}

	public boolean function onMissingTemplate( template ){
		return application.cbBootstrap.onMissingTemplate( argumentCollection=arguments );
	}
	

}