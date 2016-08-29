(function(){
	var extType = "*.jpg";	// JPEGファイルだけを対象にする
	var imageX = startX = 10;
	var imageY = startY = 20;
	var dx = parseFloat(prompt("横幅をmm単位で指定してください", 50));
	var dy = parseFloat(prompt("縦幅をmm単位で指定してください", 30));
	var diff = parseFloat(prompt("画像との間隔をmm単位で指定してください",5));
	var pageWidth = 180;	// 180mm
	var pageHeight = 270;	// 270mm
	var imageWidth = dx - diff;
	var imageHeight = dy - diff;
	var filenameX = 0;	// 画像の左枠からのオフセット(mm)
	var filenameY = 0.5;	// 画像の下枠からのオフセット(mm)
	var filenameWidth = imageWidth;
	var filenameHeight = 6;	// 画像との間隔を6mmにする
	var unit = "mm";
	if (app.documents.length < 1) {
		alert("あらかじめドキュメントを開いてから実行してください");
		return;
	}
	var folderObj = Folder.selectDialog("JPEG画像のあるフォルダを選択してください");
	if (!folderObj) return;	// キャンセルボタンが押された時は処理しない
	var pageNo = parseInt(prompt("割り付けるページ数を指定してください",1)) - 1;
	if ((pageNo < 0) || (pageNo > app.activeDocument.pages.length-1)){
		alert("割り付けるページは存在しません");
		return;
	}
	var fileList = folderObj.getFiles(extType);
	if (fileList.length < 1) {
		alert("割り付ける画像がありません");
		return;
	}
	var pageObj = app.activeDocument.pages[pageNo];
	for (var i=0; i<fileList.length; i++){
		var textBaseY = imageY+imageHeight+filenameY;
		var TextFrameTop = textBaseY+unit;	// テキストフレームの上の位置
		var TextFrameRight = (imageX+filenameX+filenameWidth)+unit;	// テキストフレームの右端の位置
		var TextFrameBottom = (textBaseY+filenameHeight)+unit;	// テキストフレームの下の位置
		var TextFrameLeft = (imageX+filenameX)+unit;	// テキストフレームの左端の位置
		var textBaseY = imageY+imageHeight+filenameY;
		var filename = fileList[i].name;
		writeFilename(pageObj, filename, textBaseY, TextFrameTop, TextFrameRight, TextFrameBottom, TextFrameLeft);	// ファイル名を追加
		imgObj = pageObj.rectangles.add();
		imgObj.visibleBounds = [imageY+unit, (imageX+imageWidth)+unit, (imageY+imageHeight)+unit, imageX+unit];
		imgObj.place(fileList[i]);
		imgObj.fit(FitOptions.proportionally);
		imgObj.fit(FitOptions.centerContent);
		imageX = imageX + dx;
		if (imageX > pageWidth){
			imageX = startX;
			imageY = imageY + dy;
			if (imageY > pageHeight) {
				imageX = startX;
				imageY = startY;
				pageObj = app.activeDocument.pages.add();
			}
		}
	}
})();
// テキストフレームを作成しファイル名を表示する処理
function writeFilename(pageObj, text, textBaseY, TextFrameTop, TextFrameRight, TextFrameBottom, TextFrameLeft){
		var dakuten = "%E3%82%99";	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		var handakuten = "%E3%82%9A";	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		text = convertKana(text,dakuten,1);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		text = convertKana(text,handakuten,2);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		text = File.decode(text);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		var tfObj = pageObj.textFrames.add();
		tfObj.visibleBounds = [TextFrameTop, TextFrameRight, TextFrameBottom, TextFrameLeft];
		tfObj.contents = text;
		return tfObj;	// 作成されたテキストオブジェクトを返す。後利用を考慮して、このようにしておく
}
// MacOS X+InDesign CS2の組み合わせで日本語が含まれた場合の不具合を解消する処理
function convertKana(srcName, code, count){
	srcName = srcName.replace(/%E3%82%BF%E3%82%99/g, "%E3%83%80"); // ダだけ特殊処理
	var text = srcName.split(code); // 濁点
	for (var i=0; i<text.length-1; i++){
		var str = text[i];
		if (str == "") continue;
		var body = str.substring(0,str.length-2);
		var footL = str.substring(str.length-2, str.length);
		var hexL = eval("0x"+footL) + count;
		hexL = hexL.toString(16).toUpperCase();
		text[i] = body+hexL;
	}
	return text.join("");
}
