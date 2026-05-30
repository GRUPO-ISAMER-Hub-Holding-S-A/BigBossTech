let carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

function addToCart(id){

    const producto =
    productos.find(
        p => p.id === id
    );

    const existente =
    carrito.find(
        p => p.id === id
    );

    if(existente){

        existente.cantidad++;

    }else{

        carrito.push({
            ...producto,
            cantidad:1
        });

    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    actualizarContador();
}


function actualizarContador(){

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

actualizarContador();