carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

const container =
    document.getElementById("cartContainer");

const totalDiv =
    document.getElementById("cartTotal");

function renderCart() {

    if (!container) return;

    if (carrito.length === 0) {

        container.innerHTML = `
        <div class="why-card">
            <h3>Tu carrito está vacío</h3>
        </div>
        `;

        totalDiv.innerHTML = "";

        return;
    }

    let total = 0;

    container.innerHTML = "";

    carrito.forEach((producto, index) => {

        total += producto.price * producto.cantidad;

        container.innerHTML += `
<div class="why-card">

    <img
    src="${producto.image}"
    style="
    width:120px;
    border-radius:12px;
    margin-bottom:1rem;
    "
    >

    <h3>
        ${producto.name}
    </h3>

    <p>
        Precio unitario:
        USD ${producto.price}
    </p>

    <div
    style="
    display:flex;
    align-items:center;
    gap:10px;
    margin-top:1rem;
    "
    >

        <button
        onclick="restarCantidad(${index})"
        class="btn-primary"
        >
            -
        </button>

        <span>
            Cantidad: ${producto.cantidad}
        </span>

        <button
        onclick="sumarCantidad(${index})"
        class="btn-primary"
        >
            +
        </button>

    </div>

    <p
    style="
    margin-top:1rem;
    font-weight:bold;
    "
    >
        Subtotal:
        USD ${producto.price * producto.cantidad}
    </p>

    <button
    onclick="eliminarProducto(${index})"
    class="btn-primary"
    style="
    margin-top:1rem;
    background:red;
    "
    >
        Eliminar
    </button>

</div>
`;
    });

    totalDiv.innerHTML = `
    <h2>
        Total USD ${total}
    </h2>
    `;
}

function guardar() {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    actualizarContador();
}

function sumarCantidad(index) {

    carrito[index].cantidad++;

    guardar();

    renderCart();
}

function restarCantidad(index) {

    if (carrito[index].cantidad > 1) {

        carrito[index].cantidad--;

    } else {

        carrito.splice(index, 1);
    }

    guardar();

    renderCart();
}

function eliminarProducto(index) {

    carrito.splice(index, 1);

    guardar();

    renderCart();
}

renderCart();

function actualizarContador() {

    const contador =
        document.getElementById("cartCount");

    if (!contador) return;

    const total =
        carrito.reduce(
            (acc, p) =>
                acc + p.cantidad,
            0
        );

    contador.textContent = total;
}


renderCart();
actualizarContador();


function vaciarCarrito() {

    const confirmar =
        confirm(
            "¿Vaciar carrito?"
        );

    if (!confirmar) return;

    carrito = [];

    guardar();

    renderCart();

}