// ライブラリを読み込む
#include "./layout2.jsxinc"

// 1から10までの番号付きのファイル名を持つテキストファイルを配置
posY = 20;	// 上から20mmからレイアウト開始
for (i=1; i<=10; i++)
{
	filePath = "~/IDSampleFolder/"+i+".txt";	// 1.txt〜10.txt
	frameSize = [posY+"mm","0mm",(posY+20)+"mm","210mm"];
	pageNo = 0;	// 1ページ目
	flag = Gihyo.layoutTextFile(filePath, frameSize, pageNo);
	if (flag == true)
	{
		posY = posY + 20;	 // 20mm足して下へ
	}
}
