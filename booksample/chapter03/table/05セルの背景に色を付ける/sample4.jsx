(function(){	var Color01 = app.activeDocument.colors.item("黄色");	if (Color01 == null)	{		var C = 0;	// シアン		var M = 0;	// マゼンタ		var Y = 100;	// イエロー		var K = 0;	// ブラック		var colorOption = {colorValue:[C,M,Y,K],model:ColorModel.process,space:ColorSpace.cmyk,name:"黄色"}		Color01 = app.activeDocument.colors.add(colorOption);	}	var tableCellObj = app.activeDocument.selection[0].cells;	for (var j=0; j<tableCellObj.length; j++)	{		var ptr = parseInt((tableCellObj[j].name).split(":")[1]); // nameは列数:行数の文字列		//	行数でなく列数を処理したい場合は以下のようにしてください		//		var ptr = parseInt((tableCellObj[j].name).split(":")[0]); // nameは列数:行数の文字列		var flag = ptr & 1;	// セル順の都合で偶数ならflagは1、奇数なら0になる		if (flag == 1)		{				tableCellObj[j].fillColor = Color01;		}}})();
