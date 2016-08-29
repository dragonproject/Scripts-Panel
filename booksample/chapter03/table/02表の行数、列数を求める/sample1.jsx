(function sample0001(){	var tfObj = app.activeDocument.textFrames[0];	var tableObj = tfObj.tables[0];	var row = tableObj.bodyRowCount;	var col = tableObj.columnCount;	alert(row+"×"+col);})();
