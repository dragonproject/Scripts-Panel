var text = app.activeDocument.textFrames[0].parentStory.contents;var result = text.match(/^〒\d\d\d-\d\d\d\d/gm);alert(result);//if (result) { alert(result.toString()); }
