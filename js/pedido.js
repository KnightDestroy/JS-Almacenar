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

//Crear variables del pedido, total, localstorage e items
let Pedido = [];
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
        //Estructura para crear los elementos para el HTML
         const  miNodo = document.createElement('div');
         miNodo.classList.add('card','col-sm-4');
         //Body
         const miNodoCardBody = document.createElement('div');
         miNodoCardBody.classList.add('card-body');
         //Titulo
         const miNodoTitulo = document.createElement('h5');
         miNodoTitulo.classList.add('card-tittle');
         //Llamar de la base de datos el Titulo
         miNodoTitulo.textContent = info.nombre;
         //Imagen
         const miNodoImage = document.createElement('img');
         miNodoImage.classList.add('img-fluid');
         //Llamar la imagen de la Base de Datos
         miNodoImage.setAttribute('src', info.imagen);
         //Precio
         const miNodoPrecio = document.createElement('p');
         miNodoPrecio.classList.add('card-text');
         //Llamar el precio de la Base de Datos
         miNodoPrecio.textContent = '$' + info.precio;

         //Botón y su Evento
         const miNodoBoton = document.createElement('button');
         miNodoBoton.classList.add('btn','btn-primary');
         miNodoBoton.textContent = 'Agregar';
         miNodoBoton.setAttribute('marcador',info.id);
         miNodoBoton.addEventListener('click',agregarProductoP);

         //Insertar los elementos de la Base de Datos a sus respectivas etiquetas HTML
         miNodoCardBody.appendChild(miNodoImage);
         miNodoCardBody.appendChild(miNodoTitulo);
         miNodoCardBody.appendChild(miNodoPrecio);
         miNodoCardBody.appendChild(miNodoBoton);
         miNodo.appendChild(miNodoCardBody);
         DOMitems.appendChild(miNodo);
         
    });

}

//Crear la función para el botón con su evento click, para agregar los productos al pedido
/**
 * 
 * @param {eventoClick} evento click para el boton agregar
 */

function agregarProductoP(evento) {
    //Tener  presente la etiqueta ul con id=pedido, en el index, para agregar el producto
    Pedido.push(evento.target.getAttribute('marcador'));
    //Calcular el Total
    calcularTotal();
    //Pedido
    renderizarPedidos();
    //Guardar en el LocalStorage
    guardarPedidoLocalStorage();
} 

//Crear la función para el Pedido
function renderizarPedidos() {
    //Limpiar todo los items en el HTML
    DOMpedido.textContent = ''; 
    //Quitar los duplicados
    const PedidoSinDuplicados = [...new Set(Pedido)];
    //Generar el pedido de acuerdo a los items
    PedidoSinDuplicados.forEach((item) => {
        //Obtenemos los items de la Base de Datos
        const miItem = baseDatos.filter((itemBaseDatos) =>{
            return itemBaseDatos.id === parseInt(item);
        });
        //Contar la cantidad de veces que se repite el producto
        const numeroUnidadesItem = Pedido.reduce((total, itemId) => {
            //Si coinciden los ID, incremento
            return itemId === item ? total += 1 : total;
        }, 0);
        //Crear la lista de los Items del Pedido
        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].nombre} - ${miItem[0].precio}`;
        //Botón
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item;
        miBoton.addEventListener('click',borrarItemPedido);
        
        miNodo.appendChild(miBoton);
        DOMpedido.appendChild(miNodo);
        
    });
}

//Función Calcular Total del Pedido

function calcularTotal() {
    //Vaciar el Total Anterior
    total = 0;
    //Recorrer el array del pedido
    Pedido.forEach((item) =>{
        //De cada elemento obtener el precio
        const miItem = baseDatos.filter((itemBaseDatos)=>{
        //Retornar el Valor
        return itemBaseDatos.id === parseInt(item);
        });
        //Se hace el calculo
        total = total + miItem[0].precio;
    });

    //Imprimir el total
    DOMtotal.textContent = total.toFixed(2);

}

//Guardar en el localstorage
function guardarPedidoLocalStorage() {
    mylocalStorage.setItem('Pedido', JSON.stringify(Pedido));
}

//Cargar pedido en el localstorage
function cargarLocalStorage() {
    if (mylocalStorage.getItem('Pedido') !== null) {
        //Cargar la Información
        Pedido = JSON.parse(mylocalStorage.getItem('Pedido'));
    }
};

//Borrar Item del Pedido
function borrarItemPedido(evento){
    const id = evento.target.dataset.item;
    //Filtrar
    Pedido = Pedido.filter((PedidoId) =>{
        return PedidoId !== id;
    });

    //Llamar el Pedido
    renderizarPedidos();
    //Calculo
    calcularTotal();
    //Actualizar el LocalStorage
    guardarPedidoLocalStorage();
}

//Vaciar el Pedido
function vaciarPedidos() {
    //Limpiar todos los productos solicitados
    Pedido = [];
    //Renderizar el pedido
    renderizarPedidos();
    calcularTotal();
    //Borrar el LocalStorage
    localStorage.clear();

}

//Evento
DOMbotonVaciar.addEventListener('click', vaciarPedidos);

//Llamar las funciones
cargarLocalStorage();
renderizarProductos();
calcularTotal();
renderizarPedidos();

};
