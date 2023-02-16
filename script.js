// 問題と答えのリスト
var quiz = [
    {
        question: "日本の首都は？",
        answer: "東京"
    },
    {
        question: "アメリカ合衆国の首都は？",
        answer: "ワシントンD.C."
    },
    {
        question: "日本で最も高い山は？",
        answer: "富士山"
    },
    {
        question: "世界で最も人口が多い国は？",
        answer: "中国"
    },
    {
        question: "世界で最も広い国は？",
        answer: "ロシア"
    }
];

// 現在の問題のインデックスを保持する変数
var currentQuestion = 0;

// HTML要素を取得
var questionEl = document.getElementById("question");
var answerInputEl = document.getElementById("answer-input");
var submitBtn = document.getElementById("submit-answer");
var feedbackEl = document.getElementById("feedback");
var startFromBeginningBtn = document.getElementById("start-from-beginning");
var startFromMiddleBtn = document.getElementById("start-from-middle");

// Web Storageからデータを読み込む
var storedIndex = localStorage.getItem("quizIndex");
if (storedIndex !== null) {
    currentQuestion = parseInt(storedIndex);
} else {
    // Web Storageにデータがない場合は、最初の問題から始める
    displayQuestion();
}

// 最初の問題を表示する関数
function displayQuestion() {
    questionEl.innerHTML = quiz[currentQuestion].question;
}

// 答えをチェックして、フィードバックを表示する関数
function checkAnswer() {
    var userAnswer = answerInputEl.value.toLowerCase().trim();
    var correctAnswer = quiz[currentQuestion].answer.toLowerCase().trim();

    if (userAnswer === correctAnswer) {
        feedbackEl.innerHTML = "正解！";
        // 次の問題に進む
        currentQuestion++;
        if (currentQuestion < quiz.length) {
            displayQuestion();
        } else {
            // 全ての問題を解いた場合は、Web Storageを削除して最初から始める
            localStorage.removeItem("quizIndex");
            startFromBeginningBtn.style.display = "inline-block";
            startFromMiddleBtn.style.display = "none";
            questionEl.innerHTML = "おめでとう！クイズをクリアしました。";
        }
    } else {
        feedbackEl.innerHTML = "不正解。もう一度解いてください。";
    }

    // Web Storageに現在の問題のインデックスを保存する
    localStorage.setItem("quizIndex", currentQuestion);
}

// 最初から始めるボタンがクリックされたときの処理
startFromBeginningBtn.onclick = function() {
    currentQuestion = 0;
    localStorage.setItem("quizIndex", currentQuestion);
    displayQuestion();
    startFromBeginningBtn.style.display = "none";
    startFromMiddleBtn.style.display = "inline-block";
};


// 途中から始めるボタンがクリックされたときの処理
startFromMiddleBtn.onclick = function() {
    currentQuestion = 0;
    localStorage.setItem("quizIndex", currentQuestion);
    displayQuestion();
    startFromBeginningBtn.style.display = "none";
    startFromMiddleBtn.style.display = "inline-block";
};
