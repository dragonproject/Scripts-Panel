(function(){
	var limitPer = 60;	// 60%を限界値にする
	var tableObj = app.activeDocument.selection;
	var rowObj = tableObj[0].rows;
	for (var i=0; i<rowObj.length; i++)
	{
		var cell = rowObj[i].cells;
		for (var j=0; j<cell.length; j++)
		{
			cellObj = cell[j];
			while (cellObj.overflows == true) {
				cellObj.texts[0].horizontalScale--;
				tableObj[0].parent.recompose(); // 表組の再構築
				if (cellObj.texts[0].horizontalScale <= limitPer) {
					break;
				}
			}
		}
	}
})();
