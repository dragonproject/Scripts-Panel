var text = app.activeDocument.textFrames[0].parentStory.contents;var result = text.match(/InDesign/g);if (result) { alert(result.length); }
