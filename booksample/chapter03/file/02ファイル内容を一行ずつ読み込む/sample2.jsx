(function sample0001(){	var fileObj = File.openDialog("開くファイルを指定してください");	if (fileObj)	{		var flag = fileObj.open("r");		if (flag == true)		{			var text = fileObj.readln();	// ファイル内容を一行読み込む			alert(text);	// 読み込んだファイル内容を表示		}	}})();
