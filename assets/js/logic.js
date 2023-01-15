var startButton = document.getElementById("start");
var startScreenClass = document.getElementById("start-screen");
var questionsScreen = document.getElementById("questions");
var questionOnScreen = document.getElementById("question-title");

var AnswerButton1 = document.getElementById("option1");
var AnswerButton2 = document.getElementById("option2");
var AnswerButton3 = document.getElementById("option3");
var AnswerButton4 = document.getElementById("option4");




var questionIndex = 0;

startButton.addEventListener("click", function() {


    //hides the start screen by removing the class start and adding hide
    startScreenClass.classList.remove("start");
    startScreenClass.classList.add("hide");

    //displays the question screen by removing the class hide and adding start
    questionsScreen.classList.remove("hide");
    questionsScreen.classList.add("start");
    
    // this will store the current question as a string

    var question = returnQuestions();

    //displaying the question on the screen

    questionOnScreen.textContent = question

    //this will store the answers as a string in an array
    var answers = returnAnswers();

    //displaying the answers

    AnswerButton1.textContent = answers[0]
    AnswerButton2.textContent = answers[1]
    AnswerButton3.textContent = answers[2]
    AnswerButton4.textContent = answers[3]

    //after answer is given
    questionIndex ++;

});

function returnQuestions() {
    //return question using question index
    return(questionsObject[questionIndex].question);
}

function returnAnswers() {
    //return answers in an array using question index using a for loop

    var answerArray = [
        questionsObject[questionIndex].option1,
        questionsObject[questionIndex].option2,
        questionsObject[questionIndex].option3,
        questionsObject[questionIndex].option4
    ]
    return(answerArray)
}

