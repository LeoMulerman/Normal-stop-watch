const btn = document.getElementById("btn");
const btnStop = document.getElementById("btn-stop");
const tickSound = document.getElementById("tick-sound");
const mouseSound = document.getElementById("mouse-sound");
const timerInput = document.getElementById("timer-input");
let title = document.getElementById("title");

let count;
let timer;

function updateButtonState() {
  btn.disabled = timerInput.value.trim() === "";
}

function stopTimer() {
  clearInterval(timer);
}

updateButtonState();

timerInput.addEventListener("input", updateButtonState);

btn.addEventListener("click", () => {
  btnStop.classList.remove("hide");
  count = parseInt(timerInput.value, 10);
  title.innerHTML = `Вы выбрали ${count} секунд`;
  btn.disabled = true;
  timer = setInterval(() => {
    if (count > 0) {
      count--;
      btn.innerHTML = count;
      tickSound.currentTime = 0;
      tickSound.play();

      if (count < 4 && count > 0) {
        tickSound.pause();
        mouseSound.play();
        title.innerHTML = "Нормальный Таймер";
      }
    } else {
      clearInterval(timer);
      btn.disabled = false;
      btn.innerHTML = "start";
      btnStop.classList.add("hide");
    }
    timerInput.value = "";
    btnStop.addEventListener("click", () => {
      stopTimer();
      btn.disabled = false;
      btn.innerHTML = "start";
      btnStop.classList.add("hide");
    });
  }, 1000);
});

btn.innerHTML = "start";

if (window.innerWidth <= 600) {
  timerInput.placeholder = "Введите секунды";
}
