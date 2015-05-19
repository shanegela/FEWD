
var gameMega = document.querySelector("#gameMega");
var gameSuper = document.querySelector("#gameSuper");
var gamePower = document.querySelector("#gamePower");
var megaBall = document.querySelector("#megaBall");
var megaNum = document.querySelector("#megaBall p");
var jackpotAmount = $(".jackpot p");
var ball1Num = $("#ball1 p");
var ball2Num = $("#ball2 p");
var ball3Num = $("#ball3 p");
var ball4Num = $("#ball4 p");
var ball5Num = $("#ball5 p");
var pBallMax = 59;
var pMegaMax = 35;
var mBallMax = 75;
var mMegaMax = 15;
var sBallMax = 47;
var sMegaMax = 27;
var Game = 1; // 1: Powerball, 2: Mega, 3: Super
var qpForm = $("#qpForm");


function powerClicked (e) {
  megaBall.style.setProperty("background","#CA1F26");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  $.get("http://calservice.calottery.com/api/drawgames/12",updateLotto);
  Game = 1;
}

function megaClicked (e) {
  megaBall.style.setProperty("background","#1A4199");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  $.get("http://calservice.calottery.com/api/drawgames/15",updateLotto);
  Game = 2;
}

function superClicked (e) {
  megaBall.style.setProperty("background","#F48A1E");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  $.get("http://calservice.calottery.com/api/drawgames/8",updateLotto);
  Game = 3;
}

function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

gameMega.addEventListener("click",megaClicked);
gameSuper.addEventListener("click",superClicked);
gamePower.addEventListener("click",powerClicked);

function get(url, success) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("readystatechange", function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      success(JSON.parse(xhr.response));
    }
  });
  xhr.open("GET", url,true);
  xhr.send();
}

function updateLotto(results) {
  var winningNumbers = results.games[0].draws[0].winningNumbers;
  var gamePotAmount = results.games[0].nextJackpot.jackpotAmount;
  var winningBalls = [];
  winningBalls.push(parseInt(winningNumbers[0]));
  winningBalls.push(parseInt(winningNumbers[1]));
  winningBalls.push(parseInt(winningNumbers[2]));
  winningBalls.push(parseInt(winningNumbers[3]));
  winningBalls.push(parseInt(winningNumbers[4]));
  winningBalls.sort(function(a, b){return a-b});

  ball1Num.text(winningBalls[0]);
  ball2Num.text(winningBalls[1]);
  ball3Num.text(winningBalls[2]);
  ball4Num.text(winningBalls[3]);
  ball5Num.text(winningBalls[4]);
  megaNum.textContent=winningNumbers[5];
  jackpotAmount.text(formatNumber(gamePotAmount));
}

function validateQPNumbersAreIntegers(QPNumbers) {
  var status = 0;
  var notInt = '';
  var ballNumber = 0;

  for (var i = 0; i < QPNumbers.length; i++) {
    ballNumber = QPNumbers[i].qpValue;
    if (isNaN(parseInt(ballNumber))) {
      if (notInt == '') {
        notInt = ballNumber;
      } else {
        notInt = notInt + ', ' + ballNumber;
      }
    }
  }

  if  (notInt != '')  {
    var alertMessage = 'Stop messing around. This is your financial future.';
    if (notInt != '') {
      alertMessage = alertMessage + "The following quick pick ball(s) are not integers: " + notInt;
    }
    alert(alertMessage);
    status = 1;
  }
  return status;
}

function validateQPNumbersAreInRange(QPNumbers) {
  var status = 0;
  var ballNumber = 0;
  var notInBallRange = ''
  var notInMegaRange = ''
  var minBall = 1;
  var ballMax = 1;
  var megaMax = 1;

  if (Game == 1) {// Powerball
    ballMax = pBallMax;
    megaMax = pMegaMax;
  } else if (Game == 2) { //Mega
  ballMax = mBallMax;
    megaMax = mMegaMax;
  } else {
    ballMax = sBallMax;
    megaMax = sMegaMax;
  }

  for (var i = 0; i < QPNumbers.length; i++) {
    ballNumber = parseInt(QPNumbers[i].qpValue);
    if (QPNumbers[i].isMega == 1) {
      if (ballNumber < minBall || ballNumber > megaMax) {
        notInMegaRange = ballNumber;
      }
    } else {
      if (ballNumber < minBall || ballNumber > ballMax) {
        if (notInBallRange == '') {
          notInBallRange = ballNumber;
        } else {
          notInBallRange = notInBallRange + ', ' + ballNumber;
        }
      }
    }
  }

  if ( (notInMegaRange !='') || (notInBallRange != '')) {
    var alertMessage = 'Stop messing around. This is your financial future.';
    if (notInBallRange != '') {
      alertMessage = alertMessage + "The following quick pick ball(s) must be between 1 and " + ballMax + ": " + notInBallRange + "."
    }
    if (notInMegaRange != '') {
      if (notInBallRange != '') {
        alertMessage = alertMessage + "  ";
      }
      alertMessage = alertMessage + "The following MEGA ball must be between 1 and " + megaMax + ": " + notInMegaRange;
    }
    alert(alertMessage);
    status = 1;
  }
  return status;
}

function createQPNumbers(userInput,isMega,userEnteredQPNumbers) {
  var qpBall = {
    qpValue:0,    //user input
    isMega:0,     //boolean: 0-regular, 1-Mega
    requestQP:1,  //boolean: 0-use input, 1-generate QP
    qpNumber:0   //number: final qp number
  }
  qpBall.qpValue = userInput;
  qpBall.isMega = isMega;
  if (userInput ==='undefined' || userInput=='') {
    qpBall.requestQP = 1;
  } else {
    qpBall.requestQP = 0;
    userEnteredQPNumbers.push(qpBall);
  }
  return qpBall;
}

function QPFormSubmitted (e) {
  e.preventDefault();
  var qpNumbers = [];
  var userEnteredQPNumbers = [];

  qpNumbers.push(createQPNumbers($("#QP1").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#QP2").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#QP3").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#QP4").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#QP5").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#QP6").val(),1,userEnteredQPNumbers));
  var status = validateQPNumbersAreIntegers(userEnteredQPNumbers);
  if (status == 0) {
    status = validateQPNumbersAreInRange(userEnteredQPNumbers);
    if (status == 0) {
      //jQuery has no .reset() method. Use javascript to get the first HTML element
      alert('generate QP');
      qpForm[0].reset();
    }
  }
}

//qpForm.addEventListener("submit",QPFormSubmitted);
qpForm.on("submit",QPFormSubmitted);
