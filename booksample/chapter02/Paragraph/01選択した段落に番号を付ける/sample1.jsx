(function(){	var selObj = app.activeDocument.selection;	var paraObj = selObj[0].paragraphs;	var count = paraObj.length;	for (var i=paraObj.length-1; i>=0; i--){		paraObj[i].insertionPoints[0].contents = count+" : ";		count--;	}})();
