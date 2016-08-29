(function(){
	var extType = "*.jpg";	// JPEGファイルだけを対象にする
	var imgsStartX = zeroX = 10; // ページの貼り込み位置
	var imgsStartY = zeroY = 20; // ページの貼り込み位置
	var maxImgWidth = parseFloat(prompt("横幅をmm単位で指定してください", 40));  // perseFloat
	var maxImgHeight = parseFloat(prompt("縦幅をmm単位で指定してください", 30));
    largeimgBounds.push (parseFloat(prompt("横幅をmm単位で指定してください", 40)));
    largeimgBounds.push (parseFloat(prompt("縦幅をmm単位で指定してください", 30)));
    //alert (largeimgBounds);
	var diff = parseFloat(prompt("画像との間隔をmm単位で指定してください",5));
	var pageWidth = 180;	// 180mm
	var pageHeight = 270;	// 270mm
    alert (pageBounds);
	var imgWidth = maxImgWidth - diff;
	var imgHeight = maxImgHeight - diff;
	var tfOfstWidth = 0;	// 画像の左枠からのオフセット(mm)
	var tfOfstWidth = 0.5;	// 画像の下枠からのオフセット(mm)
	var tfWidth = imgWidth;
//    var textFrame // 不要か？
    var tfBounds = []; // テキストフレームの
	var tfHeight = 2.5;	// テキストフレームの高さを6mmにする
	tfBounds.push(2.5);
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
		var tfsBaseTop = imgsStartY+imgHeight+tfOfstWidth;
		var tfTop = tfsBaseTop+unit;	// テキストフレームの上の位置
		var tfRight = (imgsStartX+tfOfstWidth+tfWidth)+unit;	// テキストフレームの右端の位置
		var tfBottom = (tfsBaseTop+tfHeight)+unit;	// テキストフレームの下の位置
		var tfLeft = (imgsStartX+tfOfstWidth)+unit;	// テキストフレームの左端の位置
		var tfsBaseTop = imgsStartY+imgHeight+tfOfstWidth;
		var textFrame = fileList[i].name; // ファイル名を変数に代入
		writetextFrame(pageObj, textFrame, tfsBaseTop, tfTop, tfRight, tfBottom, tfLeft);	// ファイル名を追加する関数
		imgObj = pageObj.rectangles.add();
		imgObj.visibleBounds = [imgsStartY+unit, imgsStartX+unit, (imgsStartY+imgHeight)+unit, (imgsStartX+imgWidth)+unit];
		imgObj.place(fileList[i]);
		imgObj.fit(FitOptions.contentToFrame); //フィット設定
		imgObj.fit(FitOptions.centerContent);
		imgsStartX = imgsStartX + maxImgWidth;
		if (imgsStartX > pageWidth){
//			alert(imgsStartX);  // 210 ページの追加ロジック
			imgsStartX = zeroX
			imgsStartY = imgsStartY + maxImgHeight;
			if (imgsStartY > pageHeight) {
				imgsStartX = zeroX;
				imgsStartY = zeroY;

				pageObj = app.activeDocument.pages.add(); //ページを追加
			}
		}
	}
})();
// テキストフレームを作成しファイル名を表示する処理
function writetextFrame(pageObj, text, tfsBaseTop, tfTop, tfRight, tfBottom, tfLeft){
//		var dakuten = "%E3%82%99";	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
//		var handakuten = "%E3%82%9A";	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
//		var text = convertKana(text,dakuten,1);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
//		var text = convertKana(text,handakuten,2);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
//		text = File.decode(text);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)
		var tfObj = pageObj.textFrames.add();
		tfObj.visibleBounds = [tfTop, tfRight, tfBottom, tfLeft];
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
