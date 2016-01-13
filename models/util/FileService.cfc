/**
*
* @file  models/FileService.cfc
* @author  Jason Steinshouer
* @description
*
*/

component output="false" singleton {

	public function init(){
		return this;
	}

	public string function read(path) {
		return fileRead(path);
	}


	public void function createPath(path) {
		
		var dir = listDeleteAt(path, listLen(path,"/"), "/");

		if (!directoryExists("ram:///#dir#")) {
			directoryCreate("ram:///#dir#");
		}
		else {
			directoryDelete("ram:///#dir#",true);
			directoryCreate("ram:///#dir#");
		};
	}
	

	public void function write(path,content) {
		fileWrite("ram:///#arguments.path#",arguments.content);
	}


	public any function listContents() {

		var files = directoryList(path="ram:///",recurse=true);
		
		return files;
	}
	
	
	
	
}