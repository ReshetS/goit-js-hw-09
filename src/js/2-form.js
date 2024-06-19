const feedbackForm = document.querySelector('.feedback-form');
const email = feedbackForm.elements.email;
const message = feedbackForm.elements.message;
const LS_KEY = 'feedback-form-state';

// Спробуємо витягнути значення з localStorage, якщо там пусто, то створимо новий об'єкт
const formData = JSON.parse(localStorage.getItem(LS_KEY)) ?? {
  email: '',
  message: '',
};

// Якщо ми вже маємо якісь значення в email та/або message, що прийшли з localStorage, то пропишемо ці значення
if (formData.email || formData.message) {
  email.value = formData.email;
  message.value = formData.message;
}

feedbackForm.addEventListener('input', saveFormState);
feedbackForm.addEventListener('submit', sendForm);

function saveFormState(event) {
  //   console.log(event.target);
  if (event.target.name === 'email') {
    // Якщо ми на полі email, то змінюємо email в об'єкті
    formData.email = email.value.trim();
  } else if (event.target.name === 'message') {
    // Якщо на полі message, то змінюємо email в об'єкті
    formData.message = message.value.trim();
  } else {
    // Якщо це якийсь інший елемент, то нічого не робимо і виходимо з функції
    return;
  }
  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

function sendForm(event) {
  event.preventDefault();
  // Подія input нам завжди оновлює об'єкт, то ж ми одразу можемо перевірити саме його властивості, як вказано в завданні, а не поля форми
  if (formData.email !== '' && formData.message !== '') {
    // Виведемо об'єкт
    console.log(formData);
    // Очистимо LS
    localStorage.removeItem(LS_KEY);
    // Очистимо об'єкт
    formData.email = '';
    formData.message = '';
    // Очистимо форму
    feedbackForm.reset();
  } else {
    alert('Fill please all fields');
  }
}
