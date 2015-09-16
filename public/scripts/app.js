var app = angular.module('quireQuiz', []);

app.controller('quireQuizController', ['$scope', '$compile', function($scope, $compile) {

  this.quizQuestions = [
    {
      question: "What does it mean to be an accredited investor?",
      answers: [ { incorrect : "Someone with a credit rating at or above 750." },
                 { incorrect : "Someone who is certified by the SEC to participate in a securities exchange."},
                 { correct   : "Someone who makes $200,000+ annually or has $1 million+ in net assets."},
                 { incorrect : "All of above"} ]
    },
    {
      question: "This is another dummy question. Which is the correct answer?",
      answers: [ { incorrect : "The obviously incorrect one here." },
                 { correct   : "Grits and gravy."},
                 { incorrect : "The other incorrect but less obvious answer."},
                 { incorrect : "None of these are correct."} ]
    },
    {
      question: "What is this?",
      answers: [ { correct   : "This is a quiz." },
                 { incorrect : "This is not a quiz."},
                 { incorrect : "This is what?"},
                 { incorrect : "60% of the time, it works, everytime."} ]
    }
  ];

  this.userResults = {
    score: 0,
    incorrect: [],
    correct: []
  };

  this.message = "";

  this.renderQuestions = function() {
    var questions    = this.quizQuestions,
        numOfQuests  = questions.length;

    for (var i = 0; i < numOfQuests; i++) {
        var $questCont   = $("<div id='question-" + (i + 1) + "' class='quest-container'>"),
            $quest       = $("<h2>"),
            $answersList = $("<ul class='answer-list'>"),
            answersArray = questions[i].answers;
            $message     = $("</br><span class='answer-message" + i + "' ng-bind='quiz.answerMessage" + i + "'>");

        $quest.text(questions[i].question);
        $questCont.append($quest);
        $questCont.append($answersList);
        $('.quiz-container').append($questCont);

        for (var j = 0; j < answersArray.length; j++) {
            var $answer  = $("<li>"),
                $input   = $("<input class='answer' name='question-" + (i + 1) + "' type='radio' id='q" + (i + 1) + "a" + (j + 1) + "'>"),
                $label   = $("<label for='q" + (i + 1) + "a" + (j + 1) + "'>"),
                $span1   = $("<span class='radioButton'>"),
                $span2   = $("<span>");

            $label.append($span1);
            if (answersArray[j].incorrect) {
              $span2.text(answersArray[j].incorrect);
              $input.attr("value", false);
              $input.attr("ng-click", "quiz.testIfCorrect('false', " + i + ")");
            } else {
              $span2.text(answersArray[j].correct);
              $input.attr("value", true);
              $input.attr("ng-click", "quiz.testIfCorrect('true', " + i + ")");
            }

            $label.append($span2);
            $answer.append($input);
            $answer.append($label);
            $answersList.append($answer);

            // need $compile if you want to dynamically create elems with ng- functions
            $compile($input)($scope);
        };
        $answer.append($message);
        $compile($message)($scope);
    };

  };

  // this is a brute force/hard coded way of doing it....need to refactor this function.
  this.testIfCorrect = function(correct, num) {
    if (correct === 'true' && num === 0) {
      this.answerMessage0 = "Correct!";
      this.renderColors('#4D9F30', num)
    } else if (correct === 'false' && num === 0){
      this.answerMessage0 = "Incorrect! Try again!";
      this.renderColors('red', num);
    } else if (correct === 'true' && num === 1) {
      this.answerMessage1 = "Correct!";
      this.renderColors('#4D9F30', num)
    } else if (correct === 'false' && num === 1){
      this.answerMessage1 = "Incorrect! Try again!";
      this.renderColors('red', num);
    } else if (correct === 'true' && num === 2){
      this.answerMessage2 = "Correct!";
      this.renderColors('#4D9F30', num)
    } else if (correct === 'false' && num === 2){
      this.answerMessage2 = "Incorrect! Try again!";
      this.renderColors('red', num);
    }
  }

  this.renderColors = function(color, num) {
    $('.answer-message' + num).css({
      'color': color
    });
  }

  this.submitQuiz = function() {
    console.log("Quiz submitted...");

    var $submittedAns = $("input[type=radio]:checked"),
        numOfQuests   = this.quizQuestions.length;

    if ($submittedAns.length === numOfQuests) {
      this.reviewQuiz($submittedAns);
    } else if ($submittedAns.length < numOfQuests){
      // if quiz not finished, render results with error
      this.renderResults(null);
    }
  };

  this.reviewQuiz = function(answers) {
    console.log(answers[0]);
    var len = answers.length;

    for (var i = 0; i < len; i++) {
      // find if value of input is true
      if (answers[i].value === "true") {
        console.log("correct answer");
        this.userResults.score++;
        console.log(this.userResults.score);
      } else {
        console.log("wrong answer");
      }
    }
    console.log(this.userResults.incorrect);
    // quiz is finished
    this.renderResults(true);
  };

  this.renderResults = function(quizStatus) {

    // test if quiz is finished
    if (quizStatus === null) {
      console.log("quiz not completed!");
      this.message = "You have not completed the quiz! Please go back to complete it before submitting."
    } else {
      console.log("completed...rendering results...");
      this.message = this.userResults.score + " out of " + this.quizQuestions.length + " correct!"
    }
  };

  this.renderQuestions();

}]);

$(document).ready(function(){
  $('#scroll-down i').click(function() {
      $('html, body').animate({
          scrollTop: $(".quiz-container").offset().top
      }, 750);
      return false;
  });

  var $hamburger = $("#hamburger-button")

  function animateHamburger() {
    $hamburger.toggleClass('open');
  };

  function slideMenu() {
    $("header>nav>ul").toggleClass('open');
  };

  $hamburger.on('click', function(){
    slideMenu();
    animateHamburger();
  });

});
