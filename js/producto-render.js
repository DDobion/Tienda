

document.addEventListener("DOMContentLoaded", async () => {
    /* id */
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get("id");

    try {
        const respuesta = await fetch("data/productos.json");
        const productos = await respuesta.json();
                                                                                    /* ?quitar? */
        
        let actual = productos.find(p => p.id === productoId);
        if (!actual) {
            actual = productos[0];
        }   

        /* datos plantilla  */
        document.getElementById("meta-title").textContent = `${actual.nombre} · FORJA ·09`;
        document.getElementById("p-nombre").textContent = actual.nombre;
        document.getElementById("p-categoria").textContent = actual.categoriaTexto;
        document.getElementById("p-descripcion").textContent = actual.descripcion;
        document.getElementById("p-precio").textContent = actual.precio;

        /* Ficha técnica */
        document.getElementById("spec-linea").textContent = actual.linea;
        document.getElementById("spec-material").textContent = actual.material;
        document.getElementById("spec-peso").textContent = actual.peso;
        document.getElementById("spec-origen").textContent = actual.origen;
        document.getElementById("spec-expediente").textContent = actual.expediente;

        /* img y miniaturas */
        const imgPrincipal = document.getElementById("p-img-principal");
        const contMiniaturas = document.getElementById("p-miniaturas");
        contMiniaturas.innerHTML = "";

        if (actual.imagenes && actual.imagenes.length > 0) {
            imgPrincipal.src = actual.imagenes[0];
            imgPrincipal.alt = actual.nombre;

            actual.imagenes.forEach((url, i) => {
                const btn = document.createElement("button");
                btn.className = "miniatura";
                btn.innerHTML = `<img src="${url}" alt="Vista ${i + 1}">`;
                btn.addEventListener("click", () => {
                    imgPrincipal.src = url;
                });
                contMiniaturas.appendChild(btn);
            });
        }

        /* Caracteristicas */
        const listaCaract = document.getElementById("p-caracteristicas");
        listaCaract.innerHTML = "";
        actual.caracteristicas?.forEach(texto => {
            const li = document.createElement("li");
            li.textContent = texto;
            listaCaract.appendChild(li);
        });

        /* taller */
        const contenedorTaller = document.getElementById("p-taller");
        contenedorTaller.innerHTML = "";
        actual.taller?.forEach(p => {
            const parrafo = document.createElement("p");
            parrafo.textContent = p;
            contenedorTaller.appendChild(parrafo);
        });

        /* recomendado */
        const contRecomendado = document.getElementById("p-recomendado");
        contRecomendado.innerHTML = "";
        actual.recomendado?.forEach(tag => {
            const span = document.createElement("span");
            span.textContent = tag;
            contRecomendado.appendChild(span);
        });

        /* garantía y envío */
        document.getElementById("lateral-garantia").textContent = actual.garantia || "90 días";
        document.getElementById("lateral-devoluciones").textContent = actual.devoluciones || "15 días, sin uso en combate";
        document.getElementById("lateral-certificado").textContent = actual.certificado || "Sí, con N.º de expediente";
        document.getElementById("lateral-envio").textContent = actual.tiempoEnvio || "3 a 10 días hábiles";
        document.getElementById("lateral-cobertura").textContent = actual.cobertura || "Todas las regiones de Runeterra";

        /* misma categoria s */
        const contenedorRelacionados = document.getElementById("grid-relacionados");
        contenedorRelacionados.innerHTML = "";

        const relacionados = productos.filter(p => p.categoria === actual.categoria && p.id !== actual.id);

        if (relacionados.length === 0) {
            contenedorRelacionados.innerHTML = `<p style="color:#718089; grid-column: 1 / -1;">No hay más piezas registradas en esta línea por el momento.</p>`;
        } else {
            relacionados.slice(0, 4).forEach(rel => {
                const card = document.createElement("article");
                card.className = "tarjeta-producto";
                card.dataset.categoria = rel.categoria;
                card.innerHTML = `
                    <a href="producto.html?id=${rel.id}" class="tarjeta-imagen">
                        <img src="${rel.imagenes[0] || ''}" alt="${rel.nombre}">
                    </a>
                    <div class="tarjeta-info">
                        <small class="tarjeta-categoria">${rel.categoriaTexto}</small>
                        <h3 class="tarjeta-nombre">
                            <a href="producto.html?id=${rel.id}">${rel.nombre}</a>
                        </h3>
                        <div class="tarjeta-pie">
                            <span class="tarjeta-precio">${rel.precio}</span>
                            <a href="producto.html?id=${rel.id}" class="tarjeta-detalle">Ver detalle →</a>
                        </div>
                    </div>
                `;
                contenedorRelacionados.appendChild(card);
            });
        }

    } catch (error) {
        console.error("Error al cargar los datos del producto:", error);
    }
});