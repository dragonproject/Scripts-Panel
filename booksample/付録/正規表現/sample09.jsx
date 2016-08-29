var text = app.activeDocument.textFrames[0].parentStory.contents;var result = text.match(/東京都.{2,3}区/gm);alert(result);//if (result) { alert(result.toString()); }
