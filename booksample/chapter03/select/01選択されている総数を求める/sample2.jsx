(function sample0001(){	var selObj = app.activeDocument.selection;	var count = selObj.length;	for (var i=0; i<count; i++)	{		if (selObj[i].contentType == ContentType.textType)		{			alert("テキストフレームです");		}		if (selObj[i].contentType == ContentType.graphicType)		{			alert("画像フレームです");		}		if (selObj[i].contentType == ContentType.unassigned)		{			alert("何も割り当てられていないフレームです");		}	}})();
