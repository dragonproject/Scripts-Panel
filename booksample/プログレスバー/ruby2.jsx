// グローバル変数を用意し、ルビ対象漢字とルビの位置を格納するvar rubyPos = [];	// 漢字開始位置, 漢字終了位置, ルビ開始位置, ルビ終了位置var count = 0;(function(){	if (app.documents.length < 1) {		alert("あらかじめドキュメントを開いてから実行してください");		return;	}	var selObj = app.activeDocument.selection;	// テキストフレームを選択しているものとする	for (var p=0; p<selObj.length; p++){		checkRuby(selObj[p]);		setRuby(selObj[p]);	}})();// ルビチェックfunction checkRuby(tfObj){	var startRubyChar = "《";	// ルビ開始文字	var endRubyChar = "》";	// ルビ終了文字	var srcText = tfObj.parentStory.contents	var pbarPanel = createProgressBarPanel(srcText.length, 400,"ルビにする文字をチェック中...");	pbarPanel.show();	// プログレスバーを表示	for (var i=0; i<srcText.length; i++){		pbarPanel.progressBar.value = i;	// プログレスバーの割合を設定する		var c = srcText[i];		if (c != startRubyChar) continue;	// 全角の（が見つかるまで繰り返す		var sp = i;	// 開始位置		for (var j=i; j<srcText.length; j++){			if (srcText[j] != endRubyChar) continue;	// 全角の）が見つかるまで繰り返す			var ep = j;			break;		}		var rStr = srcText.substring(sp+1,ep);	// ルビ対象文字を抜き出す		var flag = rStr.match(/^[ぁ-ん|ァ-ン]/g);		if (flag != null){	// 全てひらがなだった場合に処理			for (var k=sp-1; k>-1; k--){				c = srcText.charAt(k);				flag = c.match(/^[一-龠|々]/);	// 漢字かどうか調べる				if (k == 0) {					k = -1;					flag = null;	// 文頭まで走査した				}				if (flag != null) continue;	// 漢字なら繰り返し前へ走査する				var spk = k+1;	// ルビをふる漢字の先頭位置				// var dstStr = srcText.substring(spk, sp);	// ルビを振る漢字を読み出したい場合				rubyPos[count] = [spk, sp, sp+1, ep];				count++;				break;			}		}	}	pbarPanel.close();	// プログレスバーを消す}// ルビを反映させる。文章の後方から置換しルビを割り当てるfunction setRuby(tfObj){	var pbarPanel = createProgressBarPanel(count, 400,"ルビをふっています...");	pbarPanel.show();	// プログレスバーを表示	for (var i=count-1; count>1; i--){		pbarPanel.progressBar.value = count - i;	// プログレスバーの割合を設定する		try{			var rubyStr = tfObj.parentStory.contents.substring(rubyPos[i][2], rubyPos[i][3]);		}catch(e){ return; }		tfObj.parentStory.characters.itemByRange(rubyPos[i][2]-1, rubyPos[i][3]).remove();		charaObj = tfObj.parentStory.characters.itemByRange(rubyPos[i][0], rubyPos[i][1]-1);		charaObj.rubyFlag = true; //ルビを設定する		charaObj.rubyType = RubyTypes.groupRuby; //グループルビ		charaObj.rubyString = rubyStr; //ルビ文字を設定	}	pbarPanel.close();	// プログレスバーを消す}//#targetengine "session"function createProgressBarPanel(maxValue, pBarWidth, message){	var pBar = new Window("window", "Progress",[80,150,530,220]);	pBar.msg = pBar.add("statictext", [12,12,pBarWidth,32], message);	pBar.progressBar = pBar.add("progressbar", [12, 32, pBarWidth, 54], 0, maxValue);	return pBar;}
