const carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

const cliente =
    JSON.parse(
        localStorage.getItem("cliente")
    ) || {};

const container =
    document.getElementById("resumenContainer");

let total = 0;

carrito.forEach(producto => {

    total +=
        producto.precio *
        producto.cantidad;

    container.innerHTML += `

    <div class="why-card">

        <h3>
            ${producto.nombre}
        </h3>

        <p>
            Cantidad:
            ${producto.cantidad}
        </p>

        <p>
            USD
            ${producto.precio}
        </p>

    </div>

    `;
});

container.innerHTML += `

<h2>
Total USD ${total}
</h2>

<p>
Cliente:
${cliente.nombre}
</p>

<p>
${cliente.email}
</p>

`;