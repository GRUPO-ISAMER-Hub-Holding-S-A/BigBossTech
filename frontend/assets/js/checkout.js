const form =
document.getElementById("checkoutForm");

form.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const carrito =
        JSON.parse(
            localStorage.getItem("carrito")
        ) || [];



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

        try {



            const response =
            await fetch(
                "http://localhost:3000/orders",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(orden)
                }
            );

            const data =
            await response.json();

            localStorage.setItem(
                "ultimaOrden",
                JSON.stringify(data)
            );

            localStorage.removeItem(
                "carrito"
            );

            window.location.href =
            "resumen.html";

        } catch(error){

            console.error(error);

            alert(
                "Error creando la orden"
            );
        }
    }
);