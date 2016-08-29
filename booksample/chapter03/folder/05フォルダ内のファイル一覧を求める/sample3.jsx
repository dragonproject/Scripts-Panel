(function sample0001(){	var foldername = Folder.selectDialog("フォルダを選択してください");	if (foldername)	{		fileList = foldername.getFiles();		alert(fileList.length + "個のファイルがありました");	}})();
