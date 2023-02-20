const notes = [0, 1, 2, 3]; // 4つのノート

// ノートを押した時の処理
function pressNote() {
  $(this).addClass("note-pressed");
}

// ノートを離した時の処理
function releaseNote() {
  $(this).removeClass("note-pressed");
}

// ノートを生成して配置する処理
function generateNotes() {
  notes.forEach((note) => {
    const noteContainer = $(`[data-note="${note}"]`);
    const noteElem = $("<div>").addClass("note");
    noteElem.on("mousedown touchstart", pressNote);
    noteElem.on("mouseup touchend", releaseNote);
    noteContainer.append(noteElem);
  });
}

$(document).ready(() => {
  generateNotes();
});
