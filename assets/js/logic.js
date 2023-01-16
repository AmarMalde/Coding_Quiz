var startButton = document.getElementById("start");
var startScreenClass = document.getElementById("start-screen");
var questionsScreen = document.getElementById("questions");
var questionOnScreen = document.getElementById("question-title");
var timerValue = document.getElementById("time");

var answerButtonsDiv = document.getElementById("choicesButtons");

var answerButton1 = document.getElementById("option1");
var answerButton2 = document.getElementById("option2");
var answerButton3 = document.getElementById("option3");
var answerButton4 = document.getElementById("option4");


var startTime = 90

var questionIndex = 0;

startButton.addEventListener("click", function () {

    setInterval(function () {

        if (startTime == 90) {
            //hides the start screen by removing the class start and adding hide
            startScreenClass.classList.remove("start");
            startScreenClass.classList.add("hide");

            //displays the question screen by removing the class hide and adding start
            questionsScreen.classList.remove("hide");
            questionsScreen.classList.add("start");

            // update the screen with the current questions and answers
            updateQuestionScreen();
        }

        timerValue.textContent = startTime;
        startTime--;

        answerButtonsDiv.addEventListener("click", function (event) {
            
            if (event.target.matches(".answerButton")) {

                if (event.target.getAttribute('id') != questionsObject[questionIndex].correctAnswer) {
                    startTime -= 10;
                }
                console.log("clicked")
                questionIndex++;
                updateQuestionScreen();

            }
        });

        //add 1 to question index (if quesion index = questionsObject.length then show final screen)
        //rerun updateQuestionScreen

        

    }, 1000);


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

