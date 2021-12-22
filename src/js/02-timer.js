import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateInputRef = document.querySelector('#datetime-picker');
const startButtonRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('.value[data-days]');
const hoursRef = document.querySelector('.value[data-hours]');
const minutesRef = document.querySelector('.value[data-minutes]');
const secondsRef = document.querySelector('.value[data-seconds]');
let timeLeft = null;
let timerId = null;

startButtonRef.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      window.alert('Please choose a date in the future');
      return;
    }
    startButtonRef.removeAttribute('disabled', true);

    timeLeft = selectedDates[0] - options.defaultDate;
  },
};

flatpickr(dateInputRef, options);

startButtonRef.addEventListener('click', onStartButtonClick);

function onStartButtonClick() {
  startButtonRef.setAttribute('disabled', true);
  dateInputRef.setAttribute('disabled', true);

  timerId = setInterval(() => {
    options.defaultDate = Date.now();
    const time = convertMs((timeLeft -= 1000));
    updateTimer(time);

    if (timeLeft <= 1000) {
      clearInterval(timerId);
      startButtonRef.removeAttribute('disabled', true);
      dateInputRef.removeAttribute('disabled', true);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minutesRef.textContent = minutes;
  secondsRef.textContent = seconds;
}
