// ノートの初期位置
const initialNotePosition = -100;

// ノーツのスピード
const noteSpeed = 1;

// スコア
let score = 0;

// キーコード
const keyCodes = {
  65: "red", // A
  83: "yellow", // S
  68: "blue", // D
  70: "green" // F
};

// キーイベントの追加
document.addEventListener("keydown", event => {
  if (event.keyCode in keyCodes) {
    const key = document.querySelector(`.key.${keyCodes[event.keyCode]}`);
    key.classList.add("active");
    checkNoteCollision(keyCodes[event.keyCode]);
  }
});

document.addEventListener("keyup", event => {
  if (event.keyCode in keyCodes) {
    const key = document.querySelector(`.key.${keyCodes[event.keyCode]}`);
    key.classList.remove("active");
  }
});

// ノートの生成
function createNote() {
  const colors = Object.values(keyCodes);
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const note = document.createElement("div");
  note.classList.add("note", randomColor);
  note.style.left = Math.floor(Math.random() * 520) + "px";
  document.querySelector(".notes-container").appendChild(note);
}

// ノートの衝突判定
function checkNoteCollision(color) {
  const note = document.querySelector(`.note.${color}`);
  if (note) {
    const notePosition = note.getBoundingClientRect().top;
    const keyPosition = document.querySelector(`.key.${color}`).getBoundingClientRect().bottom;
    const noteWidth = note.getBoundingClientRect().width;
    if (notePosition < keyPosition && notePosition > keyPosition - noteWidth) {
      note.remove();
      score++;
      updateScore();
    }
  }
}

// スコアの更新
function updateScore() {
  const scoreElement = document.querySelector(".score-container span:last-child");
  scoreElement.textContent = score;
}

// メインループ
function loop() {
  createNote();
  const notes = document.querySelectorAll(".note");
  notes.forEach(note => {
    const notePosition = note.getBoundingClientRect().top;
    if (notePosition > 500) {
      note.remove();
    } else {
      note.style.top = notePosition + noteSpeed + "px";
    }
  });
  requestAnimationFrame(loop);
}

// ゲーム開始
loop();
