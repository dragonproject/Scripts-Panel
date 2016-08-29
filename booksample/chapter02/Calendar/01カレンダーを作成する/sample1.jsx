(function(){
	var baseX = 10;	//■カレンダーの最初の表示位置（10mm）
	var baseY = 10;	//■カレンダーの最初の表示位置（10mm）
	var blockW = 200;	//■1月あたりの一時的な横幅(200mm)
	var blockH = 100;	//■1月あたりの一時的な縦幅(100mm)
	var marginW = 5;	//■横の余白(5mm)
	var marginH = 5;	//■縦の余白(5mm)
	var calW = 60;	// カレンダーの表の横幅
	var calH = 40;	// カレンダーの表の縦幅
	var docObj = app.activeDocument;
	var calYear = prompt("作成する年を入れてください",2016);
	var pageNo = parseInt(prompt("生成したいページ番号を指定してください",1)) - 1;
	var storeX = baseX;
	var cal = 1;
	for (var cy=0; cy<4; cy++){	//■縦に4つ
		for (var cx=0; cx<3; cx++){	//■横に3つ
			var result = calendar(calYear, cal);
			// テキストフレームを生成し結果を表示する
			var tfObj = app.activeDocument.pages[pageNo].textFrames.add();
			tfObj.visibleBounds = [baseY+"mm",baseX+"mm",baseY+blockH+"mm",baseX+blockW+"mm"];
			tfObj.contents = result;
			tfObj.texts[0].convertToTable(String.fromCharCode(9),String.fromCharCode(13));
			tfObj.tables[0].width = calW+"mm";
			for (var i=1; i<tfObj.tables[0].rows.length; i++){
				for (var j=0; j<tfObj.tables[0].rows[i].cells.length; j++){
					if (tfObj.tables[0].rows[i].cells[j].paragraphs.length > 0){
						tfObj.tables[0].rows[i].cells[j].paragraphs[0].justification = Justification.rightAlign;
					}
				}
			}
			var cell1 = tfObj.tables[0].rows[0].cells[0];
			var cell2 = tfObj.tables[0].rows[0];
			cell1.merge(cell2);
			tfObj.fit(FitOptions.frameToContent);
			baseX += calW + marginW;
			cal++;
		}
		baseX = storeX;
		baseY += calH + marginH;
	}
})();
// カレンダーのテキストを生成し返す
function calendar(theYear__,theMonth__){
	var result = "";	// 生成結果を入れる変数
	var CR = String.fromCharCode(13); //CharCode(13)=="\n"
	var Tab = String.fromCharCode(9); //CharCode(9)=="\t"
	var wrtMonth= new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
	var wrtDate = new Array("日","月","火","水","木","金","土");
	var dateObj = new Date();			// dateObj 日付オブジェクトを生成
	if (theYear__){						// 年月が指定されていた場合は年月を再設定。指定されていなければ現在の日付
		dateObj.setYear(theYear__);		// 指定年を設定
		dateObj.setMonth(theMonth__-1);	// 指定月を設定
	}
	theYear__ = dateObj.getFullYear();	// 西暦をYYYY形式で取得
	theMonth__= dateObj.getMonth()+1;
	if (((theYear__ % 4 == 0) && (theYear__ % 100 != 0)) || (theYear__ % 400 == 0)){
		wrtMonth[2] = 29;				// 閏年だったら2月を29日にする
	}
	dateObj.setFullYear(theYear__);		// 指定年を設定
	dateObj.setMonth(theMonth__-1);		// 指定月を設定
	dateObj.setDate(1);					// 日付を１日にし曜日を次の行で取得
	var weekDay = dateObj.getDay();		// 朔の曜日を取得
	var index   = 0;						// 曜日カウンタを0にする
	var date  = 1;						// 日付を朔にする
	result = result + theYear__+"年"+theMonth__+"月" + CR;	//
	alert(result);
	for(var i=0;i<7;i++) {
		result = result + wrtDate[i];	// 曜日書き出し "月火水木金土日"
		if (i < 6) { result = result + Tab; }
	}
	alert(result);
	result = result + CR;				// 改行する
	for(i=1; i<=wrtMonth[theMonth__] + weekDay; i++){ // 指定月の日数分繰り返し
		if (index>=weekDay){				// index = 0, index++ / weekDay 一日の曜日
			var wrt = "" + date;
			date++;
		}else{ wrt = " "; }
		result = result + wrt;
		if (index % 7 < 6) { result = result + Tab; }
		if (index % 7 == 6) {
			if (i != wrtMonth[theMonth__]+weekDay){
				result = result + CR;
			}
		}
		index++;			// 1日増やす
	}
	alert(result);
	return result;
}
