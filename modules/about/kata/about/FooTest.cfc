component extends="testbox.system.BaseSpec"{

	// executes before all suites
	function beforeAll(){
		variables.foo = new Foo();
	}

	// executes after all suites
	function afterAll(){}

	// All suites go in here
	function run( testResults, testBox ){
		describe("Foo Spec", function() {

			it("Foo should return Bar", function() {
				expect(foo.getFoo()).toBe("Bar");
			});

		});
	}

}