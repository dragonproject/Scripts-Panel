(function sample0001(){	while(app.documents.length > 0){ // 開かれているドキュメントがなくなるまで繰り返す		app.activeDocument.close(SaveOptions.no);	// 保存せずに閉じる	}	app.quit();	// 終了させる})();
