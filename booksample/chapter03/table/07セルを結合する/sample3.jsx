(function sample0001(){	var tableObj = app.activeDocument.selection;	var cell1 = tableObj[0].columns[0].cells[0];	var cell2 = tableObj[0].columns[0].cells[1];	cell1.merge(cell2);})();
