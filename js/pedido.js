// Crear un objeto de Window
window.onload = function() {
    // Crear un objeto literal
    const baseDatos = [
        {
           id: 1,
           nombre:'Hotdog',
           precio:4000,
           imagen:'/images/hot-dogs.jpg', 
        },
        {
           id: 2,
           nombre:'Hamburguesa',
           precio:5000,
           imagen:'/images/hamburguesa.jpg', 
        },
        {
           id: 3,
           nombre:'Pizza',
           precio:8000,
           imagen:'/images/pizza.jpg', 
        },
    ]
};

//Crear variables del pedido, total, localstorage e items
let pedido = [];
let total = 0;
const DOMitems = document.querySelector('#items');
const DOMpedido = document.querySelector('#pedido');
const DOMtotal = document.querySelector('#total');
const DOMbotonVaciar = document.querySelector('#boton-vaciar');
const mylocalStorage = window.localStorage;

//Crear funciones

/**
 * @params sin parametros, función renderizar los productos, que realiza la captura de los productos que estan en la base de datos
 */

function renderizarProductos() {
    //Recorrer la base de datos con un foreach
    baseDatos.forEach(info => {
        //Estructura 
    });

}
