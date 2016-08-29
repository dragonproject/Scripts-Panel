(function sample0001(){
	var imgObj = app.activeDocument.pages[0].allGraphics[0];
	imgObj.transparencySettings.featherSettings.mode = FeatherMode.standard;
	imgObj.transparencySettings.featherSettings.cornerType = FeatherCornerType.rounded;
	imgObj.transparencySettings.featherSettings.width = "3mm";
})();
