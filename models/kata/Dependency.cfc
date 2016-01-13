/**
* Dependency Entity
*
* @file  models/kata/Dependency.cfc
* @author  Jason Steinshouer
*/
component output="false" accessors="true"  {

	property name="fileName" type="string" hint="Dependency file name";
	property name="content" type="string" hint="The users solution content";

	/**
	* Constructor
	*/
	public function init(fileName="",content=""){

		variables.fileName = arguments.fileName;
		variables.content = arguments.content;

		return this;
	}
}