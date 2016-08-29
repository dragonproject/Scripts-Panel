(function sample0001(){	var flag = (new File("~/IDSample/sample.indd")).rename("myFile.indd");	if (flag == false)	{		alert("ファイル名が変更できませんでした");	}})();
