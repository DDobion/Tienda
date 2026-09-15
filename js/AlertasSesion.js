/* function validar() {
    var nombreInput = document.getElementById("nombre");
    var correoInput = document.getElementById("correo");
    var h1Bienvenida = document.getElementById("bienvenida");    
    var pErrorNombre = document.getElementById("error-nombre");
    var pErrorCorreo = document.getElementById("error-correo");

    var erCorreo = new RegExp("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    var nombreOK = false;
    var correoOK = false;

    if (nombreInput.value === "") {
        pErrorNombre.innerText = "Debes llenar este campo";
        pErrorNombre.style.background = "red";
        pErrorNombre.style.color = "white";
        nombreOK = false;
    } else if (nombreInput.value.trim().length < 3) {
        pErrorNombre.innerText = "Error: Mínimo 3 caracteres";
        pErrorNombre.style.background = "red";
        pErrorNombre.style.color = "white";
        nombreOK = false;
    } else {
        pErrorNombre.innerText = "Nombre válido";
        pErrorNombre.style.background = "green";
        pErrorNombre.style.color = "white";
        nombreOK = true;
    }

    if (correoInput.value === "") {
        pErrorCorreo.innerText = "Debes llenar este campo";
        pErrorCorreo.style.background = "red";
        pErrorCorreo.style.color = "white";
        correoOK = false;
    } else if (!erCorreo.test(correoInput.value)) {
        pErrorCorreo.innerText = "Error: Formato de correo incorrecto";
        pErrorCorreo.style.background = "red";
        pErrorCorreo.style.color = "white";
        correoOK = false;
    } else {
        pErrorCorreo.innerText = "Correo válido";
        pErrorCorreo.style.background = "green";
        pErrorCorreo.style.color = "white";
        correoOK = true;
    }

    if (nombreOK && correoOK) {
        h1Bienvenida.innerText = "Gracias por registrarte";
        h1Bienvenida.style.color = "#fd6d6d"; 
    }
} */

    /* !basura */


