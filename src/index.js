// @ts-nocheck
document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const restartButton = document.querySelector("#restartButton");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
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

    // new Question(
    //   "Which planet is known as the Red Planet?",
    //   ["Venus", "Saturn", "Mars", "Jupiter"],
    //   "Mars",
    //   1
    // ),

    // new Question(
    //   "What does HTML stand for?",
    //   [
    //     "Hyper Text Markup Language",
    //     "Home Tool Markup Language",
    //     "Hyperlinks and Text Markup Language",
    //     "Hyper Technical Modern Language",
    //   ],
    //   "Hyper Text Markup Language",
    //   1
    // ),

    // new Question(
    //   "Which data structure uses FIFO (First In First Out)?",
    //   ["Stack", "Queue", "Tree", "Graph"],
    //   "Queue",
    //   2
    // ),

    // new Question(
    //   "Which country hosted the 2020 Summer Olympics?",
    //   ["Brazil", "Japan", "China", "UK"],
    //   "Japan",
    //   2
    // ),

    // new Question(
    //   "What is the value of π (pi) approximately?",
    //   ["2.14", "3.14", "4.14", "5.14"],
    //   "3.14",
    //   1
    // ),

    // new Question(
    //   "Who painted the Mona Lisa?",
    //   [
    //     "Vincent van Gogh",
    //     "Leonardo da Vinci",
    //     "Pablo Picasso",
    //     "Claude Monet",
    //   ],
    //   "Leonardo da Vinci",
    //   2
    // ),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();

  /************  TIMER  ************/

  let timer;

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const currentQuestion = quiz.getQuestion();
    // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
    currentQuestion.shuffleChoices();

    // 1. Show the question
    questionContainer.innerText = currentQuestion.text;

    // 2. Update the green progress bar
    const progress = (quiz.currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // 3. Update the question count text
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${
      questions.length
    }`;

    // 4. Create and display new radio input element with a label for each choice.
    const choices = currentQuestion.choices;
    choices.forEach((choise, i) => {
      const newLi = document.createElement("li");
      const newRadio = document.createElement("input");
      const newLabel = document.createElement("label");

      newRadio.type = "radio";
      newRadio.name = "answer";
      newRadio.value = choise;
      newRadio.id = `a${i + 1}`;
      newLabel.innerText = choise;
      newLabel.htmlFor = `a${i + 1}`;

      newLi.appendChild(newRadio);
      newLi.appendChild(newLabel);
      choiceContainer.appendChild(newLi);
    });
  }

  function nextButtonHandler(question) {
    let selectedAnswer;
    currentChoices = document.querySelectorAll("#choices li input");

    currentChoices.forEach((e) => {
      if (e.checked) {
        if (quiz.checkAnswer(e.value)) {
          quiz.moveToNextQuestion();
          showQuestion();
        }
      }
    });
  }

  function showResults() {
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder
  }

  function startOver() {
    quizView.style.display = "flex";
    endView.style.display = "none";
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    showQuestion();
  }
  restartButton.addEventListener("click", startOver);
});
