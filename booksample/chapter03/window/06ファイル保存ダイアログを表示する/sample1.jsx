(function sample0001(){	var fileObj = File.saveDialog("保存先を指定してください");	if (fileObj != null)	{		alert(fileObj.fsName);	}else{		alert("キャンセルされました");	}})();
