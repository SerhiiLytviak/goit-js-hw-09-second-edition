import { Notify } from 'notiflix/build/notiflix-notify-aio';
const delayInputRef = document.querySelector('[name="delay"]');
const stepInputRef = document.querySelector('[name="step"]');
const amountInputRef = document.querySelector('[name="amount"]');
const buttonRef = document.querySelector('form');

let delay = Number(0);
let step = Number(0);
let amount = 0;

buttonRef.addEventListener('submit', onButtonClick);

function onButtonClick(event) {
  event.preventDefault();

  delay = Number(delayInputRef.value);
  step = Number(stepInputRef.value);
  amount = amountInputRef.value;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
    }, delay);
  });
}
