var startButton = document.getElementById("start");
var startScreenClass = document.getElementById("start-screen");
var endScreenClass = document.getElementById("end-screen");
var questionsScreen = document.getElementById("questions");
var questionOnScreen = document.getElementById("question-title");
var timerValue = document.getElementById("time");
var finalScoreValue = document.getElementById("final-score");

var submitButton = document.getElementById("submit");

var highscoresButton = document.getElementById("highscores");

var answerButtonsDiv = document.getElementById("choicesButtons");
var answerButton1 = document.getElementById("option1");
var answerButton2 = document.getElementById("option2");
var answerButton3 = document.getElementById("option3");
var answerButton4 = document.getElementById("option4");

var startTime = 90;
var score = 0;

var questionIndex = 0;

startButton.addEventListener("click", function () {

    startTime = 90;
    score = 0;

    var quizInterval = setInterval(function () {

        if (startTime < 1) {

            endScreen();

            clearInterval(quizInterval);
        }

        if (startTime == 90) {
            //hides all screens (divs)
            hideAllScreens();

            if (score<0) {score = 0}

            //displays the question screen by removing the class hide and adding start
            questionsScreen.classList.remove("hide");
            questionsScreen.classList.add("start");

            // update the screen with the current questions and answers
            updateQuestionScreen();
        }

        timerValue.textContent = ~~startTime;
        startTime -= 0.1

    }, 100);

});

function endScreen() {

    //hides all screens (divs)
    hideAllScreens()

    //display the end screen by removing the class hide and adding start
    endScreenClass.classList.remove("hide");
    endScreenClass.classList.add("start");

    finalScoreValue.textContent = ~~score;
}

function hideAllScreens() {

    questionsScreen.classList.remove("start");
    questionsScreen.classList.add("hide");

    startScreenClass.classList.remove("start");
    startScreenClass.classList.add("hide");

    endScreenClass.classList.remove("start");
    endScreenClass.classList.add("hide");

}

submitButton.addEventListener("click", function() {

    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    var playerInitials = document.getElementById('initials').value;
    
    var scoreAndInitials = {
        score: score,
        initials: playerInitials.toUpperCase()
    };

    highScores.push(scoreAndInitials);

    highScores.sort((a,b) => b.score - a.score)

    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));

    console.log(highScores)
})

highscoresButton.addEventListener("click", function() {

    windows.location = "./highscores.html"


})


answerButtonsDiv.addEventListener("click", function (event) {

    if (event.target.matches(".answerButton")) {

        if (event.target.getAttribute('id') != questionsObject[questionIndex].correctAnswer) {
            startTime -= 10;
        }

        if (questionIndex < questionsObject.length - 1) {
            questionIndex++;
            updateQuestionScreen();

        } else {
            if (score<0) {score = 0};

            score = ~~startTime;
            startTime = 0;
        }
    }

});

function updateQuestionScreen() {

    //displaying the question on the screen

    questionOnScreen.textContent = returnQuestions();

    //this will store the answers as a string in an array
    var answers = returnAnswers();

    //displaying the answers

    // AnswerButton1.textContent = answers[0]
    answerButton1.textContent = answers[0];
    answerButton2.textContent = answers[1];
    answerButton3.textContent = answers[2];
    answerButton4.textContent = answers[3];

}

function returnQuestions() {
    //return question using question index
    return (questionsObject[questionIndex].question);
}

function returnAnswers() {
    //return answers in an array using question index using a for loop

    var answerArray = [
        questionsObject[questionIndex].option1,
        questionsObject[questionIndex].option2,
        questionsObject[questionIndex].option3,
        questionsObject[questionIndex].option4
    ]
    return (answerArray)
}

