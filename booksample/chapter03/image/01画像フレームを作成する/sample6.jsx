(function sample0001(){	app.polygonPreferences.numberOfSides = 8; // 8角形	app.polygonPreferences.insetPercentage = 10; // 10%	var imgObj = app.activeDocument.polygons.add();	imgObj.visibleBounds = ["20mm", "30mm", "70mm", "80mm"];	imgObj.place(new File("~/images/sample.jpg"));	imgObj.fit(FitOptions.fillProportionally);})();
