import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  let delays = event.currentTarget.delay.value;
  const steps = event.currentTarget.step.value;
  const amounts = event.currentTarget.amount.value;

  for (let i = 1; i <= Number(amounts); i += 1){

    createPromise(i, Number(delays))
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
       delays = Number(delays) + Number(steps);

  }

}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
      // Fulfill
        resolve({position, delay})
    } else {
      // Reject
    }reject({position, delay})
    }, delay)
    
  });
}



