var text = app.activeDocument.textFrames[0].parentStory.contents;var result = text.match(/....年..月..日/g);if (result) alert(result.toString());
