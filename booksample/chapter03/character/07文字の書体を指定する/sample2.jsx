(function sample0001(){	var fontObj = app.fonts.item("小塚ゴシック Pro");	var tfObj = app.activeDocument.pages[0].textFrames[0];	for (var i=0; i<tfObj.paragraphs.length; i++)	{		if (tfObj.paragraphs[i].characters[0].contents == "■")		{			tfObj.paragraphs[i].appliedFont = fontObj;			tfObj.paragraphs[i].fontStyle = "H";		}	}})();
