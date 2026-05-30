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

if(!producto){

container.innerHTML = `
<h2>
Producto no encontrado
</h2>
`;

}else{

container.innerHTML = `

<div class="product-page">

    <div class="product-image">

        <img
        src="${producto.imagen}"
        alt="${producto.nombre}"
        >

    </div>

    <div class="product-info">

        <span class="pf-badge">
            EN STOCK
        </span>

        <h1>
            ${producto.nombre}
        </h1>

        <h2>
            USD ${producto.precio}
        </h2>

        <p>
            ${producto.descripcion}
        </p>

        <div class="product-data">

            <p>
                Stock disponible:
                ${producto.stock}
            </p>

            <p>
                Garantía:
                30 días
            </p>

            <p>
                Envíos:
                Todo Argentina
            </p>

            <p>
                Pago:
                Transferencia / Efectivo / Mercado Pago
            </p>

        </div>

        <div class="product-actions">

            <button
            class="btn-primary"
            onclick="addToCart(${producto.id})"
            >
                🛒 Agregar al carrito
            </button>

            <a
            href="checkout.html?id=${producto.id}"
            class="btn-primary"
            >
                Comprar ahora
            </a>

        </div>

    </div>

</div>

`;

}