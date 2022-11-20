import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  text: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  timer: document.querySelector('.timer'),
  daysTimer: document.querySelector('span[data-days]'),
  hoursTimer: document.querySelector('span[data-hours]'),
  minutesTimer: document.querySelector('span[data-minutes]'),
  secondsTimer: document.querySelector('span[data-seconds]'),
};
refs.btnStart.disabled = true;
let timerId = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const difference = selectedDates[0] - new Date();
    convertMs(difference);

    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.btnStart.disabled = false;
    refs.btnStart.addEventListener('click', () => {
      timerId = setInterval(() => {
        const currentTime = new Date();
        const difference = selectedDates[0] - currentTime;
        convertMs(difference);

        refs.daysTimer.textContent = `${
          Object.values(convertMs(difference))[0]
        }`;
        refs.hoursTimer.textContent = `${
          Object.values(convertMs(difference))[1]
        }`;
        refs.minutesTimer.textContent = `${
          Object.values(convertMs(difference))[2]
        }`;
        refs.secondsTimer.textContent = `${
          Object.values(convertMs(difference))[3]
        }`;
        if (difference < 1000) {
          clearInterval(timerId);
        }
      }, 1000);
    });

    console.log(selectedDates[0]);
  },
};

flatpickr(refs.text, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
