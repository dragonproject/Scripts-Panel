(function(){	var Color01 = app.activeDocument.colors.item("黄色");	if (Color01 == null)	{		Color01 = app.activeDocument.colors.add({colorValue:[0,0,100,0],model:ColorModel.process,space:ColorSpace.cmyk,name:"黄色"});	}	var tableObj = app.activeDocument.selection;	for (var j=0; j<tableObj.length; j++)	{		for (i=0; i<tableObj[j].rows.length; i++)		{			for(var k=0; k<tableObj[j].rows[i].columns.length; k++)			{				var cellText = tableObj[j].rows[i].cells[k].contents;				if (cellText.charAt(0) == "-")	// 最初の文字がマイナス(-)なら以後の処理を行う				{					tableObj[j].rows[i].cells[k].fillColor = Color01;				}			}		}	}})();
