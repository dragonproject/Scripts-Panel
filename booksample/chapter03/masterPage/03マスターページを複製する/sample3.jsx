(function sample0001(){	var pageObj = app.activeDocument.masterSpreads[1]; // 2個目を基準にする	app.activeDocument.masterSpreads[0].duplicate(LocationOptions.after, pageObj);})();
