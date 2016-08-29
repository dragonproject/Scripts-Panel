var extType = ".txt";	// テキストファイルを対象にする（拡張子が.txt）var aTop = 20;var aRight = 180;var aBottom = 60;var aLeft = 20;var unit = "mm";	// 単位var startY = 20;var limitY = 200;var aHeight = aBottom - aTop;	// 高さvar aStep = 10;	// テキストフレームとの間隔var pageObj;	// ページオブジェクトvar setColor = [0, 0, 100, 0];var Color01 = app.activeDocument.colors.item("C=0 M=0 Y=100 K=0");if (Color01 == null){	Color01 = app.activeDocument.colors.add({colorValue:setColor,model:ColorModel.process,space:ColorSpace.cmyk,name:"C=0 M=0 Y=100 K=0"});}(function(){	if (app.documents.length < 1) {		alert("あらかじめドキュメントを開いてから実行してください");		return;	}	var folderObj = Folder.selectDialog("フォルダを選択してください");	if (!folderObj) return;	// キャンセルボタンが押された時は処理しない	var pageNo = parseInt(prompt("割り付ける開始ページを指定してください",1)) - 1;	if ((pageNo < 0) || (pageNo > app.activeDocument.pages.length-1)){		alert("割り付けるページは存在しません");		return;	}	var fileList = folderObj.getFiles("*");	pageObj = app.activeDocument.pages[pageNo];	getFileList(fileList,pageObj);})();// ファイル一覧を返す処理function getFileList(fileList){	var dakuten = "%E3%82%99";	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)	var handakuten = "%E3%82%9A";	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)	var CR = String.fromCharCode(13);	for (var i=0; i<fileList.length; i++){		var filename = fileList[i].name;		if (filename.charAt(0) == ".") continue;		filename = convertKana(filename,dakuten,1);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)		filename = convertKana(filename,handakuten,2);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)		filename = File.decode(filename);	// ★Mac版InDesign CS2用 (WindowsやCS3では不要)		if (fileList[i].getFiles) {			getFileList(fileList[i].getFiles("*"));		}else{			if (filename.indexOf(extType) == -1) continue;	// 指定された拡張子でない場合は繰り返しの先頭へ			var fileObj = new File(fileList[i].fsName);			var tfObj = pageObj.textFrames.add();			tfObj.visibleBounds = [aTop+unit, aRight+unit, aBottom+unit, aLeft+unit];			tfObj.fillColor = Color01;	// 分かりやすいように背景色を付ける			if (fileObj.open("r") == true){				var fileData = fileObj.read();	// 全て読み込む				tfObj.contents = "■"+File.decode(fileList[i].path)+"/"+filename+CR+fileData;	// パスはMacOS X + CSでは文字化け				fileObj.close();			}else{				tfObj.contents = "▲"+filename+"ファイルは開けませんでした";			}			for (var j=0; j<tfObj.paragraphs.length; j++){				tfObj.paragraphs[j].justification = Justification.leftAlign;			}			aTop = aTop + aHeight + aStep;			aBottom = aBottom + aHeight + aStep;			if (aTop > limitY){				pageObj = app.activeDocument.pages.add();				aTop = startY;				aBottom = startY + aHeight;			}		}	}}// MacOS X+InDesign CS2の組み合わせで日本語が含まれた場合の不具合を解消する処理function convertKana(srcName, code, count){	srcName = srcName.replace(/%E3%82%BF%E3%82%99/g, "%E3%83%80"); // ダだけ特殊処理	var text = srcName.split(code); // 濁点	for (var i=0; i<text.length-1; i++){		var str = text[i];		if (str == "") continue;		var body = str.substring(0,str.length-2);		var footL = str.substring(str.length-2, str.length);		var hexL = eval("0x"+footL) + count;		hexL = hexL.toString(16).toUpperCase();		text[i] = body+hexL;	}	return text.join("");}
