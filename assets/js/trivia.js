// $(document).ready(function() {

// creat variable for list of questions, possible answers in an array

var triviaQuestions = [{
    question: "Why did Freyda Felcher dump Harry?",
    answerList: ["Cheating on her", "did not listen to her", "stole money from her", "he broke up with her"],
    answer: 1
}, {
    question: "What does it say on Sea bass's cap?",
    answerList: ["Yankees", "Wine'em Dine'em 69'em", "BADASS", "Colorado"],
    answer: 1
}, {
    question: "What is the name of Lloyd's crush?",
    answerList: ["Polly Craig", "Freta Felcher", "Mary Swanson", "Beth Jordan"],
    answer: 2
}, {
    question: "What is Lloyd's last name?",
    answerList: ["Maison", "Edwards", "Hunter", "Christmas"],
    answer: 3
}, {
    question: "What did Lloyd pretend to sell to the blind kid?",
    answerList: ["Baseball Cards and sack of marbles", "worm farm", "A parakeet", "money"],
    answer: 0
}, {
    question: "What did Lloyd say when Nicolas came to his hotel room?",
    answerList: ["I have your money", "We have plenty of towels, thanks", "Please don't shoot me", "I believe you are looking for a briefcase"],
    answer: 1
}, {
    question: "What did Lloyd find out at the bar in Aspen?",
    answerList: ["Mary is having a party", "Man Landed on the moon", "A solar ecplise is coming", "President Kennedy was shot"],
    answer: 1
}, {
    question: "When Lloyd made the wrong turn, where did he end up going instead of Aspen?",
    answerList: ["Utah", "Arizona", "Nebraska", "Texas"],
    answer: 2
}, {
    question: "When Lloyd & Harry were searching for Mary, what incorrect lastname did they lookup?",
    answerList: ["Slimmin", "Simpson", "Swanson", "Sampsonite"],
    answer: 3
}, {
    question: "When year did the movie Dumb and Dumber come out?",
    answerList: ["1994", "1997", "1998", "2001"],
    answer: 0

}];

// declare variables to used for the game

var liveQuestion;
var answerCorrect;
var answerWrong;
var notAnswered;
var seconds;
var timer;
var isAnswered;
var userAnswer;

// variable created to provide messages for game play

var responses = {
    correct: "Right Answer",
    wrong: "Wrong Answer",
    timeExpired: "Time is up!",
    gameCompleted: "Final Score: "
};




// start button to begin game, button will hide once pressed


$("#startBtn").on("click", function() {
    $(this).hide();
    startGame();
});
// once game ends this button will give option to start a new game

//$("#playAgain").on("click", function() {
//    $(this).hide();
//    startGame();
//});


// create function for startGame
function startGame() {
    $("#gameOverMessage").empty();
    $("#answerCorrect").empty(); //empties the div for correct answers
    $("#answerWrong").empty(); //empties the div wrong answers
    $("#notAnswered").empty(); //empties the div for questions not answered
    liveQuestion = 0; //sets the questions to start at the beginning
    answerCorrect = 0; //sets the amount of correct answers to zero
    answerWrong = 0; //sets the amount of wrong answers to zero
    notAnswered = 0; //sets the amount of not answered questions to zero
    askQuestions(); //calls the askQuestions function to start

};

//create the askQuestions function to go through the questions and put them on the page

function askQuestions() {
    $("#responses").empty(); //empties the responses div
    $("#actualAnswer").empty(); //empties the actualAnswer div
    isAnswered = true; //sets variable isAnswered to true
    
    
    $("#liveQuestion").html("This is Question #" + (liveQuestion + 1) + " of " + triviaQuestions.length); //adds text to show what # question you are on
    $(".question").html("<h3>" + triviaQuestions[liveQuestion].question + "<h3>");
    for (var i = 0; i < 4; i++) { //?  I believe this is making sure there are only 4 choices for answers??
        var choices = $("<div>");
       choices.text(triviaQuestions[liveQuestion].answerList[i]);
        choices.attr({"data-index": i});
        choices.addClass("thisChoice");
        $(".answerList").append(choices);
   $(".thisChoice").on("click");
// 
            userAnswer = $(this).data("index");
            isAnswered = false;
            answerPage();
    };
    

//    function countDown(){
//        seconds = 90;
//        $("?????").html("<h3>Time Left " + seconds + "<h3>");
//        seconds --;
    

    function answerPage() {
        $("#liveQuestion").empty();
        $(".thisChoice").empty(); //Clears question page
        $(".question").empty(); //clears question div


        var answerText = triviaQuestions[liveQuestion].answerList[triviaQuestions[liveQuestion].answer]; //variable holding question/answers and user answer
        var answerCorrectIndex = triviaQuestions[liveQuestion].answer; //variable 

    if ((userAnswer === answerCorrectIndex) && (isAnswered === true)) {
        answerCorrect++;
        $("#messenger").html(responses.correct);
//        liveQuestion++; //take out if not working correctly
    } else if ((userAnswer !== answerCorrectIndex) && (isAnswered === true)) {
        answerWrong++;
        $("#messenger").html(responses.wrong);
//        liveQuestion++; //take out if not working correctly
    } else {
        notAnswered++;
        $("#messenger").html(responses.timeExpired);
        $("#actualAnswer").html("The correct answer is: " + answerText);
        isAnswered = true;
//        liveQuestion++; //take out if not working correctly
    }

//     if (liveQuestion === (triviaQuestions.length - 1)) {  //make live if site is not working correctly
//     	setTimeout(keepScore, 1500)
//     }
//     else {
//     	liveQuestion ++;
//     	setTimeout(keepScore, 1500);
//     }


function keepScore() {
    $("#timeLeft").empty();
    $("#messenger").empty();
    $("#actualAnswer").empty();

    $("#gameOverMessage").html(responses.gameCompleted);
    $("#answerCorrect").html("Correct Answers: " + answerCorrect);
    $("#answerWrong").html("Wrong Answers: " + answerWrong);
    $("#notAnswered").html("Wrong Answers: " + notAnswered);
    $("playAgain").addId("reset");
    $("playAgain").show();
    $("playAgain").html("Play Again?");
    
    
}


}







