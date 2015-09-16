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
      question: "What does it mean to be an accredited investor?",
      answers: [ { incorrect : "Someone with a credit rating at or above 750." },
                 { incorrect : "Someone who is certified by the SEC to participate in a securities exchange."},
                 { correct   : "Someone who makes $200,000+ annually or has $1 million+ in net assets."},
                 { incorrect : "All of above"} ]
    }
  ];

  this.userResults = {
    score: 0
  };

  this.renderQuestions = function() {
    var questions    = this.quizQuestions,
        numOfQuests  = questions.length;

    for (var i = 0; i < numOfQuests; i++) {
        var $questCont   = $("<div id='question-" + (i + 1) + "' class='quest-container'>"),
            $quest       = $("<h2>"),
            $answersList = $("<ul class='answer-list'>"),
            answersArray = questions[i].answers;

        $quest.text(questions[i].question);
        $questCont.append($quest);
        $questCont.append($answersList);
        $('.main-container').append($questCont);

        for (var j = 0; j < answersArray.length; j++) {
            var $answer = $("<li>"),
                $input  = $("<input class='answer' name='question-" + (i + 1) + "' type='radio' id='q" + (i + 1) + "a" + (j + 1) + "'>"),
                $label  = $("<label for='q" + (i + 1) + "a" + (j + 1) + "'>");

            if (answersArray[j].incorrect) {
              $label.text(answersArray[j].incorrect);
              $input.attr("value", false);
            } else {
              $label.text(answersArray[j].correct);
              $input.attr("value", true);
            }

            $answer.append($input);
            $answer.append($label);
            $answersList.append($answer);

            $compile($input)($scope);
        };
    };

  };

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
    // quiz is finished
    this.renderResults(true);
  };

  this.renderResults = function(quizStatus) {

    // test if quiz is finished
    if (quizStatus === null) {
      console.log("quiz not completed!");
    } else {
      console.log("completed...rendering results...");
    }
  };

  this.renderQuestions();

}]);

// <div class="quest-container">
//   <h2 ng-bind=""></h2>
//   <ul class="answer-list">
//
//   </ul>
// </div>
