var text = app.activeDocument.textFrames[0].parentStory.contents;var result = text.match(/\d\d\d\d年\d\d月\d\d日/g);if (result) alert(result.toString());
