(function sample0001(){	var defaultPath = "~/";	var folderObj = Folder.selectDialog("フォルダを指定してください", defaultPath);	if (folderObj)	{		alert(folderObj.fsName);	}})();
