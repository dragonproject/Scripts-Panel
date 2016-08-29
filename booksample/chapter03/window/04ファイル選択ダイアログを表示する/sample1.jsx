(function sample0001(){	var fileObj = File.openDialog("ファイルを指定してください");	if (fileObj)	{		alert(fileObj.fsName);	}})();
