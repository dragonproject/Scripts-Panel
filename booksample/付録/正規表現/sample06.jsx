var text = app.activeDocument.textFrames[0].parentStory.contents;var result = text.match(/。$/gm);if (result) { alert(result.toString()); }
