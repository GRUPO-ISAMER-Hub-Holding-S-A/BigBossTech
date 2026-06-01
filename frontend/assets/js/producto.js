const params =
new URLSearchParams(
    window.location.search
);

const id =
params.get("id");

const container =
document.getElementById(
    "productDetail"
);

async function cargarProducto(){

    try{

        const response =
        await fetch(
            `http://localhost:3000/products/${id}`
        );

        const producto =
        await response.json();

        renderProducto(producto);

        cargarRelacionados(producto.id);

    }catch(error){

        console.error(error);

        container.innerHTML = `
        <h2>
            Error cargando producto
        </h2>
        `;
    }
}

function renderProducto(producto){

    container.innerHTML = `

<div class="product-page">

    <div class="product-image">

        <img
        src="${producto.image}"
        alt="${producto.name}"
        >

    </div>

    <div class="product-info">

        <span class="pf-badge">
            STOCK: ${producto.stock}
        </span>

        <h1>
            ${producto.name}
        </h1>

        <h2>
            USD ${producto.price}
        </h2>

        <p>
            ${producto.description}
        </p>

        <div class="product-data">

            <p>
                Garantía: 30 días
            </p>

            <p>
                Envíos a todo Argentina
            </p>

            <p>
                Mercado Pago disponible
            </p>

        </div>

        <div class="product-actions">

            <button
            class="btn-primary"
            onclick="addToCart('${producto.id}')"
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

<section style="margin-top:60px">

    <h2>
        Productos relacionados
    </h2>

    <div
    id="relatedProducts"
    class="prod-grid"
    >
    </div>

</section>

`;
}

async function cargarRelacionados(idActual){

    try{

        const response =
        await fetch(
            "http://localhost:3000/products"
        );

        const productos =
        await response.json();

        const relacionados =
        productos
        .filter(
            p => p.id !== idActual
        )
        .slice(0,3);

        const relatedContainer =
        document.getElementById(
            "relatedProducts"
        );

        relacionados.forEach(prod=>{

            relatedContainer.innerHTML += `

<div class="prod-card">

    <img
    src="${prod.image}"
    style="
    width:100%;
    height:280px;
    object-fit:cover;
    border-radius:20px;
    "
    >

    <h3>
        ${prod.name}
    </h3>

    <p>
        USD ${prod.price}
    </p>

    <a
    href="producto.html?id=${prod.id}"
    class="btn-primary"
    >
        Ver producto
    </a>

</div>

`;
        });

    }catch(error){

        console.error(error);
    }
}

cargarProducto();