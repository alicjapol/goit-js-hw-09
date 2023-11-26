import Notiflix from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(submit) {
  submit.preventDefault();
  const delay = submit.currenTarget;
  const step = submit.currenTarget;
  const amount = submit.currenTarget;
  let currentDelay = Number(delay.value);
  for (let i = 1; i <= amount.value; i += 1) {
createPromise(i, currentDelay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success('Fulfilled promise ${position} in ${delay}ms');
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure('Rejected promise ${position} in ${delay}ms');
  });
  currentDelay += Number(step.value);
  }
  }