const botonVaciar = document.getElementById("vaciarCarrito")
const botonFinalizar = document.getElementById("finalizarCarrito")
const contCarrito = document.getElementById("contenedorCarrito")
const precioTotal = document.getElementById("precioCarrito")
const contadorProd = document.getElementById("contador")
const catalogo = document.querySelector("#containerCatalogo")
let url = "./pages/finalizar-compra.html"
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
fetch("./productos.json")
.then((res)=>res.json())
.then((data)=>{
    data.forEach((p) => {
        const div = document.createElement("div")
        div.classList.add("producto", "col-lg-3",)
        div.innerHTML = `
        <div class="card">
            <div class="card__content">
                <div class="card__content__img">    
                    <img class="card-img-top" src=${p.imagen} alt="${p.nombre}">
                </div>
                <h3 class="mt-3">${p.nombre}</h3>
                <p class="precioProducto">AR$ ${p.precio}</p>
                <button id="add${p.id}" class="btnCarrito">AGREGAR AL CARRITO</button>
            </div>
        </div>
        `
        catalogo.appendChild(div)
        const boton = document.getElementById(`add${p.id}`)
        boton.addEventListener("click", () => {             
            agregarCarrito(p.id)
        })
    })
    const agregarCarrito = (prodId) => {
        const item = data.find((p) => p.id === prodId)
        const existe = carrito.some(p => p.id === prodId)
        if(existe){
            const products = carrito.map(p =>{
                if(p.id === prodId){   
                p.cantidad++
                return p
            }else{
                return p
            }
            })
        }else{
            carrito.push(item)
        }
        actualizarCarrito()
    }
})

const eliminarDelCarrito = (prodId) => {
    const item = carrito.find(p => Number(p.id) === prodId)
    const indice = carrito.indexOf(item)
    if(item.cantidad > 1){
        item.cantidad--
    }else{
        carrito.splice(indice, 1)
    }
    actualizarCarrito()
}

const actualizarCarrito = () => {
    contCarrito.innerHTML = ""
    carrito.forEach ((p) => {
        const div = document.createElement("div")
        div.innerHTML = `
        <div class="productoEnCarrito d-flex justify-content-between mt-4 mb-4">
            <div class="me-5">
                <p class="nombreProd">${p.nombre}</p>
                <p class="cantidad">${p.cantidad}</p>
                <p class="precio">AR$ ${p.precio}</p>
            </div>
            <button class="btnProd" onclick="eliminarDelCarrito(${p.id})" class="btnEliminar"><img width="20" height="20" src="https://img.icons8.com/ios-filled/50/delete-sign--v1.png" alt="delete-sign--v1"/></button>
        </div>
        `
        contCarrito.appendChild(div)
        localStorage.setItem("carrito", JSON.stringify(carrito))
    })
    precioTotal.innerText = carrito.reduce((acc, p) =>{
        return acc + (Number(p.precio) * Number(p.cantidad))
    }, 0)
    let totalProductos = 0
    carrito.forEach((p)=>{
        totalProductos = totalProductos + Number(p.cantidad)
    }) 
    contadorProd.innerText = totalProductos
}
botonFinalizar.addEventListener("click", () =>{
    if(carrito.length > 0) {
        swal("FINALIZAR COMPRA","RECIBIRA UN MAIL CON LAS INSTRUCCIONES",{
            content: {
                element: "input",
                attributes: {
                    placeholder: "INGRESE SU EMAIL",
                    type: "email",
                    color: "black",
                }
            },
            button: {
                text: "CONTINUAR",
            },
            
        })
        .then((value) => {
            swal("GRACIAS POR ELEGIRNOS",
                `FINALICE SU COMPRA DESDE EL EMAIL ENVIADO A ${value.toUpperCase()}`,
                {button: {
                    text: "SEGUIR COMPRANDO",
                },
                });
        });          
        carrito.length=0
        actualizarCarrito()
    }
})
  