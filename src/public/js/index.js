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
let min = 25,
  sec = 0,
  cnt = 0,
  breakMinNum = 5,
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
    sec = 59;
  } else if (sec == 0 && min == 0) {
    clearInterval(intervalTimer);
    startBreak();
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
    breakSecNum = 59;
  } else if (breakSecNum == 0 && breakMinNum == 0) {
    clearInterval(intervalBreak);
    cnt++;
    startTimer();
  }
}

function startTimer() {
  isTimer = true;
  isBreak = false;
  document.querySelector(".content").style.backgroundColor =
    "var(--timeContainer)";
  intervalTimer = setInterval(timer, 1000);
  showTimer();
  hideBreak();
}

function startBreak() {
  isTimer = false;
  isBreak = true;
  document.querySelector(".content").style.backgroundColor = "var(--break)";
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
