const orden =
JSON.parse(
    localStorage.getItem(
        "ultimaOrden"
    )
);

const resumen =
document.getElementById(
    "resumen"
);

if(!orden){

    resumen.innerHTML =
    "<h2>No existe orden</h2>";

}else{

    resumen.innerHTML = `

    <div class="prod-card">

        <h3>
            Orden #${orden.id}
        </h3>

        <p>
            Cliente:
            ${orden.customerName}
        </p>

        <p>
            Email:
            ${orden.customerEmail}
        </p>

        <p>
            Total:
            USD ${orden.total}
        </p>

        <p>
            Estado:
            ${orden.status}
        </p>

    </div>

    `;
}