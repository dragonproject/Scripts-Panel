(function(){
	var docObj = app.activeDocument;
	for (var i=0; i<docObj.pages.length; i++)
	{
		var tfObj = docObj.pages[i].textFrames;
		for (var j=tfObj.length-1; j>=0; j--)
		{
			if (tfObj[j].contents == "")
			{
				tfObj[j].remove();
//				tfObj[j].fillColor(0,100,100,0);
			}
		}
	}
})();
