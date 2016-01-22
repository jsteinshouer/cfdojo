/**
* Accessors kata handler
* 
* @author Jason Steinshouer
* @title Accessors
* @description Accessors
*/
component extends="handlers.Kata" singleton="true" {

	/**
	*
	* Runs before each handler
	*
	*/
	public function preHandler( event, rc, prc ) {
		rc.id = "about";
		prc.kataSettings = moduleService.getKataConfig("about","about");
		prc.configFile = "#getDirectoryFromPath("/")#modules/about/#prc.kataSettings.path#/kata.json";
		
	}
}