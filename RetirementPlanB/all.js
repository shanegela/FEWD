
var gameMega = document.querySelector("#gameMega");
var gameSuper = document.querySelector("#gameSuper");
var gamePower = document.querySelector("#gamePower");
var megaBall = document.querySelector("#megaBall");
var megaNum = document.querySelector("#megaBall p");
var jackpotAmount = $(".nextJackpotAmount p");
var ball1Num = $("#ball1 p");
var ball2Num = $("#ball2 p");
var ball3Num = $("#ball3 p");
var ball4Num = $("#ball4 p");
var ball5Num = $("#ball5 p");
var qpBall1Num = $("#qpBall1 p");
var qpBall2Num = $("#qpBall2 p");
var qpBall3Num = $("#qpBall3 p");
var qpBall4Num = $("#qpBall4 p");
var qpBall5Num = $("#qpBall5 p");
var qpMegaNum = $("#qpMegaBall p");
var qpMegaBall = document.querySelector("#qpMegaBall");


var pmaxBall = 59;
var pmaxMega = 35;
var mmaxBall = 75;
var mmaxMega = 15;
var smaxBall = 47;
var smaxMega = 27;

var minBall = 1;
var maxBall = 1;
var minMega = 1;
var maxMega = 1;

var powerGameId = 1;
var megaGameId = 2;
var superGameId = 3;

var GameId = powerGameId;
var qpForm = $("#qpForm");

function setMinMax (newGameId) {
  if (newGameId == 1) {
    maxBall = pmaxBall;
    maxMega = pmaxMega;
  } else if (newGameId == 2) {
    maxBall = mmaxBall;
    maxMega = mmaxMega;
  } else {
    maxBall = smaxBall;
    maxMega = smaxMega;
  }
}

function resetQuickPick (newGameId) {
  if (GameId != newGameId) {
    qpBall1Num.text("$");
    qpBall2Num.text("$");
    qpBall3Num.text("$");
    qpBall4Num.text("$");
    qpBall5Num.text("$");
    qpMegaNum.text("$");
  }
}

function setGame (newGameId) {
  setMinMax(newGameId);
  resetQuickPick(newGameId);
  GameId = newGameId;
}

function powerClicked (e) {
  megaBall.style.setProperty("background","#CA1F26");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  qpMegaBall.style.setProperty("background","#CA1F26");
  qpMegaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  qpMegaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  qpMegaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  $.get("http://calservice.calottery.com/api/drawgames/12",updateLotto);
  setGame(powerGameId);
}

function megaClicked (e) {
  megaBall.style.setProperty("background","#1A4199");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  qpMegaBall.style.setProperty("background","#1A4199");
  qpMegaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  qpMegaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  qpMegaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  $.get("http://calservice.calottery.com/api/drawgames/15",updateLotto);
  setGame(megaGameId);
}

function superClicked (e) {
  megaBall.style.setProperty("background","#F48A1E");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  qpMegaBall.style.setProperty("background","#F48A1E");
  qpMegaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  qpMegaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  qpMegaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  $.get("http://calservice.calottery.com/api/drawgames/8",updateLotto);
  setGame(superGameId);
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

  for (var i = 0; i < QPNumbers.length; i++) {
    ballNumber = parseInt(QPNumbers[i].qpValue);
    if (QPNumbers[i].isMega == 1) {
      if (ballNumber < minMega || ballNumber > maxMega) {
        notInMegaRange = ballNumber;
      }
    } else {
      if (ballNumber < minBall || ballNumber > maxBall) {
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
      alertMessage = alertMessage + "The following quick pick ball(s) must be between 1 and " + maxBall + ": " + notInBallRange + "."
    }
    if (notInMegaRange != '') {
      if (notInBallRange != '') {
        alertMessage = alertMessage + "  ";
      }
      alertMessage = alertMessage + "The following MEGA ball must be between 1 and " + maxMega + ": " + notInMegaRange;
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
    qpNumber:0    //number: final qp number
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


function getRandomInt(min, max) {
  // Returns a random integer between min (included) and max (excluded)
  // Using Math.round() will give you a non-uniform distribution!
  return Math.floor(Math.random() * (max - min)) + min;
}

function sortQPNumbers(qpNumbers) {
  // sort QP generated numbers
  var sortNumbers= [];
  for (var i=0; i < qpNumbers.length -1; i++) {
    sortNumbers.push(qpNumbers[i].qpNumber);
  }
  sortNumbers.sort(function(a, b){return a-b});
  for (var i=0; i < sortNumbers.length; i++) {
    qpNumbers[i].qpNumber = sortNumbers[i];
  }
  sortNumbers = [];
  return qpNumbers;
}

function generateQPNumbers(qpNumbers) {
  var isDuplicate = 0;
  for (var i=0; i < qpNumbers.length; i++) {
    if (qpNumbers[i].requestQP == 1) {
      var num = 1;
      if (qpNumbers[i].isMega == 1) {
        num = getRandomInt(minMega,maxMega);
      } else {
        isDuplicate = 1;
        while (isDuplicate == 1) {
          isDuplicate = 0;
          num = getRandomInt(minBall,maxBall);
          for (var j=0; j < qpNumbers.length; j++) {
            if (num == qpNumbers[j].qpNumber && j != i) {
              isDuplicate = 1;
            }
          }
        }
      }
      qpNumbers[i].qpNumber = num;
    } else {
      qpNumbers[i].qpNumber = parseInt(qpNumbers[i].qpValue);
    }
  }
  qpNumbers = sortQPNumbers(qpNumbers);
  return qpNumbers;
}

function showQPNumbers(qpNumbers) {
  qpBall1Num.text(qpNumbers[0].qpNumber);
  qpBall2Num.text(qpNumbers[1].qpNumber);
  qpBall3Num.text(qpNumbers[2].qpNumber);
  qpBall4Num.text(qpNumbers[3].qpNumber);
  qpBall5Num.text(qpNumbers[4].qpNumber);
  qpMegaNum.text(qpNumbers[5].qpNumber);
}

function QPFormSubmitted (e) {
  e.preventDefault();
  var qpNumbers = [];
  var userEnteredQPNumbers = [];

  qpNumbers.push(createQPNumbers($("#qpInput1").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#qpInput2").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#qpInput3").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#qpInput4").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#qpInput5").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#qpInputMega").val(),1,userEnteredQPNumbers));
  var status = validateQPNumbersAreIntegers(userEnteredQPNumbers);
  if (status == 0) {
    status = validateQPNumbersAreInRange(userEnteredQPNumbers);
    if (status == 0) {
      //jQuery has no .reset() method. Use javascript to get the first HTML element
      qpNumbers = generateQPNumbers(qpNumbers);
      showQPNumbers(qpNumbers);
      qpForm[0].reset();
    }
  }
}

//qpForm.addEventListener("submit",QPFormSubmitted);
qpForm.on("submit",QPFormSubmitted);
