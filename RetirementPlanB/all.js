
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



function megaClicked (e) {
  megaBall.style.setProperty("background","#1A4199");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  $.get("http://calservice.calottery.com/api/drawgames/15",updateLotto);
}

function superClicked (e) {
  megaBall.style.setProperty("background","#F48A1E");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  $.get("http://calservice.calottery.com/api/drawgames/8",updateLotto);
}

function powerClicked (e) {
  megaBall.style.setProperty("background","#CA1F26");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  $.get("http://calservice.calottery.com/api/drawgames/12",updateLotto);
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
  winningNumbers.sort();
  ball1Num.text(winningNumbers[0]);
  ball2Num.text(winningNumbers[1]);
  ball3Num.text(winningNumbers[2]);
  ball4Num.text(winningNumbers[3]);
  ball5Num.text(winningNumbers[4]);
  megaNum.textContent=winningNumbers[5];
  jackpotAmount.text(formatNumber(gamePotAmount));
}
