(function sample0001(){	var tfObj = app.activeDocument.pages[0].textFrames[0];	while (tfObj.tables.length > 0)	{		var tableObj = tfObj.tables[0];		tableObj.remove();	}})();
