(function(){	var extType = "*.jpg";	// JPEGファイルだけを対象にする	var imageX = startX = 10;	var imageY = startY = 20;	var dx = 50;	var dy = 30;	var pageWidth = 180;	// 180mm	var pageHeight = 270;	// 270mm	var imageWidth = 45;	var imageHeight = 25;	var unit = "mm";	if (app.documents.length < 1) {		alert("あらかじめドキュメントを開いてから実行してください");		return;	}	var folderObj = Folder.selectDialog("JPEG画像のあるフォルダを選択してください");	if (!folderObj) return;	// キャンセルボタンが押された時は処理しない	var pageNo = parseInt(prompt("割り付けるページ数を指定してください",1)) - 1;	if ((pageNo < 0) || (pageNo > app.activeDocument.pages.length-1)){		alert("割り付けるページは存在しません");		return;	}	var fileList = folderObj.getFiles(extType);	if (fileList.length < 1) {		alert("割り付ける画像がありません");		return;	}	var pageObj = app.activeDocument.pages[pageNo];	for (var i=0; i<fileList.length; i++){		imgObj = pageObj.rectangles.add();		imgObj.visibleBounds = [imageY+unit, (imageX+imageWidth)+unit, (imageY+imageHeight)+unit, imageX+unit];		imgObj.place(fileList[i]);		imgObj.fit(FitOptions.proportionally);		imgObj.fit(FitOptions.centerContent);		imageX = imageX + dx;		if (imageX > pageWidth){			imageX = startX;			imageY = imageY + dy;			if (imageY > pageHeight) return;	// ページの高さを超えたら、これ以上はレイアウトしない		}	}})();
