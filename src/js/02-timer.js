import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]');

const dateDays = document.querySelector('[data-days]');

const dateHours = document.querySelector('[data-hours]');

const dateMinutes = document.querySelector('[data-minutes]');

const dateSeconds = document.querySelector('[data-seconds]');

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const today = new Date();

    if (selectedDate < today) {
      Notiflix.Notify.failure('Please choose a date from the future!');
      startBtn.setAttribute('disabled', true);
      startBtn.style.cursor = 'default';
    } else {
      startBtn.removeAttribute('disabled');
    }

    startBtn.addEventListener('click', e => {
      startBtn.setAttribute('disabled', true);

      const timerId = setInterval(() => {
        const nowDate = new Date();
        const timeDif = selectedDate - nowDate;
        if (timeDif <= 0) {
          return clearInterval(timerId);
        }
        const convert = convertMs(timeDif);
        dateDays.textContent = addLeadingZero(convert.days);
        dateHours.textContent = addLeadingZero(convert.hours);
        dateMinutes.textContent = addLeadingZero(convert.minutes);
        dateSeconds.textContent = addLeadingZero(convert.seconds);
      }, 1000);
    });
  },
});

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}


