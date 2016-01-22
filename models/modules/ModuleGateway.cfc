/**
*
* Gateway object for training modules
* 
* @file  models.modules.ModuleGateway.cfc
* @author  Jason Steinshouer
* @description Gateway object for training modules
*
*/
component output="false" singleton="true" {

	property name="dsn" inject="coldbox:datasource:cfdojo";

	public function init() {
		return this;
	}


	public any function getModules() {

		var qModules = queryExecute("
				SELECT
					id,
					title,
					description
				FROM
					modules
				ORDER BY display_order	
			",
			{},
			{datasource = dsn.name}
		);

		return qModules;
	}
	
	

	public any function getKata(required module) {

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