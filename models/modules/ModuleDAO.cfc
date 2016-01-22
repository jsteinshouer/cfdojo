/**
*
* Data Access Object for training modules
*
* @file  models/modules/ModuleDAO.cfc
* @author  Jason Steinshouer
* @date 1/22/2016
*
*/
component output="false" singleton="true" {

	property name="dsn" inject="coldbox:datasource:cfdojo";

	public function init(){
		return this;
	}

	/**
	*
	* Setup module and kata tables in the database
	*
	*/
	public any function setup(param) {
		
		/* Initialize DB */
		queryExecute("

				CREATE TABLE IF NOT EXISTS modules (
					id VARCHAR(10) PRIMARY KEY, 
					title VARCHAR(50),
					description VARCHAR(150)
				);

				CREATE TABLE IF NOT EXISTS kata(
					id VARCHAR(20), 
					title VARCHAR(100),
					description VARCHAR(150),
					f_module_id VARCHAR(10),
					complete bit default 0,
					display_order int default 0,
					PRIMARY KEY (id, f_module_id)
				);


			",
			{},
			{datasource = dsn.name}
		);
	}
	

	/**
	*
	* Inserts or updates a module record
	*
	*/
	public any function save(required struct module) {

		queryExecute("
				MERGE INTO modules (id,title,description)
				VALUES(
					:id,
					:title,
					:description
				);
			",
			{
				id = module.id,
				title = module.title,
				description = module.description
			},
			{datasource = dsn.name}
		);

		/* Save the kata */
		module.settings.kata.each(function (item, index) {
			saveKata(
				kata = item,
				moduleId = module.id,
				order = index
			)
		});
	}

	/**		
	*
	* Save kata record to db
	*
	*/
	public void function saveKata(required struct kata, required string moduleId, order = 0) {

		queryExecute("
				MERGE INTO kata (id,title,description,f_module_id,display_order)
				VALUES(
					:id,
					:title,
					:description,
					:moduleId,
					:order
				);

			",
			{
				id = kata.id,
				title = kata.title,
				description = kata.description,
				moduleId = moduleId,
				order = order
			},
			{datasource = dsn.name}
		);
		
	}

	/**
	*
	* Mark kata completed in the database
	*
	*/
	public any function completeKata(required string kataId, required string moduleId) {
		
		queryExecute("
				UPDATE kata
				SET
					complete = 1
				WHERE
					id = :id
					AND f_module_id = :module
			",
			{
				id = kataId,
				module = moduleId
			},
			{datasource = dsn.name}
		);
	}


	
	
}