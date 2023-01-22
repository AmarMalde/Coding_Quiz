
var clearButton = document.getElementById("clear");

clearButton.addEventListener('click', function () {
    // window.localStorage.clear();

});

var highscoreList = document.getElementById('highscores');

var highScores = JSON.parse(localStorage.getItem('highScores')) || [];

console.log(highScores)

highScores.forEach(function (obj) {
    console.log(`<li class="highscoreItem">${obj.initials} - ${obj.score}</li>`);
    
    var newListItem = document.createElement("li");

    highscoreList.innerHTML += `<li>${obj.initials} - ${obj.score}</li>`

});

