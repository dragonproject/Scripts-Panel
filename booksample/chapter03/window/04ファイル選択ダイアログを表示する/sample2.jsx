(function sample0001(){	var fileObj = File.openDialog("ファイルを指定してください","InDesign:*.indd");	if (fileObj)	{		alert(fileObj.fsName);	}})();
