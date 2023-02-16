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

// Web Storageからデータを読み込む
var storedIndex = localStorage.getItem("quizIndex");
if (storedIndex !== null) {
	currentQuestion = parseInt(storedIndex);
}

// 最初の問題を表示する
displayQuestion();

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
	} else {
		feedbackEl.innerHTML = "不正解。";
	}
}

// 答えを送信するボタンのクリックイベントを設定する
submitBtn.onclick = function() {
	checkAnswer();

	// 次の問題に進む
	currentQuestion++;

	// Web Storageに現在の問題のインデックスを保存する
	localStorage.setItem("quizIndex", currentQuestion.toString());

	// 最後の問題まで回答したら、最初の問題に戻る
	if (currentQuestion >= quiz.length) {
		currentQuestion = 0;
	}

	// 次の問題を表示する
	displayQuestion();

	// 答えの入力欄とフィードバックをリセットする
	answerInputEl.value = "";
	feedbackEl.innerHTML = "";
};
