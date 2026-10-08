document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("gridProductos");
    const avisoVacio = document.getElementById("catalogoVacio");
    const botonesFiltro = document.querySelectorAll(".filtro");

    let catalogoProductos = [];

    /* Tarjeta de producto */
    function crearTarjetaHTML(item) {
        const article = document.createElement("article");
        article.className = "tarjeta-producto";
        article.dataset.categoria = item.categoria;

        const imagenPrincipal = item.imagen || (item.imagenes && item.imagenes.length > 0 ? item.imagenes[0] : "");
        const urlDetalle = `producto.html?id=${encodeURIComponent(item.id)}`;
        
        // Validación de oferta
        const tieneOferta = item.oferta === true;

        article.innerHTML = `
            <div class="tarjeta-imagen" style="position: relative;">
                ${tieneOferta ? `<span class="cartel-oferta-catalogo">OFERTA ESPECIAL</span>` : ''}
                <a href="${urlDetalle}" style="display: block; width: 100%; height: 100%;">
                    <img src="${imagenPrincipal}" alt="${item.nombre}" loading="lazy" onerror="this.src='img/productos/ad/espadon.jpg'">
                </a>
            </div>
            <div class="tarjeta-info">
                <small class="tarjeta-categoria">${item.categoriaTexto}</small>
                <h3 class="tarjeta-nombre">
                    <a href="${urlDetalle}">${item.nombre}</a>
                </h3>
                <p class="tarjeta-descripcion">
                    ${item.descripcionCorta || item.descripcion}
                </p>
                <div class="tarjeta-pie">
                    <span class="tarjeta-precio">${item.precio}</span>
                    <a href="${urlDetalle}" class="tarjeta-detalle">Ver detalle →</a>
                </div>
            </div>
        `;
        return article;
    }

    /* Filtro por categoría */
    function filtrarPorCategoria(categoria) {
        const tarjetas = grid.querySelectorAll(".tarjeta-producto");
        let contadorVisibles = 0;

        tarjetas.forEach(tarjeta => {
            const coincide = (categoria === "todos" || tarjeta.dataset.categoria === categoria);
            tarjeta.style.display = coincide ? "" : "none";
            if (coincide) contadorVisibles++;
        });

        avisoVacio.style.display = (contadorVisibles === 0) ? "block" : "none";
    }

    /* Carga de datos desde data/productos.json */
    try {
        const respuesta = await fetch("data/productos.json");
        if (!respuesta.ok) throw new Error("No se pudo cargar el archivo JSON");
        
        catalogoProductos = await respuesta.json();
        grid.innerHTML = "";
        
        catalogoProductos.forEach(prod => {
            grid.appendChild(crearTarjetaHTML(prod));
        });

        botonesFiltro.forEach(boton => {
            boton.addEventListener("click", () => {
                botonesFiltro.forEach(b => b.classList.remove("activo"));
                boton.classList.add("activo");
                filtrarPorCategoria(boton.dataset.categoria);
            });
        });

        const params = new URLSearchParams(window.location.search);
        const catUrl = params.get("categoria");

        if (catUrl) {
            const botonObjetivo = document.querySelector(`.filtro[data-categoria="${catUrl}"]`);
            if (botonObjetivo) {
                botonObjetivo.click();
            } else {
                filtrarPorCategoria("todos");
            }
        }

    } catch (error) {
        console.error("Error al cargar el catálogo de productos:", error);
        grid.innerHTML = `<p style="color:#718089; grid-column: 1 / -1; text-align:center;">Ocurrió un error al consultar el registro de forja.</p>`;
    }
});

/* Buscador en tiempo real */
const inputBuscar = document.getElementById('inputBuscar');

if (inputBuscar) {
    inputBuscar.addEventListener('input', (e) => {
        const texto = e.target.value.toLowerCase();
        const tarjetas = document.querySelectorAll('.tarjeta-producto');

        tarjetas.forEach(tarjeta => {
            const nombre = tarjeta.querySelector('.tarjeta-nombre').textContent.toLowerCase();
            const descripcion = tarjeta.querySelector('.tarjeta-descripcion').textContent.toLowerCase();

            if (nombre.includes(texto) || descripcion.includes(texto)) {
                tarjeta.style.display = 'flex';
            } else {
                tarjeta.style.display = 'none';
            }
        });
    });
}