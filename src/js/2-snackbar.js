import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const findForm = document.querySelector('form');
const findBtn = document.querySelector('button');
const findInput = document.querySelector('input');
const rejectedInput = document.querySelector('.rejectedInput');
const fulfilledInput = document.querySelector('.fulfilledInput');

findForm.addEventListener('submit', e => {
  e.preventDefault();
  const delay = parseInt(findInput.value, 10);
  const selectedState = findForm.elements.state.value;

  createPromise(delay, selectedState)
    .then(el => {
      showMessage(el, true);
    })
    .catch(err => {
      showMessage(err, false);
    })
    .finally(() => {
      findForm.reset();
    });
});

function createPromise(delay, state) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        res(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        rej(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

function showMessage(text, isSuccess) {
  iziToast.show({
    title: isSuccess ? 'Success' : 'Error',
    message: text,
    color: isSuccess ? 'green' : 'red',
    position: 'topRight',
    timeout: 3000,
  });
}
