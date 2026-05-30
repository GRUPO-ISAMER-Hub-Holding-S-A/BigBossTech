const container =
    document.getElementById("catalogContainer");

function renderProducto(producto) {

    container.innerHTML += `

    <div class="prod-card">

        <img
        src="${producto.imagen}"
        style="
        width:100%;
        height:280px;
        object-fit:cover;
        border-radius:20px;
        margin-bottom:1rem;
        "
        >

        <span class="pf-badge">
            EN STOCK
        </span>

        <h3 style="margin-top:1rem;">
            ${producto.nombre}
        </h3>

        <p>
            USD ${producto.precio}
        </p>

        <div style="
        display:flex;
        gap:10px;
        margin-top:15px;
        flex-wrap:wrap;
        ">

            <a
            href="producto.html?id=${producto.id}"
            class="btn-primary"
            >
                Ver producto
            </a>

            <button
            class="btn-primary"
            onclick="addToCart(${producto.id})"
            >
                🛒 Agregar
            </button>

        </div>

    </div>

    `;
}

function mostrarProductos(lista) {

    if (!container) return;

    container.innerHTML = "";

    lista.forEach(renderProducto);
}

mostrarProductos(productos);

const buscador =
    document.getElementById("searchInput");

if (buscador) {

    buscador.addEventListener(
        "input",
        filtrarProductos
    );
}

function filtrarProductos() {

    const texto =
        buscador.value.toLowerCase();

    const filtrados =
        productos.filter(producto =>
            producto.nombre
                .toLowerCase()
                .includes(texto)
        );

    mostrarProductos(filtrados);
}

const sort =
    document.getElementById(
        "sortSelect"
    );

if (sort) {

    sort.addEventListener(
        "change",
        ordenarProductos
    );

}
function ordenarProductos() {

    let lista = [...productos];

    if (sort.value === "menor") {

        lista.sort(
            (a, b) =>
                a.precio - b.precio
        );
    }

    if (sort.value === "mayor") {

        lista.sort(
            (a, b) =>
                b.precio - a.precio
        );
    }

    mostrarProductos(lista);
}