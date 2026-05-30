function actualizarContadorGlobal(){

const carrito =
JSON.parse(
localStorage.getItem("carrito")
) || [];

const contador =
document.getElementById("cartCount");

if(!contador) return;

const total =
carrito.reduce(
(acc,p)=>
acc + p.cantidad,
0
);

contador.textContent = total;

}

actualizarContadorGlobal();