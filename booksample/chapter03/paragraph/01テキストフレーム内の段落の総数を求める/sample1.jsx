(function sample0001(){	var pageNo = 0;	// 1ページ目	var textframeNo = 0;	// 最前面のテキストフレーム	var count = app.activeDocument.pages[pageNo].textFrames[textframeNo].paragraphs.length;	alert("段落の総数："+count);})();
