(function sample0001(){	var fileObj = File.saveDialog("保存先を指定してください");	if (fileObj == null) { return; }	var flag = fileObj.open("w");	// ファイルを書き込みモードで開く	if(flag == true){		var text = getWebData("www.openspc2.org:80");		fileObj.write(text);	// ファイルを改行なしで書き出す		fileObj.close();	// ファイルを閉じる	}else{		alert("書き込むファイルを開けません");	}})();// ソケット通信を使って指定されたサーバーのデータを読み込み返すfunction getWebData(sURL){	var sObj = new Socket;	sObj.encoding = "utf-8";	if (sObj.open(sURL)){		sObj.write("GET\n");	// HTTPサーバーへのリクエスト(GETコマンド)		var text = "";		while(temp = sObj.read()){			text = text + temp;		}		sObj.close();		return text;	}	return null;}
