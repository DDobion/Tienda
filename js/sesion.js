

function verificarSesion() {
    const sesion = localStorage.getItem("sesion"); 
    const btnCarro = document.getElementById("btn-carro");
    const enlaceSesion = document.getElementById("enlace-sesion");
    
    // Seleccionamos el bloque del menú de navegación central (<nav>)
    const navPrincipal = document.querySelector(".navbar nav");

    // 1. Control del Carrito (Solo visible para clientes)
    if (btnCarro) {
        if (sesion === "cliente") {
            btnCarro.style.display = ""; 
        } else {
            btnCarro.style.display = "none"; 
        }
    }

    // 2. Control del menú central (Inicio, Nosotros, Catálogo, Contacto) y el enlace de sesión
    if (enlaceSesion) {
        if (sesion === "cliente") {
            if (navPrincipal) navPrincipal.style.display = ""; // Muestra el menú normal
            enlaceSesion.style.display = "";
            enlaceSesion.textContent = "Mi cuenta";
            enlaceSesion.href = "cuenta.html";
        } else if (sesion === "admin") {
            // Si es administrador, ocultamos el menú de navegación general para dejar la barra limpia
            if (navPrincipal) navPrincipal.style.display = "none";
            
            enlaceSesion.style.display = "";
            enlaceSesion.textContent = "Panel Admin"; // Muestra exactamente "Panel Admin"
            enlaceSesion.href = "admin.html";
        } else {
            if (navPrincipal) navPrincipal.style.display = "";
            enlaceSesion.style.display = "";
            enlaceSesion.textContent = "Iniciar sesión";
            enlaceSesion.href = "Sesion.html";
        }
    }
}


function cerrarSesion() {
    localStorage.removeItem("sesion");
    window.location.href = "Sesion.html";
}


function protegerRuta(rolRequerido) {
    const sesion = localStorage.getItem("sesion");

    if (!sesion) {
        window.location.href = "Sesion.html";
        return;
    }

    if (rolRequerido && sesion !== rolRequerido) {
        if (sesion === "cliente") {
            window.location.href = "cuenta.html";
        } else if (sesion === "admin") {
            window.location.href = "admin.html";
        }
    }
}


document.addEventListener("DOMContentLoaded", () => {
    const navbarContenedor = document.getElementById("navbar");
    const footerContenedor = document.getElementById("footer");

    
    if (navbarContenedor) {
        fetch("navbar.html")
            .then(res => res.text())
            .then(html => {
                navbarContenedor.innerHTML = html;
                verificarSesion(); 
            })
            .catch(() => {});
    } else {
        verificarSesion();
    }

    // Carga automática del footer si existe <div id="footer">
    if (footerContenedor) {
        fetch("footer.html")
            .then(res => res.text())
            .then(html => {
                footerContenedor.innerHTML = html;
            })
            .catch(() => {});
    }
});