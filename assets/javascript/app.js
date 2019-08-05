//global variables
var correctAnswers = 0, wrongAnswers = 0, timeRemaining, questions, questionIndex = 0, timerID;
//my question "database"
var questions = [
    {
        text: "What is a group of cats called?",
        answers: [
            "A clowder",
            "A gang",
            "A murder",
            "A herd"
        ]
    },
    {
        text: "Cats with extra toes are called?",
        answers: [
            "polydactyl",
            "Calico",
            "phalanges",
            "supernumerary"
        ]
    },
    {
        text: "How many hours a day does a cat usually sleep for?",
        answers: [
            "12 to 16",
            "14 to 16",
            "16 to 20",
            "10 to 12"
        ]
    },
    {
        text: "How many bones do cats have?",
        answers: [
            "230",
            "206",
            "196",
            "250"
        ]
    },
    {
        text: "What is the normal body temperature of a cat?",
        answers: [
            "102 degrees Fahrenheit",
            "98.6 degrees Fhrenheit",
            "104 degrees Fahrenheit",
            "99 degrees Fahrenheit"
        ]
    }

];
//populate the next question, and start countdown timer
function nextQuestion() {
    // Get reference to the next question object.
    var question = questions[questionIndex];
    $("#question").text(question.text);
    var answersArray = [];
    question.answers.forEach(function (answer, answerIndex) {

        // Create HTML radio button elements for every answer in our array.
        // <input type="radio" name="answer" onclick="checkAnswer(0)"> A clowder<br>
        // <input type="radio" name="answer" onclick="checkAnswer(1)"> A gang<br>
        // <input type="radio" name="answer" onclick="checkAnswer(2)"> A murder<br>
        // <input type="radio" name="answer" onclick="checkAnswer(3)"> A herd<br>
        var answerButton = $('<input type="radio" name="answer" onclick="checkAnswer(' + answerIndex + ')">' + answer + '<br>');
        answersArray.push(answerButton);
    });

    // Shuffle our array of buttons so the first one isn't always the right one
    answersArray = shuffle(answersArray);
    $("#choices").empty();
    answersArray.forEach(function (answerButton) {
        $("#choices").append(answerButton);
    });

    //start a 15 second timer for each question. When timer runs out, it counts it as a wrong answer
    var timer = duration = 15, seconds;
    $("#timer").html("<br>");
    timerID = setInterval(function () {
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        $("#timer").text("Time remaining: " + seconds);

        if (--timer < 0) {
            $("#result").css('color', '#f00');
            $("#result").text("Time ran out! The right answer was: " + questions[questionIndex].answers[0]);
            wrongAnswers++;
            showResult();
        }
    }, 1000);
}

//creates a "start button" to begin game
//also starts the game over when they are finished
$("#start").on("click", function () {
    $("#start").hide();
    correctAnswers = 0;
    wrongAnswers = 0;
    questionIndex = 0;
    $("#questionBox").show();
    $("#result").hide();
    nextQuestion();
});

//function that it compares their answer to the right answer, and tells them if they got it right or wrong
//if they get it wrong, it tells them the correct answer
function checkAnswer(answerIndex) {
    if (answerIndex === 0) {
        $("#result").css('color', '#0f0');
        $("#result").text("Right answer! Good job!");
        correctAnswers++;
    } else {
        $("#result").css('color', '#f00');
        $("#result").text("Wrong answer. The right answer was: " + questions[questionIndex].answers[0]);
        wrongAnswers++;
    }
    showResult();

}
//function that shows them their result for 3 seconds, then starts the next question
//shows them their results of wrong or right answers at the end
function showResult() {
    $("#questionBox").hide();
    $("#result").show();
    clearInterval(timerID);
    $("#timer").empty();
    setTimeout(function () {
        $("#questionBox").show();
        $("#result").hide();
        questionIndex++;
        if (questionIndex === questions.length) {
            $("#questionBox").hide();
            $("#result").show();
            $("#restult").css('color', '#000');
            $("#result").text("Good job! Here are your results: " + correctAnswers + " Correct and " + wrongAnswers + " Wrong")
            $("#start").text("Start Over");
            $("#start").show();
        } else {
            nextQuestion();
        }
    }, 3000);

}
//googled this and found this code on stackoverflow
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}