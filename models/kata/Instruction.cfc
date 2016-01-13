/**
* Instruction Entity
*
* @file  models/kata/Instruction.cfc
* @author  Jason Steinshouer
*/
component output="false" accessors="true"  {

	property name="view" type="string" hint="the view containing the instruction markup";
	property name="module" type="string" hint="The module to render the view from";

	/**
	* Constructor
	*/
	public function init(view="",module=""){

		variables.view = arguments.view;
		variables.module = arguments.module;

		return this;
	}
}