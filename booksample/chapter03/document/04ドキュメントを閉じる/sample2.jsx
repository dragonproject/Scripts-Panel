(function sample0001(){	while (app.documents.length > 0)	{		app.activeDocument.close(SaveOptions.no);	// 保存せずに閉じる	}})();
