(function sample0001(){	var fileObj = new File("~/sample.indd");	if (fileObj.exists == true)	{		app.open(fileObj);	}else{		alert("開くファイルがありません");	}})();
