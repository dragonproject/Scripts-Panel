(function sample0001(){	var fileObj = File.openDialog("テキストファイルを指定してください",checkFileType);	if (fileObj)	{		alert(fileObj.fsName);	}	function checkFileType(fileObj){		if (fileObj.name.indexOf("txt") > -1) return true;		return false;	}})();
