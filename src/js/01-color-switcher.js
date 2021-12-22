const startRef = document.querySelector('button[data-start]');
const stopRef = document.querySelector('button[data-stop]');
const bodyRef = document.body;
let timerId = null;

startRef.addEventListener('click', onStartButtonClick);
stopRef.addEventListener('click', onStopButtonClick);

function onStartButtonClick() {
  startRef.setAttribute('disabled', true);
  timerId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopButtonClick() {
  clearInterval(timerId);
  startRef.removeAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
