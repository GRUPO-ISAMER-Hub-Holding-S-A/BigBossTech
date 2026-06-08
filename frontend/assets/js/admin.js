const API = "http://localhost:3000";

async function loadProducts() {

    const response = await fetch(`${API}/products`);

    const products = await response.json();

    const table = document.getElementById("productsTable");

    table.innerHTML = "";

    products.forEach(product => {

        table.innerHTML += `
        <tr>

            <td>${product.name}</td>

            <td>${product.price}</td>

            <td>${product.stock}</td>

            <td>

                <button onclick="deleteProduct('${product.id}')">
                    Eliminar
                </button>

            </td>

        </tr>
        `;
    });

}

async function deleteProduct(id) {

    await fetch(
        `${API}/admin/products/${id}`,
        {
            method: "DELETE"
        }
    );

    loadProducts();

}

document
    .getElementById("productForm")
    .addEventListener("submit", async (e) => {

        e.preventDefault();

        const product = {

            name: document.getElementById("name").value,

            description: document.getElementById("description").value,

            price: Number(
                document.getElementById("price").value
            ),

            image: document.getElementById("image").value,

            stock: Number(
                document.getElementById("stock").value
            ),

            category: document.getElementById("category").value
        };

        const token = localStorage.getItem("token");

        const res = await fetch(
            `${API}/admin/products`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(product)
            }
        );

        if (!res.ok) {

            const error = await res.text();

            console.error(error);

            throw new Error("Error creando producto");
        }

        alert("Producto creado correctamente");

        document
            .getElementById("productForm")
            .reset();

        loadProducts();

    });

loadProducts();