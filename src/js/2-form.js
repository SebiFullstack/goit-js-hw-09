const formData = { email: "", message: "" }

const form = document.querySelector('.feedback-form')

// Функція, яка перевіряє наявність збережених даних у localStorage і, якщо вони є, заповнює форму.
const populateForm = () => {

  // Отримуємо дані з localStorage під ключем "feedback-form-state".
  const savedData = localStorage.getItem("feedback-form-state")

  if (savedData) {
    const parsedData = JSON.parse(savedData) // Отримуємо дані з localStorage
    formData.email = parsedData.email || ""; // Оновлюємо тільки значення полів
    formData.message = parsedData.message || ""; 
    // console.log(formData);
    
    // Заповнюємо поля форми збереженими даними.
    // Якщо дані відсутні, залишаємо порожнім відповідне поле.
    form.elements.email.value = formData.email || "";
    form.elements.message.value = formData.message || "";
  }
}

//Обробник події для відстеження змін у формі (подія 'input').
const handleFormInput = event => {

  // Отримуємо ім'я (name) та значення (value) поля, яке було змінено.
  const { name, value } = event.target;

  // Оновлюємо відповідне поле в об'єкті formData значенням, яке ввів користувач.
  formData[name] = value.trim(); // Обрізаємо зайві пробіли з початку і кінця рядка.

  // Зберігаємо актуальний стан форми в localStorage під ключем "feedback-form-state".
  localStorage.setItem("feedback-form-state", JSON.stringify(formData))
}



// Обробник події відправлення форми (подія 'submit').
const handleFormSubmit = event => {

  event.preventDefault(); // Забороняємо стандартну відправку форми

  // Перевіряємо, чи заповнені обидва поля (email та message).
  // Якщо якесь поле порожнє, показуємо сповіщення користувачу.
  if (!formData.email || !formData.message) {
    alert("Fill please all fields"); // Сповіщення, що необхідно заповнити всі поля.
    return;
  }
  // Якщо обидва поля заповнені, виводимо об'єкт formData з актуальними значеннями у консоль.
  console.log(formData);
  
  // Очищаємо локальне сховище, видаляючи дані, збережені під ключем "feedback-form-state".
  localStorage.removeItem("feedback-form-state")

  // Скидаємо об'єкт formData до початкового стану з порожніми полями.
  formData.email = "";
  formData.message = "";
  // Очищаємо форму
  form.reset()
}

// Викликаємо функцію для заповнення форми при завантаженні сторінки.
// Якщо в localStorage є збережені дані, вони будуть використані для заповнення форми.
populateForm()


// Додаємо подію на форму, щоб відстежувати  і оновлювати дані в localStorage.
form.addEventListener('input', handleFormInput)

// Додаємо подію на форму
form.addEventListener('submit', handleFormSubmit)