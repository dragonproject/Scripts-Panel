(function sample0001(){	var docObj = app.activeDocument;	for (var i=0; i<2; i++)	{		var marginPre = docObj.masterSpreads[0].pages[i].marginPreferences;	//マスターページのマージン設定		marginPre.top = "20mm";	//マージン（天）		marginPre.bottom = "15mm";	//マージン（地）		marginPre.left = "10mm";	//マージン（左・ノド）		marginPre.right = "10mm";	//マージン（右・小口）	}})();
