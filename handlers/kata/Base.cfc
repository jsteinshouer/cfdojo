component extends="coldbox.system.EventHandler" singleton="true" accessors="true" {

	property name="fileService" inject="util.FileService";
	property name="kataService" inject="kata.KataService";
	property name="configFile";
	property name="baseUrl";
	property name="nextKata";

	/**
	* Default action
	*/
	public function index( event, rc, prc ){
		
		prc.kata = kataService.get(configFile=configFile);

		if (structKeyExists(variables, "nextKata")) {
			prc.nextUrl = "#baseUrl#/#nextKata#";
		}

		event.setView("kata/index");
	}

	/**
	* run
	*/
	public function run( event, rc, prc ){

		var results = kataService.run(
			configFile = configFile,
			content = rc.content,
			testContent = rc.testContent
		);

		event.renderData( type="json", data=results);
	}

	/**
	* submit
	*/
	public function submit( event, rc, prc ){

		var results = kataService.submit(
			configFile = configFile,
			content = rc.content
		);

		event.renderData( type="json", data=results);
	}

	
}