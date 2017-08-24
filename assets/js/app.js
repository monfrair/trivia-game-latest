//variable setting up the questions for the game

var triviaQuestions = [{
	question: "Why did Freyda Felcher dump Harry?",
	answerList: ["Harry was cheating on her", "Harry did not listen to her", "Harry stole money from her", "Harry broke up with her"],
	answer: 1
},{
	question: "What does it say on Sea bass's baseball cap?",
	answerList: ["Yankees", "Wine'em Dine'em 69'em", "BADASS", "Colorado"],
	answer: 1
},{
	question: "What is the name of Lloyd's main crush in the movie?",
	answerList: ["Polly Craig", "Freta Felcher", "Mary Swanson", "Beth Jordan"],
	answer: 2
},{
	question: "What is Lloyd's last name?",
	answerList: ["Maison", "Edwards", "Hunter", "Christmas"],
	answer: 3
},{
	question: "What did Lloyd pretend to sell to the blind kid when collecting money for their road trip?",
	answerList: ["Baseball Cards and sack of marbles", "worm farm", "A parakeet", "money"],
	answer: 0
},{
	question: "What did Lloyd say when Nicolas (the bad guy) came to his hotel room?",
	answerList: ["I have your money", "We have plenty of towels, thanks", "Please don't shoot me", "I believe you are looking for a briefcase"],
	answer: 1
},{
	question: "What did Lloyd find out while waiting at the bar in Aspen?",
	answerList: ["Mary is having a party", "Man Landed on the moon", "A solar ecplise is coming", "President Kennedy was shot"],
	answer: 1
},{
	question: "When Lloyd made the wrong turn on the way to CO, where did he end up going instead of Aspen?",
	answerList: ["Utah", "Arizona", "Nebraska", "Texas"],
	answer: 2
},{
	question: "When Lloyd & Harry were searching for Mary, what incorrect lastname did they lookup in the phonebook?",
	answerList: ["Slimmin", "Simpson", "Swanson", "Sampsonite"],
	answer: 3
},{
	question: "What year did the movie Dumb and Dumber come out?",
	answerList: ["1994", "1997", "1998", "2001"],
	answer: 0

}];


var currentQuestion; 
var rightAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var timer; 
var answered; 
var userSelect;

var messages = {
	correct: "Correct!",
	incorrect: "Wrong",
	endTime: "Time is up",
	finished: "Final Score: "
}

//start button to begin the game and call the newGame function
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$("#playAgain").on('click', function(){
	$(this).hide();
	newGame();
});



function newGame(){
	$("#gameOverMessage").empty();
	$("#correctAnswer").empty();
	$("#incorrectAnswer").empty();
	$("#unanswered").empty();
	currentQuestion = 0;
	rightAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$("#messages").empty();
	$("#correctAnswer").empty();
	
	answered = true;
	
	//sets up new questions & answerList
	$("#currentQuestion").html("Question #" + (currentQuestion + 1) + " of " + triviaQuestions.length);
    
    
	$(".question").html('<h3>' + triviaQuestions[currentQuestion].question + '</h3>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 10;
	$("#timeLeft").html("<h3>Time Remaining: " + seconds + "</h3>");
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$("#timeleft").html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$(".thisChoice").empty(); //Clears question page
	$(".question").empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect === rightAnswerIndex) && (answered === true)){
		rightAnswer++;
		$("#messages").html(messages.correct);
    }
        
        
	 else if((userSelect !== rightAnswerIndex) && (answered === true)){
		incorrectAnswer++;
		$("#messages").html(messages.incorrect);
		$("#correctAnswer").html("The correct answer is: " + rightAnswerText);
	} 
        else {
		unanswered++;
		$("#messages").html(messages.endTime);
		$("#correctAnswer").html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion === (triviaQuestions.length-1)){
		setTimeout(scoreboard, 2000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 2000);
	}	
}




function scoreboard() {
	$("#timeleft").empty();
	$("#messages").empty();
	$("#correctAnswer").empty();

	$("#gameOverMessage").html(messages.finished);
	$("#correctAnswer").html("Correct Answers: " + rightAnswer);
	$("#incorrectAnswer").html("Incorrect Answers: " + incorrectAnswer);
	$("#unanswered").html("Unanswered: " + unanswered);
	$("playAgain").addClass("reset");
	
    
    $("startBtn").show();
	$("startBtn").html("Play Again?");
}