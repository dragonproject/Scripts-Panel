(function sample0001(){	var docObj = app.documents.add();	docObj.documentPreferences.pageWidth = "140mm";	// 横幅は14cm	docObj.documentPreferences.pageHeight = "100mm";	// 縦幅は10cm	docObj.documentPreferences.pagesPerDocument = 3;	// 3ページ作成	docObj.documentPreferences.pageOrientation = PageOrientation.portrait;	docObj.cjkGridPreferences.showAllLayoutGrids = false; // レイアウトグリッドはオフ	docObj.documentPreferences.facingPages = true;	// 見開きページで作成	docObj.documentPreferences.pageBinding = PageBindingOptions.LEFT_TO_RIGHT;	// 左綴じ})();
