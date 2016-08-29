(function(){	var Color01 = app.activeDocument.colors.item("黄色");	if (Color01 == null)	{		Color01 = app.activeDocument.colors.add({colorValue:[0,0,100,0],model:ColorModel.process,space:ColorSpace.cmyk,name:"黄色"});	}	var Color02 = app.activeDocument.colors.item("橙色");	if (Color02 == null)	{		Color02 = app.activeDocument.colors.add({colorValue:[0,50,100,0],model:ColorModel.process,space:ColorSpace.cmyk,name:"橙色"});	}	var colorObj = [Color01, Color02];	var tableObj = app.activeDocument.selection;	for (var j=0; j<tableObj.length; j++)	{		for (i=0; i<tableObj[j].rows.length; i++)		{			var flag = i & 1;	// 基準を行ごとに変更する			for(var k=0; k<tableObj[j].rows[i].columns.length; k++)			{				tableObj[j].rows[i].cells[k].fillColor = colorObj[flag];				flag = flag ^ 1;	// 0と1を交互に切り替える			}		}	}})();
