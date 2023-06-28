let productos = [
    {id:"1",nombre:"Auricular LOGITECH G335",tipo:"auriculares",precio:46740,imagen:"../img/auriculares/a1.png"},
    {id:"2",nombre:"Auricular REDRAGON Zeus X H510",tipo:"auriculares",precio:50566,imagen:"../img/auriculares/a2.jpg"},
    {id:"3",nombre:"Auricular RAZER Kraken X Lite",tipo:"auriculares",precio:51250,imagen:"../img/auriculares/a3.webp"},
    {id:"4",nombre:"Auricular LOGITECH Astro A10",tipo:"auriculares",precio:55350,imagen:"../img/auriculares/a4.jpg"},
    {id:"5",nombre:"Auricular LOGITECH G435",tipo:"auriculares",precio:62642,imagen:"../img/auriculares/a5.jpeg"},
    {id:"6",nombre:"Auricular COOLERMASTER MH670",tipo:"auriculares",precio:7112,imagen:"../img/auriculares/a6.jpg"},
    {id:"7",nombre:"Auricular HYPERX Cloud Stinger",tipo:"auriculares",precio:83695,imagen:"../img/auriculares/a7.webp"},
    {id:"8",nombre:"Auricular HYPERX Cloud II Black",tipo:"auriculares",precio:83695,imagen:"../img/auriculares/a8.jpg"},
    {id:"9",nombre:"Teclado REDRAGON Dragonborn",tipo:"teclado",precio:30304,imagen:"../img/teclados/t1.png"},
    {id:"10",nombre:"Teclado REDRAGON Shrapnel",tipo:"teclado",precio:34525,imagen:"../img/teclados/t2.jpg"},
    {id:"11",nombre:"Teclado REDRAGON Kumara K552",tipo:"teclado",precio:35158,imagen:"../img/teclados/t3.png"},
    {id:"12",nombre:"Teclado LOGITECH K835",tipo:"teclado",precio:39000,imagen:"../img/teclados/t4.png"},
    {id:"13",nombre:"Teclado REDRAGON Deimos",tipo:"teclado",precio:46125,imagen:"../img/teclados/t5.png"},
    {id:"14",nombre:"Teclado REDRAGON Draconic",tipo:"teclado",precio:47080,imagen:"../img/teclados/t6.png"},
    {id:"15",nombre:"Teclado REDRAGON Magic-Wand",tipo:"teclado",precio:47951,imagen:"../img/teclados/t7.png"},
    {id:"16",nombre:"Mouse LOGITECH G203",tipo:"mouse",precio:18695,imagen:"../img/mouses/m1.jpg"},
    {id:"17",nombre:"Mouse COOLERMASTER MM711",tipo:"mouse",precio:18817,imagen:"../img/mouses/m2.png"},
    {id:"18",nombre:"Mouse REDRAGON Storm Elite",tipo:"mouse",precio:18963,imagen:"../img/mouses/m3.jpg"},
    {id:"19",nombre:"Mouse VSG Aquila Air",tipo:"mouse",precio:21238,imagen:"../img/mouses/m4.png"},
    {id:"20",nombre:"Mouse RAZER Deathadder V2",tipo:"mouse",precio:23709,imagen:"../img/mouses/m5.jpg"}
]
const botonVaciar = document.getElementById("vaciarCarrito")
const contCarrito = document.getElementById("contenedorCarrito")
const contenedorProductos = document.getElementById("contenedorProductosHTML")
const precioTotal = document.getElementById("precioCarrito")
let carrito = []
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("carrito")){
        carrito = JSON.parse(localStorage.getItem("carrito"))
        actualizarCarrito()
    }
})
botonVaciar.addEventListener("click", () => {
    carrito.length=0
    actualizarCarrito()
})
productos.forEach((p) => {
    const div = document.createElement("div")
    div.classList.add("producto", "col-lg-3",)
    div.innerHTML = `
    <div class="cardContent">
        <img class="card-img-top" src=${p.imagen} alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p class="precioProducto">AR$ ${p.precio}</p>
        <button id="add${p.id}" class="btnCarrito">Agregar al carrito</button>
    </div>
    `
    contenedorProductos.appendChild(div)
    const boton = document.getElementById(`add${p.id}`)
    boton.addEventListener("click", () => {
        agregarCarrito(p.id)
    })
})
const agregarCarrito = (prodId) => {
   const item = productos.find((p) => p.id === prodId)
   carrito.push(item)
   actualizarCarrito()
}
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((p) => p.id === prodId)
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)
    actualizarCarrito()
}
const actualizarCarrito = () => {
    contCarrito.innerHTML = ""
    carrito.forEach ((p) => {
        const div = document.createElement("div")
        div.className = ("productoEnCarrito", "d-flex")
        div.innerHTML = `
        <p class="nombreProd">${p.nombre}</p>
        <div class="d-flex align-items-center">
            <p class="precio">AR$ ${p.precio}</p>
            <button class="btnProd" onclick="eliminarDelCarrito(${p.id})" class="btnEliminar"><img width="20" height="20" src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="delete-sign--v1"/></button>
        </div>
        `
        contCarrito.appendChild(div)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    })
    precioTotal.innerText = carrito.reduce((acc, p) => acc + p.precio, 0)
}