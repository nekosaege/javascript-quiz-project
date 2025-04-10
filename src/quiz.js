class Quiz {
    constructor(questions, timeLimit, timeRemaining) {
        this.questions = questions;
        this.timeLimit = timeLimit;
        this.timeRemaining = timeRemaining;
        this.correctAnswers = 0;
        this.currentQuestionIndex = 0;
    }

    getQuestion() {
        return this.questions[this.currentQuestionIndex]
    }

    moveToNextQuestion() {
        return this.currentQuestionIndex++;
    }git checkout

    shuffleQuestions() {
        for (let i = this.questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.questions[i], this.questions[j]] = [this.questions[j], this.questions[i]];
        }
        return this.questions;

  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
    return this.questions;
  }

    checkAnswer(answer) {
        if (this.answer !== 0) {
            this.correctAnswers++;
    }
  }

    hasEnded() {
        if (this.currentQuestionIndex < this.questions.length) {
            return false;
        }
        if (this.currentQuestionIndex == this.questions.length) {
            return true;
        }
    }
    if (this.currentQuestionIndex == this.questions.length) {
      return true;
    }
  }

  filterQuestionsByDifficulty(difficulty) {
    if (typeof difficulty === "number" && difficulty >= 1 && difficulty <= 3) {
      this.questions = this.questions.filter(
        (question) => question.difficulty === difficulty
      );
    }
  }

  averageDifficulty() {
    const totalDifficulty = this.questions.reduce(
      (total, question) => total + question.difficulty,
      0
    );
    return totalDifficulty / this.questions.length;
  }
}
