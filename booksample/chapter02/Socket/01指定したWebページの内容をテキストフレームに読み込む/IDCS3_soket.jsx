(function sample0001(){	var tfObj = app.activeDocument.pages[0].textFrames.add();	// 1ページ目に新規作成	tfObj.visibleBounds = ["1cm","2cm","28cm","18cm"];	tfObj.contents = getWebData("cetus.co.jp:80");})();// ソケット通信を使って指定されたサーバーのデータを読み込み返すfunction getWebData(sURL){	var sObj = new Socket;	sObj.encoding = "shift_jis";	if (sObj.open(sURL)){		sObj.write("GET\n");	// HTTPサーバーへのリクエスト(GETコマンド)		var text = "";		while(temp = sObj.read()){			text = text + File.decode(temp);		}		sObj.close();		return text;	}	return null;}
