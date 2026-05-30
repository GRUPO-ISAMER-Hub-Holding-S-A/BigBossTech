const params =
    new URLSearchParams(
        window.location.search
    );

const id =
    Number(
        params.get("id")
    );

const producto =
    productos.find(
        p => p.id === id
    );

const container =
    document.getElementById(
        "productDetail"
    );

if (producto) {

    container.innerHTML = `

<div class="product-detail">

    <img
    src="${producto.imagen}"
    style="
    width:100%;
    max-width:500px;
    border-radius:20px;
    "
    >

    <h1>
        ${producto.nombre}
    </h1>

    <h2>
        USD ${producto.precio}
    </h2>

    <p>
        Producto original.
        Garantía incluida.
        Envíos a todo el país.
    </p>

    <div
    style="
    display:flex;
    gap:15px;
    margin-top:20px;
    flex-wrap:wrap;
    "
    >

        <button
        onclick="addToCart(${producto.id})"
        class="btn-primary"
        >
            Agregar al carrito
        </button>

        <a
        href="checkout.html?id=${producto.id}"
        class="btn-primary"
        >
            Comprar ahora
        </a>

    </div>

</div>

`;

}