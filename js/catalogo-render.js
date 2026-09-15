document.addEventListener("DOMContentLoaded", async () => {
    const grid = document.getElementById("gridProductos");
    const avisoVacio = document.getElementById("catalogoVacio");
    const botonesFiltro = document.querySelectorAll(".filtro");

    let catalogoProductos = [];

    /*tarjeta de producto */
    function crearTarjetaHTML(item) {
        const article = document.createElement("article");
        article.className = "tarjeta-producto";
        article.dataset.categoria = item.categoria;

        const imagenPrincipal = (item.imagenes && item.imagenes.length > 0) ? item.imagenes[0] : "";
        const urlDetalle = `producto.html?id=${encodeURIComponent(item.id)}`;

        article.innerHTML = `
            <a href="${urlDetalle}" class="tarjeta-imagen">
                <img src="${imagenPrincipal}" alt="${item.nombre}" loading="lazy">
            </a>
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

    /* filtro */
    function filtrarPorCategoria(categoria) {
        const tarjetas = grid.querySelectorAll(".tarjeta-producto");
        let contadorVisibles = 0;

        tarjetas.forEach(tarjeta => {
            const coincide = (categoria === "todos" || tarjeta.dataset.categoria === categoria);
            tarjeta.style.display = coincide ? "" : "none";
            if (coincide) contadorVisibles++;
        });

       /* quitar aviso si hay productos visibles */
        avisoVacio.style.display = (contadorVisibles === 0) ? "block" : "none";
    }

    /* datos */
    try {
        const respuesta = await fetch("data/productos.json");
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

        /* url de categoria */
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
        grid.innerHTML = `<p style="color:#718089; grid-column: 1 / -1;">Ocurrió un error al consultar el registro de forja.</p>`;
    }
});