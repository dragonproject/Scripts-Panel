docObj = app.activeDocument;tfObj = docObj.pages[0].textFrames.add();	// テキストフレームを追加tfObj.visibleBounds = ["0mm","0mm","297mm","210mm"];	// A4サイズのテキストフレームを作成fileObj = new File("~/IDSampleFolder/sample.txt");	// 読み込むファイルのパスを指定fileObj.open("r");tfObj.contents = fileObj.read();	// ファイル内容を全て読み込みテキストフレーム内に表示fileObj.close();
