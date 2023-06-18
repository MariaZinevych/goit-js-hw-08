import trottle from 'lodash.throttle';

const formVallue = document.querySelector('.feedback-form');

const textareaVallue = document.querySelector('textarea');

initForm();

formVallue.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(formVallue);
  formData.forEach((value, name) => console.log(value, name));
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
});

formVallue.addEventListener('change', e => {
  let selectedFilter = localStorage.getItem('feedback-form-state');
  selectedFilter = selectedFilter ? JSON.parse(selectedFilter) : {};
  selectedFilter[e.target.name] = e.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(selectedFilter));
});

function initForm() {
  let savedMessage = localStorage.getItem('feedback-form-state');
  if (savedMessage) {
    savedMessage = JSON.parse(savedMessage);
    console.log(savedMessage);

    Object.entries(savedMessage).forEach(([name, value]) => {
      formVallue.elements[name].value = value;
    });
  }
}
