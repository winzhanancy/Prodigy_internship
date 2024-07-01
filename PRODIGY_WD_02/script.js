let timer;
let isRunning = false;
let startTime;
let lapStartTime;
let lapCounter = 1;

function startPause() {
  if (isRunning) {
    clearInterval(timer);
    document.getElementById("startPause").textContent = "Resume";
  } else {
    startTime = new Date() - (lapStartTime || 0);
    timer = setInterval(updateDisplay, 100);
    document.getElementById("startPause").textContent = "Pause";
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  document.getElementById("startPause").textContent = "Start";
  document.getElementById("display").textContent = "00:00:00.00";
  document.getElementById("lapList").innerHTML = "";
  lapCounter = 1;
}

function lap() {
  if (isRunning) {
    const lapTime = new Date() - startTime;
    const formattedTime = formatTime(lapTime);
    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${lapCounter} :: ${formattedTime}`;
    document.getElementById("lapList").appendChild(lapItem);
    lapCounter++;
    lapStartTime = new Date();
  }
}

function updateDisplay() {
  const currentTime = new Date() - startTime;
  document.getElementById("display").textContent = formatTime(currentTime);
}

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}
