/**
* Accessors kata handler
* 
* @author Jason Steinshouer
* @title Accessors
* @description Accessors
*/
component extends="handlers.kata.Base" singleton="true" {

	setConfigFile("#getDirectoryFromPath("/")#modules/about/kata/about/kata.json");
	setBaseUrl("/index.cfm/about/kata");
	
}