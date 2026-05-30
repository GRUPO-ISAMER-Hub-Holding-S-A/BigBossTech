const form =
document.getElementById("checkoutForm");

form.addEventListener(
    "submit",
    (e)=>{
        e.preventDefault();

        const cliente = {

            nombre:
            document.getElementById("nombre").value,

            email:
            document.getElementById("email").value,

            telefono:
            document.getElementById("telefono").value

        };

        localStorage.setItem(
            "cliente",
            JSON.stringify(cliente)
        );

        window.location.href =
        "resumen.html";
    }
);


const orden = {

    nombre:
    document.getElementById("nombre").value,

    email:
    document.getElementById("email").value,

    telefono:
    document.getElementById("telefono").value,

    provincia:
    document.getElementById("provincia").value,

    localidad:
    document.getElementById("localidad").value,

    codigoPostal:
    document.getElementById("codigoPostal").value,

    calle:
    document.getElementById("calle").value,

    altura:
    document.getElementById("altura").value,

    piso:
    document.getElementById("piso").value,

    departamento:
    document.getElementById("departamento").value,

    referencia:
    document.getElementById("referencia").value,

    productos: carrito
};