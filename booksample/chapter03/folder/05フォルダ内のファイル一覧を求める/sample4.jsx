(function sample0001(){	var fileList = (new Folder("~/IDSample")).getFiles("*.indd");	for(var i=0; i<fileList.length; i++)	{		app.open(fileList[i]);	}})();
