// @ts-nocheck
document.addEventListener("DOMContentLoaded", () => {
  /************ HTML ELEMENTS ************/
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const restartButton = document.querySelector("#restartButton");

  const resultContainer = document.querySelector("#result");
  const timeRemainingContainer = document.getElementById("timeRemaining");

  /************ QUIZ DATA ************/
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question(
      "What is the capital of France?",
      ["Miami", "Paris", "Oslo", "Rome"],
      "Paris",
      1
    ),
    new Question(
      "Who created JavaScript?",
      ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"],
      "Brendan Eich",
      2
    ),
    new Question(
      "What is the mass–energy equivalence equation?",
      ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"],
      "E = mc^2",
      3
    ),
    new Question(
      "Which planet is known as the Red Planet?",
      ["Venus", "Saturn", "Mars", "Jupiter"],
      "Mars",
      1
    ),

    new Question(
      "What does HTML stand for?",
      [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyper Technical Modern Language",
      ],
      "Hyper Text Markup Language",
      1
    ),

    new Question(
      "Which data structure uses FIFO (First In First Out)?",
      ["Stack", "Queue", "Tree", "Graph"],
      "Queue",
      2
    ),

    new Question(
      "Which country hosted the 2020 Summer Olympics?",
      ["Brazil", "Japan", "China", "UK"],
      "Japan",
      2
    ),

    new Question(
      "What is the value of π (pi) approximately?",
      ["2.14", "3.14", "4.14", "5.14"],
      "3.14",
      1
    ),

    new Question(
      "Who painted the Mona Lisa?",
      [
        "Vincent van Gogh",
        "Leonardo da Vinci",
        "Pablo Picasso",
        "Claude Monet",
      ],
      "Leonardo da Vinci",
      2
    ),
  ];

  const quizDuration = 120; // seconds
  let timer = null;

  const quiz = new Quiz(questions, quizDuration, quizDuration);
  quiz.shuffleQuestions();

  /************ INITIAL VIEW ************/
  quizView.style.display = "block";
  endView.style.display = "none";
  updateTimerDisplay();
  showQuestion();
  startTimer();

  /************ TIMER FUNCTION ************/
  function startTimer() {
    clearInterval(timer); // just in case
    timer = setInterval(() => {
      if (quiz.timeRemaining <= 0) {
        clearInterval(timer);
        showResults();
        return;
      }
      quiz.timeRemaining--;
      updateTimerDisplay();
    }, 1000);
  }

  function updateTimerDisplay() {
    const minutes = String(Math.floor(quiz.timeRemaining / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(quiz.timeRemaining % 60).padStart(2, "0");
    timeRemainingContainer.innerText = `${minutes}:${seconds}`;
  }

  /************ EVENT LISTENERS ************/
  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", startOver);

  /************ DISPLAY FUNCTIONS ************/
  function showQuestion() {
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear previous content
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get current question and shuffle choices
    const currentQuestion = quiz.getQuestion();
    currentQuestion.shuffleChoices();

    // Display question
    questionContainer.innerText = currentQuestion.text;

    // Update progress bar
    const progress = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // Show question count
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      quiz.questions.length
    }`;

    // Render choices
    currentQuestion.choices.forEach((choice, i) => {
      const li = document.createElement("li");
      const radio = document.createElement("input");
      const label = document.createElement("label");

      radio.type = "radio";
      radio.name = "answer";
      radio.value = choice;
      radio.id = `choice${i}`;
      label.htmlFor = radio.id;
      label.innerText = choice;

      li.appendChild(radio);
      li.appendChild(label);
      choiceContainer.appendChild(li);
    });
  }

  function nextButtonHandler() {
    const selected = document.querySelector(
      "#choices input[type='radio']:checked"
    );
    if (!selected) return;

    quiz.checkAnswer(selected.value);
    quiz.moveToNextQuestion();
    showQuestion();
  }

  function showResults() {
    clearInterval(timer);
    quizView.style.display = "none";
    endView.style.display = "flex";
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
  }

  function startOver() {
    quizView.style.display = "flex";
    endView.style.display = "none";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.timeRemaining = quiz.timeLimit;
    quiz.shuffleQuestions();
    showQuestion();
    updateTimerDisplay();
    startTimer();
  }
});
