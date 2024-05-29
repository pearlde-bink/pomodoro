// Theme picker
function setTheme(theme) {
  document.body.className = "";
  document.body.classList.add(`theme-${theme}`);
}

setTheme("sunset");

// Theme button
const btnTheme = document.querySelectorAll(".btn.btn-theme");

let themeColor;
btnTheme.forEach((btn) => {
  btn.addEventListener("click", function () {
    const theme = this.getAttribute("data-theme");
    document.addEventListener("DOMContentLoaded", setTheme(theme));
  });
});

//**********************************************
//Audio
const btnRing = document.querySelectorAll(".btn.btn-ring");
let themeRing;
btnRing.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const audio = button.querySelector("audio");
    themeRing = document.getElementById(audio.id);
    console.log(themeRing);
  });
});
// *********************************************
// Timer and Break counting down (in loop)
const btnStart = document.querySelector(".btn.start");
// Timer elements
const timerTime = document.querySelector(".timer");
const timerP = timerTime.querySelectorAll("p");
let minute = document.querySelector(".minute");
let second = document.querySelector(".second");
// Pomodoro count
let countPomo = document.getElementById("countPomo");
// Break elements
const breakTime = document.querySelector(".break");
const breakP = breakTime.querySelectorAll("p");
let minBreak = document.querySelector(".minBreak");
let secBreak = document.querySelector(".secBreak");

let intervalTimer, intervalBreak;
let min = 1,
  sec = 0,
  cnt = 0,
  breakMinNum = 1,
  breakSecNum = 0;
let isPaused = false;
let isBreak = false;
let isTimer = true;

minute.innerHTML = 25;
second.innerHTML = "00";
countPomo.innerHTML = "You did pomodoro 0 times";
minBreak.innerHTML = 5;
secBreak.innerHTML = "00";

// Timer
function showTimer() {
  timerTime.style.display = "block";
  timerP.forEach((p) => {
    p.style.display = "block";
  });
}

function hideTimer() {
  timerTime.style.display = "none";
  timerP.forEach((p) => {
    p.style.display = "none";
  });
}

// Break
function hideBreak() {
  breakTime.style.display = "none";
  breakP.forEach((p) => {
    p.style.display = "none";
  });
}

function showBreak() {
  breakTime.style.display = "block";
  breakP.forEach((p) => {
    p.style.display = "block";
  });
}

showTimer();
hideBreak();

// Timer countdown
function timer() {
  second.innerHTML = sec < 10 ? "0" + sec : sec;
  minute.innerHTML = min;
  countPomo.innerHTML = "You did pomo " + cnt + " times";

  if (sec > 0) {
    sec--;
  } else if (sec == 0 && min > 0) {
    min--;
    sec = 10;
  } else if (sec == 0 && min == 0) {
    clearInterval(intervalTimer);
    startBreak();
    breakMinNum = 1;
    breakSecNum = 10;
  }
}

// Break countdown
function breakTimer() {
  secBreak.innerHTML = breakSecNum < 10 ? "0" + breakSecNum : breakSecNum;
  minBreak.innerHTML = breakMinNum;
  countPomo.innerHTML = "You did pomo " + cnt + " times";

  if (breakSecNum > 0) {
    breakSecNum--;
  } else if (breakSecNum == 0 && breakMinNum > 0) {
    breakMinNum--;
    breakSecNum = 10;
  } else if (breakSecNum == 0 && breakMinNum == 0) {
    clearInterval(intervalBreak);
    cnt++;
    startTimer();
    min = 1;
    sec = 10;
  }
}

function startTimer() {
  isTimer = true;
  isBreak = false;
  const startColor = getComputedStyle(document.documentElement)
    .getPropertyValue("var(--timeContainer)")
    .trim();
  document.querySelector(".content").style.backgroundColor = startColor;
  intervalTimer = setInterval(timer, 1000);
  showTimer();
  hideBreak();
}

function startBreak() {
  isTimer = false;
  isBreak = true;
  //play break ringing
  themeRing.play();
  // document.querySelector(".content").style.backgroundColor = "#($--break)";
  const breakColor = getComputedStyle(document.documentElement)
    .getPropertyValue("var(--break)")
    .trim();
  document.querySelector(".content").style.backgroundColor = breakColor;
  intervalBreak = setInterval(breakTimer, 1000);
  showBreak();
  hideTimer();
}

function runDead() {
  if (!isPaused) {
    btnStart.innerHTML = "Pause";
    isPaused = true;

    if (isTimer && !isBreak) {
      clearInterval(intervalBreak);
      intervalTimer = setInterval(timer, 1000);
    } else if (!isTimer && isBreak) {
      clearInterval(intervalTimer);
      intervalBreak = setInterval(breakTimer, 1000);
    }
  } else {
    btnStart.innerHTML = "Start";
    isPaused = false;
    clearInterval(intervalTimer);
    clearInterval(intervalBreak);
  }
}

btnStart.addEventListener("click", function () {
  runDead();
});
