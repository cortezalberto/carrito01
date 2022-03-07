window.onload = () => {
  let carrito = {

  }
  // Preguntamos si existe la clave carrito en el localstorage

  if (localStorage.getItem('carritoClave')) {
    // leo y convierto a JS y se cargan los datos grabados
    carrito = JSON.parse(localStorage.getItem('carritoClave'))
    console.log(carrito)
  }
  // Acá desarrollaré todos las funciones del sitio
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
  //--------------------------------------------------------
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

function unItemAlCarrito(objeto){
  //  console.log("estoy agregando un item al carrito")
console.log(objeto)
console.log("Grego un item")
//console.log(unItem.document.getquerySelector("h3"))
const producto = {

  id: objeto.querySelector(".propiedadId").value,
  precio: objeto.querySelector("h2").textContent,
  zona: objeto.querySelector("h3").textContent,
  descripcion: objeto.querySelector("p").textContent,
  cantidad: 1
}
// pregunto si existe esa clave para que sume una unidadr
   if (carrito.hasOwnProperty(producto.id) ) {
    producto.cantidad = carrito[producto.id].cantidad +1
   }  

   //Copio del array auxiliar en ráfaga al carrito
   carrito[producto.id] = {...producto}  
   console.log(carrito)
// Grabo en localStorage el carrito
localStorage.setItem('carritoClave', JSON.stringify(carrito))
}


  //-----------LLAMADA PRINCIPAL
  // -- Acá se lee la base de datos y se inyecta dinámicamente el html
  // Se espera las acciones del usuario
  listarTodo();
 

 
// atrapo el elemento
  let articuloVenta = document.getElementById("seccionVentas");
//console.log(articuloVenta)
//console.log("despues de articulo")
// creo un oyente para cuando haga un click en el carrito
articuloVenta.addEventListener("click", e => agregarAlCarrito(e));
};
