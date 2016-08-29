(function(){
	var CR = String.fromCharCode(13);
	var ppi = parseFloat(prompt("最低解像度を入れてください", 300));
	var docObj = app.activeDocument;
	for (var i=0; i<docObj.pages.length; i++) {
		var imageObj = docObj.pages[i].allGraphics;
		for (var j=0; j<imageObj.length; j++) {
			try {
				var xPpi = imageObj[j].effectivePpi[0];
			}catch(e){
				continue;
			}
			var yPpi = imageObj[j].effectivePpi[1];
			if ((xPpi < ppi) || (yPpi < ppi)) {
				app.activeWindow.activePage = docObj.pages[i];	// 指定ページに移動
				app.select(imageObj[j]);
				var srcXppi = imageObj[j].actualPpi[0];
				var srcYppi = imageObj[j].actualPpi[1];
				alert
				alert((i+1)+"ページに解像度の低い画像があります"+CR+"現在の解像度:"+xPpi+","+yPpi+CR+"元の解像度:"+srcXppi+","+srcYppi);
				return;
			}
		}
	}
})();
