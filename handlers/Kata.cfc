component extends="coldbox.system.EventHandler" singleton="true" accessors="true" {

	property name="fileService" inject="util.FileService";
	property name="kataService" inject="kata.KataService";
	property name="moduleService" inject="modules.ModuleService";

	/**
	*
	* Runs before each handler
	*
	*/
	public function preHandler( event, rc, prc ) {

		prc.kataSettings = moduleService.getKataConfig(rc.id,event.getCurrentModule());
		prc.configFile = "#getDirectoryFromPath("/")#modules/#event.getCurrentModule()#/#prc.kataSettings.path#/kata.json";
		
	}

	/**
	* Default kata handler
	*/
	public function index( event, rc, prc ){
		
		prc.kata = kataService.get(configFile=prc.configFile);

		var nextKata = moduleService.getNextKata(prc.kataSettings.id,event.getCurrentModule());

		if (len(nextKata)) {
			prc.nextUrl = "/index.cfm/#event.getCurrentModule()#/kata/#nextKata#";
		}

		event.setView("kata/index");
	}

	/**
	* Runs the kata tests and returns the results as json
	*/
	public function run( event, rc, prc ) {

		try {

			var results = kataService.run(
				configFile = prc.configFile,
				content = rc.content,
				testContent = rc.testContent
			);

			event.renderData( type="json", data=results);

		}
		catch(e) {
			event.renderData( type="json", data={"message" = e.message}, statusCode=500);
		}
	}

	/**
	* Submits the solution and returns results as json
	*/
	public function submit( event, rc, prc ){

		try {

			var results = kataService.submit(
				configFile = prc.configFile,
				content = rc.content
			);

			event.renderData( type="json", data=results );

		}
		catch(e) {
			event.renderData( type="json", data={"message" = e.message}, statusCode=500);
		}
	}

	
}