(function(){
	var keyword = "讀";	//　置換元の文字
	var repWord = "読";	//　置換後の文字
	app.findTextPreferences = NothingEnum.nothing;	// オプションはすべてなし。false
	app.changeTextPreferences = NothingEnum.nothing;	// オプションはすべてなし。false
	app.findTextPreferences.findWhat = keyword;	// 検索文字を制定
	app.changeTextPreferences.changeTo = repWord;	// 置換文字を指定

	for (var j=0; j<app.activeDocument.pages.length; j++){
		var pageObj = app.activeDocument.pages[j];	// 1ページごと置換
		for (var i=0; i<pageObj.textFrames.length;	i++){
			if (pageObj.textFrames[i].parentStory.contents.length > 0) {
				pageObj.textFrames[i].parentStory.changeText();
			}
		}
	}
})();
