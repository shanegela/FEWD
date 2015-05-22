/* draw games*/
var powerGameId = 1;
var megaGameId = 2;
var superGameId = 3;
var GameId = powerGameId;
var gameMega = document.querySelector("#gameMega");
var gameSuper = document.querySelector("#gameSuper");
var gamePower = document.querySelector("#gamePower");
var jackpotAmount = $("#nextJackpotAmount");
/* winning Numbers*/
var ball1Num = $("#ball1 p");
var ball2Num = $("#ball2 p");
var ball3Num = $("#ball3 p");
var ball4Num = $("#ball4 p");
var ball5Num = $("#ball5 p");
var megaNum = document.querySelector("#megaBall p");
var megaBall = document.querySelector("#megaBall");
/* quickpick Numbers */
var qpBall1Num = $("#qpBall1 p");
var qpBall2Num = $("#qpBall2 p");
var qpBall3Num = $("#qpBall3 p");
var qpBall4Num = $("#qpBall4 p");
var qpBall5Num = $("#qpBall5 p");
var qpMegaNum = $("#qpMegaBall p");
var qpMegaBall = document.querySelector("#qpMegaBall");
/* Draw game number range */
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
/* Draw game colors*/
pMegaBallBackgroundColor = "#CA1F26"
pMegaBallBoxShadowColor = "rgba(101, 17, 19,.7)";
mMegaBallBackgroundColor = "#1A4199"
mMegaBallBoxShadowColor = "rgba(11, 33, 82,.7)";
sMegaBallBackgroundColor = "#F48A1E"
sMegaBallBoxShadowColor = "rgba(201, 80, 14,.7)";
/* other elements*/
var qpForm = $("#quickpickForm");

/**********************************************
Set the draw game minimum and maximum number range for
regular balls and the Mega ball
**********************************************/
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

/**********************************************
Reset quickpick numbers to default value $
**********************************************/
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

/**********************************************
set ball color background and boxshadow
**********************************************/
function setBallColor(ball,bkgColor,bxsColor) {
  ball.style.setProperty("background",bkgColor);
  ball.style.setProperty("box-shadow","inset -25px -25px 30px " + bxsColor);
  ball.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px " + bxsColor);
  ball.style.setProperty("-moz-box-shadow","inset -25px -25px 30px " + bxsColor);
}

/**********************************************
Based on the selected draw game
- set the valid numer ranges
- reset quickpick generate
- store the gameId into local storage
- initialize UI for selected game:
  - non-selected games as more transparent
  - set winningNumber and quickpick Mega Ball colors
**********************************************/
function setGame (newGameId) {
  setMinMax(newGameId);
  resetQuickPick(newGameId);
  GameId = newGameId;
  if (localStorage) {
    localStorage.setItem("gameId",GameId.toString());
  }
  if (GameId == 1) {
    $("#imgPower").css("opacity",1);
    $("#imgMega").css("opacity",0.4);
    $("#imgSuper").css("opacity",0.4);
    setBallColor(megaBall,pMegaBallBackgroundColor,pMegaBallBoxShadowColor);
    setBallColor(qpMegaBall,pMegaBallBackgroundColor,pMegaBallBoxShadowColor);
  } else if (GameId == 2) {
    $("#imgPower").css("opacity",0.4);
    $("#imgMega").css("opacity",1);
    $("#imgSuper").css("opacity",0.4);
    setBallColor(megaBall,mMegaBallBackgroundColor,mMegaBallBoxShadowColor);
    setBallColor(qpMegaBall,mMegaBallBackgroundColor,mMegaBallBoxShadowColor);
  } else  {
    $("#imgPower").css("opacity",0.4);
    $("#imgMega").css("opacity",0.4);
    $("#imgSuper").css("opacity",1);
    setBallColor(megaBall,sMegaBallBackgroundColor,sMegaBallBoxShadowColor);
    setBallColor(qpMegaBall,sMegaBallBackgroundColor,sMegaBallBoxShadowColor);
  }

}

/**********************************************
Draw Game: Powerball
- get data from calottery API
-   using Avand's proxy server because of error: "Access-Control-Allow-Origin"
- initialize game attributes
**********************************************/
function powerClicked (e) {
  $.getJSON("http://proxy.avandamiri.com/get?url=http://calservice.calottery.com/api/drawgames/12",updateLotto);
  setGame(powerGameId);
}

function megaClicked (e) {
  $.getJSON("http://proxy.avandamiri.com/get?url=http://calservice.calottery.com/api/drawgames/15",updateLotto);
  setGame(megaGameId);
}

function superClicked (e) {
  $.getJSON("http://proxy.avandamiri.com/get?url=http://calservice.calottery.com/api/drawgames/8",updateLotto);
  setGame(superGameId);
}

/**********************************************
Format number to have comma as thousandth separator
**********************************************/
function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

