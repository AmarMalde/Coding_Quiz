
//lines 4 to 20 assign vales to various parts of the HTML using thier ID. This is make calling these easier throughout the code

//inintialing variables that aid in calling various elements in HTML 

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

//initialising variables for later use. Globals scope as they are used in different functions
var startTime = 90;
var score = 0;
var questionIndex = 0;

//event listener to execute function when the user clicks start quiz 
startButton.addEventListener("click", function () {

    //sets variables back to base values. Sets everytime user clicks on start quiz incase quiz is ran multiple times
    startTime = 90;
    score = 0;

    // executes function every 100ms. This is primarily to update the time remaining using the start time variable
    var quizInterval = setInterval(function () {

        //below if statement will execute if user is out of time

        if (startTime < .01) {

            //to trigger the end of the quiz

            endScreen();

            //to stop the interview on line 37 from running

            clearInterval(quizInterval);
        }

        //below wil only execute if the quiz is on it's first run through
        //its within the interval as that results in a quicker response.
        if (startTime == 90) {
            //hides all screens (divs)
            hideAllScreens();

            if (score < 0) { score = 0 }

            //displays the question screen by removing the class hide and adding start
            questionsScreen.classList.remove("hide");
            questionsScreen.classList.add("start");

            // update the screen with the current questions and answers
            updateQuestionScreen();
        }

        //below is to progess the interval to the next 1/10th of a second

        timerValue.textContent = ~~startTime;
        startTime -= 0.1

    }, 100);

});

//function endScreen should execute when the user is out of time or has answered all questions correctly
function endScreen() {

    //hides all screens (divs)
    hideAllScreens()

    //display the end screen by removing the class hide and adding start
    endScreenClass.classList.remove("hide");
    endScreenClass.classList.add("start");

    //update the finace score div in HTML with the score value
    finalScoreValue.textContent = ~~score;
}

//below function will hide majority of divs from the HTML
//running this then shownig the correct screens ensures only the correct screen is showing at any one time
function hideAllScreens() {

    questionsScreen.classList.remove("start");
    questionsScreen.classList.add("hide");

    startScreenClass.classList.remove("start");
    startScreenClass.classList.add("hide");

    endScreenClass.classList.remove("start");
    endScreenClass.classList.add("hide");

}

//below event listender will onyl execute when the user clisk on the button to submit their high scores
submitButton.addEventListener("click", function () {

    //download current highscores from local storage
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

    //get initals the player has entered in
    var playerInitials = document.getElementById('initials').value;

    //store player initals and score as a key value pair. This is the ready the data for the local storage
    var scoreAndInitials = {
        score: score,
        initials: playerInitials.toUpperCase()
    };

    //below line will add the player's score and initals to the array downloaded from the local storage
    highScores.push(scoreAndInitials);

    //below code will order the array in order of highest to lowest score
    highScores.sort((a, b) => b.score - a.score)

    //spice the array to only include the 5 highest scores
    highScores.splice(5);

    //add the updated array of scores and initals to storage
    localStorage.setItem('highScores', JSON.stringify(highScores));

    //after submitting highscores, the user can see the currently saved highscores
    windows.location = "./highscores.html"

})

//below event listener and code will change the html document when the user wants to see the current highscores
highscoresButton.addEventListener("click", function () {

    windows.location = "./highscores.html"

})

//below code checks to see if user's chosen answer is correct or not
answerButtonsDiv.addEventListener("click", function (event) {

    //if user has clicked on a answer button
    if (event.target.matches(".answerButton")) {

        //if answer is incorrect, deduct 10 seconds from time remaining
        if (event.target.getAttribute('id') != questionsObject[questionIndex].correctAnswer) {
            startTime -= 10;
        }

        // if question isn't the last question, go to next question
        if (questionIndex < questionsObject.length - 1) {
            questionIndex++;
            updateQuestionScreen();

        // if  last question, add score to total
        } else {
            if (score < 0) { score = 0 };

            score = ~~startTime;
            startTime = 0;
        }
    }
});

//below function displays current question to screen
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

