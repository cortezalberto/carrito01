let errors = {};

const formu = document.getElementById("formulario");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");

const email = document.getElementById("email");
const pass = document.getElementById("pass");
const repassword = document.getElementById("repassword");
const rol = document.getElementById("rol");

console.log(firstName);
// Declaro las Funciones

let firstNameValidator = () => {
  // Declaro string vacio que contendra mensaje de error
  let feedback = "";
  // Almaceno elemento hermano(<p>) a input nombre, hay un p al final
  let feedbackElement = firstName.nextElementSibling;

  // Si el nombre no valida sobreescribo feedback
  if (firstName.value.trim() == "") {
    feedback = "El nombre no puede estar vacio";
  } else if (firstName.value.length < 5) {
    feedback = "El nombre no puede tener menos de 5 caracteres";
  }

  // Si existe error se almacena en objeto errors
  if (feedback) {
    firstName.classList.add("error-input");
    errors.firstName = feedback;
  } else {
    firstName.classList.remove("error-input");
    delete errors.firstName;
  }

  // Se imprime string de error en vista
  // Utilizo el <p> hermano para publicar el error
  //feedbackElement es el siguiente hermano, es decir el P
  feedbackElement.innerText = feedback;
};

let lastNameValidator = () => {
  // Declaro string vacio que contendra mensaje de error
  let feedback = "";
  // Almaceno elemento hermano(<p>) a input nombre, hay un p al final
  let feedbackElement = lastName.nextElementSibling;

  // Si el nombre no valida sobreescribo feedback
  if (lastName.value.trim() == "") {
    feedback = "El apellido no puede estar vacio";
  } else if (lastName.value.length < 5) {
    feedback = "El apellido no puede tener menos de 5 caracteres";
  }

  // Si existe error se almacena en objeto errors
  if (feedback) {
    lastName.classList.add("error-input");
    errors.lastName = feedback;
  } else {
    lastName.classList.remove("error-input");
    delete errors.lastName;
  }

  // Se imprime string de error en vista
  // Utilizo el <p> hermano para publicar el error
  //feedbackElement es el siguiente hermano, es decir el P
  feedbackElement.innerText = feedback;
};

let emailValidator = () => {
  // Declaro string vacio que contendra mensaje de error
  let feedback = "";
  // Almaceno elemento hermano(<p>) a input nombre
  let feedbackElement = email.nextElementSibling;

  // Si el usuario no valida sobreescribo feedback
  if (email.value.trim() == "") {
    feedback = "El email no puede estar vacio";
  }

  // Si existe error se almacena en objeto errors
  if (feedback) {
    email.classList.add("error-input");
    errors.email = feedback;
  } else {
    email.classList.remove("error-input");
    delete errors.email;
  }

  // Se imprime string de error en vista
  feedbackElement.innerText = feedback;
};

let passValidator = () => {
  let feedback = "";
  let feedbackElement = pass.nextElementSibling;

  if (pass.value.trim() == "") {
    feedback = "La contraseña no puede estar vacia";
  } 
  

  if (feedback) {
    pass.classList.add("error-input");
    errors.pass = feedback;
  } else {
    pass.classList.remove("error-input");
    delete errors.pass;
  }

  feedbackElement.innerText = feedback;
};

let repasswordValidator = () => {
  let feedback = "";
  let feedbackElement = repassword.nextElementSibling;

  if (repassword.value == "") {
    feedback = "Debes confirmar tu contraseña";
  } else if (repassword.value !== pass.value) {
    feedback = "Las contraseñas no coinciden";
  }

  if (feedback) {
    repassword.classList.add("error-input");
    errors.repassword = feedback;
  } else {
    repassword.classList.remove("error-input");
    delete errors.repassword;
  }

  feedbackElement.innerText = feedback;
};

let rolValidator = () => {
  //validando campo usuario
};

// Ejecuto los oyentes
// Llamo a las funciones

formu.addEventListener("submit", (e) => {
  e.preventDefault();
  firstNameValidator();
  lastNameValidator();
  passValidator();
  repasswordValidator();

  // si existen errores prevent default
  if (Object.keys(errors).length) {
    e.preventDefault();
  } else {
    alert(`Se cargó el nuevo usuario`);
  }
});

// Si focus se sale del input se ejecuta funcion validacion
firstName.addEventListener("blur", firstNameValidator);
lastName.addEventListener("blur", lastNameValidator);

email.addEventListener("blur", emailValidator);
pass.addEventListener("blur", passValidator);
repassword.addEventListener("blur", repasswordValidator);

rol.addEventListener("blur", rolValidator);