/**********************************************
Format string to date format mm/dd/ccyy
**********************************************/
function getDateFormatted(drawDate) {
  var drawDateYear = drawDate.substring(0,4);
  var drawDateMonth = drawDate.substring(5,7);
  var drawDateDay = drawDate.substring(8,10);
  var drawDateFormatted = drawDateMonth + "/" + drawDateDay + "/" + drawDateYear;
  return drawDateFormatted;

}

/**********************************************
When API call is successful, call this function to initialize page with
- last winning numbers
- next jackpot amount
**********************************************/
function updateLotto(results) {
  var winningNumbers = results.games[0].draws[0].winningNumbers;
  var gamePotAmount = results.games[0].nextJackpot.jackpotAmount;
  var drawDate = getDateFormatted(results.games[0].draws[0].drawDate);
  var nextDrawDate = getDateFormatted(results.games[0].nextJackpot.drawDate);
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
  $("#nextJackpotDrawDate").text("Next Draw Date: " + nextDrawDate);
  $("#winningNumbersDrawDate").text("Winning Numbers for Date: "+ drawDate);
  $("#quickpickDrawDate").text("Next Draw Date: " + nextDrawDate);
}

/**********************************************
Validate user input quick pick numbers are integers
**********************************************/
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
      alertMessage = alertMessage + "The following quick pickball(s) are not integers: " + notInt;
    }
    alert(alertMessage);
    status = 1;
  }
  return status;
}

/**********************************************
Validate user input quick pick numbers are in the draw game range
**********************************************/
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
      alertMessage = alertMessage + "The following quickpick ball(s) must be between 1 and " + maxBall + ": " + notInBallRange + "."
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

/**********************************************
Validate user input quick pick numbers have no duplicates
**********************************************/
function validateQPNumbersHasNoDuplicates(QPNumbers) {
  var status = 0;
  var dupMessage = '';

  for (var i = 0; i < QPNumbers.length; i++) {
    if (QPNumbers[i].isMega == 0) {
      for (var j = 0; j < QPNumbers.length; j++) {
        if (QPNumbers[i].qpValue == QPNumbers[j].qpValue && i != j && QPNumbers[i].isMega == 0 ) {
          status = 1;
        }
      }
    }
  }
  if (status == 1) {
    alert("Stop messing around. This is your financial future. Remove duplicate quickpick values.");
  }
  return status;
}

/**********************************************
create QP object with attributes
**********************************************/
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

/**********************************************
Returns a random integer between min (included) and max (excluded)
Using Math.round() will give you a non-uniform distribution!
**********************************************/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**********************************************
sort quickpick numbers in ascending order
**********************************************/
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

/**********************************************
generate quickpick numbers
**********************************************/
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

/**********************************************
Set UI quickpick numbers to generated quickpick values
**********************************************/
function showQPNumbers(qpNumbers) {
  qpBall1Num.text(qpNumbers[0].qpNumber);
  qpBall2Num.text(qpNumbers[1].qpNumber);
  qpBall3Num.text(qpNumbers[2].qpNumber);
  qpBall4Num.text(qpNumbers[3].qpNumber);
  qpBall5Num.text(qpNumbers[4].qpNumber);
  qpMegaNum.text(qpNumbers[5].qpNumber);
}

/**********************************************
Set UI quickpick numbers to generated quickpick values
**********************************************/
function QPFormSubmitted (e) {
  e.preventDefault();
  var qpNumbers = [];
  var userEnteredQPNumbers = [];
  //create an array of QP objects
  qpNumbers.push(createQPNumbers($("#qpInput1").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#qpInput2").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#qpInput3").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#qpInput4").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#qpInput5").val(),0,userEnteredQPNumbers));
  qpNumbers.push(createQPNumbers($("#qpInputMega").val(),1,userEnteredQPNumbers));
  //validate user input quickpick numbers
  var status = validateQPNumbersAreIntegers(userEnteredQPNumbers);
  if (status == 0) {
    status = validateQPNumbersAreInRange(userEnteredQPNumbers);
    if (status == 0) {
      status = validateQPNumbersHasNoDuplicates(userEnteredQPNumbers);
      if (status == 0) {
        //jQuery has no .reset() method. Use javascript to get the first HTML element
        qpNumbers = generateQPNumbers(qpNumbers);
        showQPNumbers(qpNumbers);
        qpForm[0].reset();
      }
    }
  }
}

/**********************************************
event listners for draw games
**********************************************/
gameMega.addEventListener("click",megaClicked);
gameSuper.addEventListener("click",superClicked);
gamePower.addEventListener("click",powerClicked);
qpForm.on("submit",QPFormSubmitted);

/**********************************************
When page is initially loaded,
  load local storage last selected game
  or load default game powerball
**********************************************/
$( document ).ready(function() {
  var lastGameId = 1;//Powerball
  if (localStorage) {
    var lastGameId = parseInt(localStorage.getItem("gameId"));
  }
  if (lastGameId === 2) {
    megaClicked();
  } else if (lastGameId === 3) {
    superClicked();
  } else {
    powerClicked();
  }
});
