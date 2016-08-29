var text = app.activeDocument.textFrames[0].parentStory.contents;var result = text.match(/東京都(新宿区|千代田区)/g);alert(result);//if (result) { alert(result.toString()); }
