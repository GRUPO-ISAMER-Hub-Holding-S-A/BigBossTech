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