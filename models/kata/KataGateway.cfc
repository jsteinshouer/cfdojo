/**
*
* Gateway object
* 
* @file  models.kata.KataGateway.cfc
* @author  Jason Steinshouer
* @description Kata gateway object
*
*/
component output="false" singleton="true" {

	property name="dsn" inject="coldbox:datasource:cfdojo";

	public function init() {
		return this;
	}

	public any function getByModule(required module) {

		var qKata = queryExecute("
				SELECT
					id,
					title,
					description,
					complete
				FROM
					kata
				WHERE f_module_id = :module
				ORDER BY display_order	
			",
			{
				module = arguments.module
			},
			{datasource = dsn.name}
		);

		return qKata;
	}
}