(function sample0001(){	var docObj = app.activeDocument;	for (var i=0; i<2; i++)	{		var marginPre = docObj.masterSpreads[0].pages[i].marginPreferences;	//マスターページのプレファレンス		marginPre.columnDirection = HorizontalOrVertical.HORIZONTAL;	//組み方向	}})();
