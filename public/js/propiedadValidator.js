let errors = {};

const formu = document.getElementById("formulario");
const propietario = document.getElementById("propietario");
const precio = document.getElementById("precio");
const zona = document.getElementById("zona");

const status = document.getElementById("status");
const tipoVivienda = document.getElementById("tipoVivienda");

// Declaro las Funciones

let propietarioValidator = () => {
  // Declaro string vacio que contendra mensaje de error
  let feedback = "";
  // Almaceno elemento hermano(<p>) a input nombre, hay un p al final
  let feedbackElement = propietario.nextElementSibling;

  // Si el nombre no valida sobreescribo feedback
  if (propietario.value.trim() == "") {
    feedback = "El nombre no puede estar vacio";
  } else if (propietario.value.length < 5) {
    feedback = "El nombre no puede tener menos de 5 caracteres";
  }

  // Si existe error se almacena en objeto errors
  if (feedback) {
    propietario.classList.add("error-input");
    errors.firstName = feedback;
  } else {
    propietario.classList.remove("error-input");
    delete errors.propietario;
  }

  // Se imprime string de error en vista
  // Utilizo el <p> hermano para publicar el error
  //feedbackElement es el siguiente hermano, es decir el P
  feedbackElement.innerText = feedback;
};

let precioValidator = () => {
  // Declaro string vacio que contendra mensaje de error
  let feedback = "";
  // Almaceno elemento hermano(<p>) a input nombre, hay un p al final
  let feedbackElement = precio.nextElementSibling;

  // Si el nombre no valida sobreescribo feedback
  if (precio.value.trim() == "") {
    feedback = "El precio no puede  estar vacio";
  } else if (precio.value <= 0) {
    feedback = "El precio no puede ser menor a cero";
  }

  // Si existe error se almacena en objeto errors
  if (feedback) {
    precio.classList.add("error-input");
    errors.precio = feedback;
  } else {
    precio.classList.remove("error-input");
    delete errors.precio;
  }

  // Se imprime string de error en vista
  // Utilizo el <p> hermano para publicar el error
  //feedbackElement es el siguiente hermano, es decir el P
  feedbackElement.innerText = feedback;
};

let emailValidator = () => {
  //validando campo usuario
};

let zonaValidator = () => {
  //validando campo usuario
};

let statusValidator = () => {
  //validando campo usuario
};

let tipoViviendaValidator = () => {
  //validando campo usuario
};

// Ejecuto los oyentes
// Llamo a las funciones

formu.addEventListener("submit", (e) => {
  e.preventDefault();
  propietarioValidator();
  precioValidator();

  // si existen errores prevent default
  if (Object.keys(errors).length) {
    e.preventDefault();

  } else {
    alert(`Se cargó el nuevo propiedad`);
  }  
});

// Si focus se sale del input se ejecuta funcion validacion
propietario.addEventListener("blur", propietarioValidator);
precio.addEventListener("blur", precioValidator);
status.addEventListener("blur", statusValidator);
zona.addEventListener("blur", zonaValidator);

tipoVivienda.addEventListener("blur", tipoViviendaValidator);
