document.addEventListener("DOMContentLoaded", async () => {
    // 1. Obtener ID de la URL
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get("id");

    try {
        const respuesta = await fetch("data/productos.json");
        if (!respuesta.ok) {
            throw new Error(`Error HTTP: ${respuesta.status}`);
        }
        const productos = await respuesta.json();
        
        // 2. Buscar producto o tomar el primero por defecto
        let actual = productos.find(p => p.id === productoId);
        if (!actual) {
            actual = productos[0];
        }

        // Función auxiliar para asignar texto solo si el elemento existe
        const setTexto = (id, valor) => {
            const el = document.getElementById(id);
            if (el) el.textContent = valor || "";
        };

        // 3. Cargar textos principales
        const metaTitle = document.getElementById("meta-title");
        if (metaTitle) metaTitle.textContent = `${actual.nombre} · FORJA ·09`;

        setTexto("p-nombre", actual.nombre);
        setTexto("p-categoria", actual.categoriaTexto);
        setTexto("p-descripcion", actual.descripcion);
        setTexto("p-precio", actual.precio);

        // 4. Ficha técnica
        setTexto("spec-linea", actual.linea);
        setTexto("spec-material", actual.material);
        setTexto("spec-peso", actual.peso);
        setTexto("spec-origen", actual.origen);
        setTexto("spec-expediente", actual.expediente);

        // 5. Imagen única
        const imgPrincipal = document.getElementById("p-img-principal");
        if (imgPrincipal) {
            const rutaFoto = actual.imagen || (actual.imagenes && actual.imagenes[0]) || "img/cat-ad-modelo.jpg";
            imgPrincipal.src = rutaFoto;
            imgPrincipal.alt = actual.nombre || "Pieza de forja";
        }

        // 6. Características (lista)
        const listaCaract = document.getElementById("p-caracteristicas");
        if (listaCaract) {
            listaCaract.innerHTML = "";
            if (Array.isArray(actual.caracteristicas)) {
                actual.caracteristicas.forEach(texto => {
                    const li = document.createElement("li");
                    li.textContent = texto;
                    listaCaract.appendChild(li);
                });
            }
        }

        // 7. Descripción del taller
        const contenedorTaller = document.getElementById("p-taller");
        if (contenedorTaller) {
            contenedorTaller.innerHTML = "";
            if (Array.isArray(actual.taller)) {
                actual.taller.forEach(p => {
                    const parrafo = document.createElement("p");
                    parrafo.textContent = p;
                    contenedorTaller.appendChild(parrafo);
                });
            }
        }

        // 8. Etiquetas recomendadas
        const contRecomendado = document.getElementById("p-recomendado");
        if (contRecomendado) {
            contRecomendado.innerHTML = "";
            if (Array.isArray(actual.recomendado)) {
                actual.recomendado.forEach(tag => {
                    const span = document.createElement("span");
                    span.textContent = tag;
                    contRecomendado.appendChild(span);
                });
            }
        }

        // 9. Garantía, envío y laterales
        setTexto("lateral-garantia", actual.garantia || "90 días");
        setTexto("lateral-devoluciones", actual.devoluciones || "15 días, sin uso en combate");
        setTexto("lateral-certificado", actual.certificado || "Sí, con N.º de expediente");
        setTexto("lateral-envio", actual.tiempoEnvio || "3 a 10 días hábiles");
        setTexto("lateral-cobertura", actual.cobertura || "Todas las regiones de Runeterra");

        // 10. Productos relacionados
        const contenedorRelacionados = document.getElementById("grid-relacionados");
        if (contenedorRelacionados) {
            contenedorRelacionados.innerHTML = "";
            const relacionados = productos.filter(p => p.categoria === actual.categoria && p.id !== actual.id);

            if (relacionados.length === 0) {
                contenedorRelacionados.innerHTML = `<p style="color:#718089; grid-column: 1 / -1;">No hay más piezas registradas en esta línea por el momento.</p>`;
            } else {
                relacionados.slice(0, 4).forEach(rel => {
                    const fotoRel = rel.imagen || (rel.imagenes && rel.imagenes[0]) || "img/cat-ad-modelo.jpg";
                    const card = document.createElement("article");
                    card.className = "tarjeta-producto";
                    card.dataset.categoria = rel.categoria;
                    card.innerHTML = `
                        <a href="producto.html?id=${rel.id}" class="tarjeta-imagen">
                            <img src="${fotoRel}" alt="${rel.nombre}">
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
        }

    } catch (error) {
        console.error("Error al cargar los datos del producto:", error);
    }
});