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
    const button = event.currentTarget;
    btnTheme.forEach((btn) => {
      btn.style.backgroundColor = ""; //reset other to the default color
      btn.style.color = "";
    });
    button.style.backgroundColor = "red";
    button.style.color = "white";
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
    btnRing.forEach((btn) => {
      btn.style.backgroundColor = ""; //reset other to the default color
      btn.style.color = "";
    });
    button.style.backgroundColor = "red";
    button.style.color = "white";
    const audio = button.querySelector("audio");
    themeRing = document.getElementById(audio.id);
    console.log(themeRing);
  });
});

//**********************************************

// Timer elements
const timerTime = document.querySelector(".timer");
const timerP = timerTime.querySelectorAll("p");
// Break elements
const breakTime = document.querySelector(".break");
const breakP = breakTime.querySelectorAll("p");
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

// show min and sec of timer at fisrt
let minute = document.querySelector(".minute");
let second = document.querySelector(".second");
minute.innerHTML = "25";
second.innerHTML = "00";

let min, sec, breakMinNum, breakSecNum;
min = 25;
sec = 0;
breakMinNum = 5;
breakSecNum = 0;

//main function to run timer and break for loops
function mainTimer() {
  //button start
  const btnStart = document.querySelector(".btn.start");
  let isPaused = false;
  let isBreak = false;
  let isTimer = true;
  let intervalTimer, intervalBreak;
  // Pomodoro count
  let countPomo = document.getElementById("countPomo");
  let minBreak = document.querySelector(".minBreak");
  let secBreak = document.querySelector(".secBreak");

  let cnt = 0;

  minute.innerHTML = min;
  second.innerHTML = "00";
  countPomo.innerHTML = "You did pomodoro 0 times";
  minBreak.innerHTML = breakMinNum;
  secBreak.innerHTML = "00";

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
      breakMinNum = breakMin;
      breakSecNum = 0;
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
      min = pomoMin;
      sec = 0;
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
}

mainTimer();

// adjust pomo and break
const pomoMinInput = document.querySelector(".pomo-min__input");
const breakMinInput = document.querySelector(".break-min__input");
const timeAdjuster = document.querySelector(".timeAdjuster");
const btnTimeAdjust = document.querySelector(".btn-time--adjust");
const timeAdjust = document.querySelector(".time--adjust");
timeAdjust.style.display = "none";

timeAdjuster.addEventListener("click", () => {
  timeAdjust.style.display = "block";
});

btnTimeAdjust.addEventListener("click", () => {
  // Get the updated input values
  const pomoMin = parseInt(pomoMinInput.value, 10);
  const breakMin = parseInt(breakMinInput.value, 10);

  // Update the times based on the inputs
  min = pomoMin;
  sec = 0;
  breakMinNum = breakMin;
  breakSecNum = 0;

  console.log(`Updated Pomodoro time: ${min} minutes`);
  console.log(`Updated Break time: ${breakMinNum} minutes`);

  // Hide the time adjustment section after updating
  if (timeAdjust) {
    timeAdjust.style.display = "none";
  }

  mainTimer();
});

//**********************************************

//theme + sound toggle
const btnThemeToggle = document.querySelector(".btn.btn-theme-toggle");
const btnMusicToggle = document.querySelector(".btn.btn-music-toggle");
const themeList = document.querySelector(".theme-picker__list");
const musicList = document.querySelector(".music-picker__list");
let isClickTheme = true,
  isClickMusic = true;

themeList.style.display = "none";
musicList.style.display = "none";

btnThemeToggle.addEventListener("click", () => {
  if (isClickTheme) {
    themeList.style.display = "block";
    isClickTheme = false;
  } else {
    themeList.style.display = "none";
    isClickTheme = true;
  }
});

btnMusicToggle.addEventListener("click", () => {
  if (isClickMusic) {
    musicList.style.display = "block";
    isClickMusic = false;
  } else {
    musicList.style.display = "none";
    isClickMusic = true;
  }
});

// *********************************************

//bg sound
const btnSound = document.querySelectorAll(".btnSound");
let currentAudio = null;
btnSound.forEach((btn) => {
  btn.addEventListener("click", function () {
    const audio = this.querySelector("audio");
    console.log(audio);

    if (audio) {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    audio.play();
    currentAudio = audio;
  });
});
