var text = app.activeDocument.textFrames[0].parentStory.contents;var result = text.match(/^[^〒]/gm);alert(result);//if (result) { alert(result.toString()); }
