(function sample0001(){	var C = 0;	// シアン	var M = 100;	// マゼンタ	var Y = 100;	// イエロー	var K = 0;	// ブラック	var colorOption = {colorValue:[C,M,Y,K],model:ColorModel.process,space:ColorSpace.cmyk}	var Color01 = app.activeDocument.colors.add(colorOption);	var tableObj = app.activeDocument.selection;	var cell1 = tableObj[0].rows[0].cells[0];	var sType = app.activeDocument.strokeStyles.item("句点");	cell1.bottomEdgeStrokeType = sType;	cell1.bottomEdgeStrokeWeight = "4pt";	cell1.bottomEdgeStrokeColor = Color01;})();
