(function sample0001(){	var sourceFile = "~/IDSample/ジャズの歴史.indd";	var copyFile = "~/ジャズの歴史_copy.indd";	var flag = (new File(sourceFile)).copy(new File(copyFile));	if (flag == false)	{		alert("正しくファイルがコピーできませんでした");	}})();
