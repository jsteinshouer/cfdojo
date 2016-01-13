/**
* Solution Entity
*
* @file  models/kata/Solution.cfc
* @author  Jason Steinshouer
*/
component output="false" accessors="true"  {

	property name="fileName" type="string" hint="Solution file name";
	property name="content" type="string" hint="The users solution content";

	/**
	* Constructor
	*/
	public function init(fileName="MySolution.cfc",content="component { #chr(13)##chr(13)#}"){

		variables.fileName = arguments.fileName;
		variables.content = arguments.content;

		return this;
	}
}