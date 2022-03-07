window.onload = () => {

//----------------ZONA DE DEFINICION DE FUNCIONES ---------------
  // Esta función, atrapa las secciones del Html, ventas y alquiler
  // Lee la base de datos del Json 
  // Crea dinámicamente el artículo en Html para
  // Inyecta en cada sección según corresponda los artículos
  function listarTodo() {
    // Atrapo las secciones del HTML

    let articuloVenta = document.getElementById("seccionVentas");

    let articuloAlquiler = document.getElementById("seccionAlquiler");

    // leo asíncronamente el archivo en disco en formato json
    // Uso fetch para leerlo con la precuación de usar los 2 then.
    // el primero me parsea a formato javascript
    // el segundo itero cada elemento del array
    // con el armo los CARD que se inyectan en las secciones
    // correspondientes del Html

    fetch("datos.json")
      .then((respuesta) => respuesta.json()) //Indicamos el formato en que se desea obtener la información
      .then((respuestaJs) => {
        let arrayProductos = respuestaJs;

        let articuloEnHtml = " ";
        arrayProductos.forEach((producto) => {
          articuloEnHtml = `
          <article class="articulo">
         
            
            <img class="card-foto" src="${producto.imagen}" alt="" />
            <input 
            type="hidden" 
              class = "propiedadId"
             name="idPropiedad"
           id="idPropiedad" 
           value="${producto.id}"/>


            <h3>${producto.zona}</h3>
            <h2>${producto.precio}</h2>
            <p> ${producto.Descripcion}</p>
            <div class="footer-card">
              <a class="vinculo" href="propiedadesDetail.html?zona=${producto.zona}
              &descripcion=${producto.Descripcion}"
                >Ver Más<i class="fas fa-angle-double-right"></i
              ></a>
         
                <i class="fas fa-shopping-cart carrito-logo"  ></i>
              
    
              <i id="corazon" class="fas fa-heart"></i>
            </div>
            
        </article>
    
         `
       //  document.querySelector('.carrito-logo').dataset.id = producto.id
         ;



          if (producto.status === "venta") {
            articuloVenta.innerHTML += articuloEnHtml
          } else {
            articuloAlquiler.innerHTML += articuloEnHtml;
          }
        });
      }) // Aquí mostramos dicha información

      .catch((error) => console.log("Hubo un error : " + error.message));
  }

  //-----------------FUNCIONES PARA EL CARRITO --------------------
  //----AgregarAlCarrito, recibe un evento que lo origina por click
  // es decir si hacemos click en cualquier posición del artículo de la´
  // sabremos quién lo origina. Fundamentalmente queremos conocer que el evento 
  // que lo origina pertenece a la clase carrito-logo"
  // ESTO NOS INDICA QUE SE HIZO CLICK EN EL LOGO DEL CARRITO 
  // existen 2 niveles de pader para llegar a Articulo 
function agregarAlCarrito(e){

    console.log(e.target)
    // devuelve verdadero o falso según el click que haga el
    // como el carrito tiene la clase logo devuelve true
    if (e.target.classList.contains("carrito-logo")) {
        // Si pincho en el logo me muestr quien es mi papá
        // hay que subir en la jerrquía, me muestra Articulo
      //  console.log(e.target.parentElement.parentElement)
    //    console.log("despues de paren de paretn")
        // agrego un item paraunItemAlCarrito
        unItemAlCarrito(e.target.parentElement.parentElement)

    }

    e.stopPropagation();
   
}

// -----FUNCION unItemAlCarrito
// Se recibe el html de Articulo
function unItemAlCarrito(objeto){
  //  console.log("estoy agregando un item al carrito")
console.log(objeto)
console.log("AGrego un item")
//Armamos un registro auxiliar mellizo del carrito de compras
// Cargamos los valores de sus propiedades
const producto = {

  id: objeto.querySelector(".propiedadId").value,
  precio: objeto.querySelector("h2").textContent,
  zona: objeto.querySelector("h3").textContent,
  descripcion: objeto.querySelector("p").textContent,
  cantidad: 1
}
// pregunto si existe esa clave para que sume una unidad
// como la primera vez no hay nada en el carrito no se suma nada
   if (carrito.hasOwnProperty(producto.id) ) {
    producto.cantidad = carrito[producto.id].cantidad +1
   }  

   //Copio del array auxiliar en ráfaga al carrito
   // Recordamos que carrito estaba vacío
   carrito[producto.id] = {...producto}  
   console.log(carrito)

// Grabo en localStorage el carrito, pasándolo a Json
localStorage.setItem('carritoClave', JSON.stringify(carrito))
// FALTA PASAR LOS DATOSDEL CARRITO AL HTML

}


  //--------Comienza el flujo de instrucciones
  //-----------------------------------------------------------
   // creo el objeto literal en blanco, luego inyectaré sus atributos
   let carrito = {

  }
  
  // Preguntamos si existe la clave carrito en el localstorage
// la primera vez es obvio que dará false, porque no compré nada
  if (localStorage.getItem('carritoClave')) {
    // leo y convierto a JS y se cargan los datos grabados
    carrito = JSON.parse(localStorage.getItem('carritoClave'))
    console.log(carrito)
  }
 

  //-----------LLAMADA PRINCIPAL
  // -- Acá se lee la base de datos y se inyecta dinámicamente el html
  // Se espera las acciones del usuario
   // creo el objeto literal en blanco, luego inyectaré sus atributos
  listarTodo();
 

 
// atrapo el elemento
  let articuloVenta = document.getElementById("seccionVentas");
//console.log(articuloVenta)
//console.log("despues de articulo")
// creo un oyente para cuando haga un click en el carrito
articuloVenta.addEventListener("click", e => agregarAlCarrito(e));
};
