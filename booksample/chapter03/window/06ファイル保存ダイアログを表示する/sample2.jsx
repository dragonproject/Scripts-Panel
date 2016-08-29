(function sample0001(){	var fileObj = File.saveDialog("保存先を指定して下さい","Text:*.txt");	if (fileObj != null)	{		alert(fileObj.fsName);	}})();
