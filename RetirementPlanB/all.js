
var gameMega = document.querySelector("#gameMega");
var gameSuper = document.querySelector("#gameSuper");
var gamePower = document.querySelector("#gamePower");

function megaClicked (e) {
  var megaBall = document.querySelector("#megaBall");
  megaBall.style.setProperty("background","#1A4199");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(11, 33, 82,.7)");
  megaNum.textContent="M";
}

function superClicked (e) {
  var megaBall = document.querySelector("#megaBall");
    megaBall.style.setProperty("background","#F48A1E");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(201, 80, 14,.7)");
  megaNum.textContent="S";
}

function powerClicked (e) {
  var megaBall = document.querySelector("#megaBall");
  var megaNum = document.querySelector("#megaNum");
  megaBall.style.setProperty("background","#CA1F26");
  megaBall.style.setProperty("box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  megaBall.style.setProperty("-webkit-box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  megaBall.style.setProperty("-moz-box-shadow","inset -25px -25px 30px rgba(101, 17, 19,.7)");
  megaNum.textContent="P";
}

gameMega.addEventListener("click",megaClicked);
gameSuper.addEventListener("click",superClicked);
gamePower.addEventListener("click",powerClicked);
