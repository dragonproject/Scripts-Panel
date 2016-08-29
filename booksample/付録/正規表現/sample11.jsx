var text = app.activeDocument.textFrames[0].parentStory.contents;var result = text.match(/[7-9]{3,4}/gm);alert(result);//if (result) { alert(result.toString()); }
