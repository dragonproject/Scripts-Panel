(function(){
	var extType = "*.jpg";	// JPEGファイルだけを対象にする
	var imageStartX = startX = 10; // ページの貼り込み位置
	var imageStartY = startY = 20; // ページの貼り込み位置
	var startOriginal=[10,20];
	alert(startOriginal);
	var largeImageWidth = parseFloat(prompt("横幅をmm単位で指定してください", 40));  // perseFloat
	var largeImageHeight = parseFloat(prompt("縦幅をmm単位で指定してください", 30));
    var largeImageBounds = [];
    largeImageBounds.push (parseFloat(prompt("横幅をmm単位で指定してください", 40)));
    largeImageBounds.push (parseFloat(prompt("縦幅をmm単位で指定してください", 30)));
    //alert (largeImageBounds);
	var diff = parseFloat(prompt("画像との間隔をmm単位で指定してください",5));
	var pageWidth = 180;	// 180mm
	var pageHeight = 270;	// 270mm
    var pageBounds = [180, 270];
    //alert (pageBounds);
	var imageWidth = largeImageWidth - diff;
	var imageHeight = largeImageHeight - diff;
    pageBounds[0] = pageBounds[0] - diff;
    pageBounds[1] = pageBounds[1] - diff;
    alert (pageBounds);
	var textFrameOffsetWidth = 0;	// 画像の左枠からのオフセット(mm)
	var textFrameOffsetHeight = 0.5;	// 画像の下枠からのオフセット(mm)
	var textFrameWidth = imageWidth;
	var textFrameHeight = 2.5;	// テキストフレームの高さを6mmにする
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
		var textFrameBaseTop = imageStartY+imageHeight+textFrameOffsetHeight;
		var textFrameTop = textFrameBaseTop+unit;	// テキストフレームの上の位置
		var textFrameRight = (imageStartX+textFrameOffsetWidth+textFrameWidth)+unit;	// テキストフレームの右端の位置
		var textFrameBottom = (textFrameBaseTop+textFrameHeight)+unit;	// テキストフレームの下の位置
		var textFrameLeft = (imageStartX+textFrameOffsetWidth)+unit;	// テキストフレームの左端の位置
		var textFrameBaseTop = imageStartY+imageHeight+textFrameOffsetHeight;
		var textFrame = fileList[i].name; // ファイル名を変数に代入
		writetextFrame(pageObj, textFrame, textFrameBaseTop, textFrameTop, textFrameRight, textFrameBottom, textFrameLeft);	// ファイル名を追加
		imgObj = pageObj.rectangles.add();
		imgObj.visibleBounds = [imageStartY+unit, (imageStartX+imageWidth)+unit, (imageStartY+imageHeight)+unit, imageStartX+unit];
		imgObj.place(fileList[i]);
//		imgObj.fit(FitOptions.proportionally); //フィット設定
		imgObj.fit(FitOptions.contentToFrame); //フィット設定
		imgObj.fit(FitOptions.centerContent);
		imageStartX = imageStartX + largeImageWidth;
		if (imageStartX > pageWidth){
//			alert(imageStartX);  // 210 ページの追加ロジック
			imageStartX = startX
			imageStartY = imageStartY + largeImageHeight;
			if (imageStartY > pageHeight) {
				imageStartX = startX;
//				alert(imageStartX); //10
				imageStartY = startY;
//				alert(imageStartY); //20

				pageObj = app.activeDocument.pages.add(); //ページを追加
			}
		}
	}
})();
// テキストフレームを作成しファイル名を表示する処理
function writetextFrame(pageObj, text, textFrameBaseTop, textFrameTop, textFrameRight, textFrameBottom, textFrameLeft){
		var dakuten = "%E3%82%99";	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		var handakuten = "%E3%82%9A";	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		text = convertKana(text,dakuten,1);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		text = convertKana(text,handakuten,2);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		text = File.decode(text);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		var tfObj = pageObj.textFrames.add();
		tfObj.visibleBounds = [textFrameTop, textFrameRight, textFrameBottom, textFrameLeft];
		tfObj.contents = text;
		return tfObj;	// 作成されたテキストオブジェクトを返す。後利用を考慮して、このようにしておく
}
// MacOS X+InDesign CS2の組み合わせで日本語が含まれた場合の不具合を解消する処理
function convertKana(srcName, code, count){
	srcName = srcName.replace(/%E3%82%BF%E3%82%99/g, "%E3%83%80"); // 濁点だけ特殊処理
	var text = srcName.split(code); //
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
