// ======================= DATOS =======================
const productos = [
  { nombre: "Remera Oversize", precio: 8000, categoria: "remeras", imagen: "https://via.placeholder.com/300" },
  { nombre: "Remera Básica", precio: 6000, categoria: "remeras", imagen: "https://via.placeholder.com/300" },
  { nombre: "Pantalón Jeans", precio: 15000, categoria: "pantalones", imagen: "https://via.placeholder.com/300" },
  { nombre: "Pantalón Jogger", precio: 12000, categoria: "pantalones", imagen: "https://via.placeholder.com/300" },
  { nombre: "Buzo con Capucha", precio: 14000, categoria: "buzos", imagen: "https://via.placeholder.com/300" },
  { nombre: "Buzo Oversize", precio: 16000, categoria: "buzos", imagen: "https://via.placeholder.com/300" }
];

let resenas = [
  { nombre: "Juan", puntuacion: 5, texto: "Excelente servicio y calidad" },
  { nombre: "María", puntuacion: 5, texto: "Muy buenos precios" },
  { nombre: "Carlos", puntuacion: 4, texto: "Recomendado!" }
];

// ======================= ESTADO GLOBAL =======================
let modoAdmin = false;
let estrellaSeleccionada = 0;
let filtroActual = "todas";

// ======================= ELEMENTOS DEL DOM =======================
const listaResenas = document.getElementById("listaResenas");
const contenedor = document.getElementById("productos");

// ======================= INICIALIZACIÓN =======================
document.addEventListener("DOMContentLoaded", function() {
  cargarResenas();
  crearEstrellas();
  mostrarResenas();
  mostrarProductos(productos);
});

// ======================= FUNCIONES DE ALMACENAMIENTO =======================
/**
 * Cargar reseñas de localStorage
 */
function cargarResenas() {
  const stored = localStorage.getItem('resenas');
  if (stored) {
    resenas = JSON.parse(stored);
  }
}

/**
 * Guardar reseñas en localStorage
 */
function guardarResenas() {
  localStorage.setItem('resenas', JSON.stringify(resenas));
}

// ======================= FUNCIONES DE RESEÑAS =======================
/**
 * Crear estrellas interactivas en el formulario
 */
function crearEstrellas() {
  const container = document.getElementById("estrellaInput");
  container.innerHTML = "";

  for (let i = 1; i <= 5; i++) {
    const estrella = document.createElement("span");
    estrella.className = "estrella";
    estrella.innerHTML = "★";
    estrella.onclick = () => seleccionarEstrella(i);
    container.appendChild(estrella);
  }
}

/**
 * Seleccionar calificación de estrellas
 * @param {number} num - Número de estrellas seleccionadas
 */
function seleccionarEstrella(num) {
  estrellaSeleccionada = num;
  const estrellas = document.querySelectorAll(".estrella");
  estrellas.forEach((e, idx) => {
    if (idx < num) {
      e.classList.add("activa");
    } else {
      e.classList.remove("activa");
    }
  });
}

/**
 * Agregar una nueva reseña
 */
function agregarResena() {
  const nombre = document.getElementById("nombreUsuario").value.trim();
  const texto = document.getElementById("textoResena").value.trim();

  // Validación
  if (!nombre) {
    alert("Por favor ingresa tu nombre");
    return;
  }

  if (!texto) {
    alert("Por favor escribe una reseña");
    return;
  }

  if (estrellaSeleccionada === 0) {
    alert("Por favor selecciona una puntuación");
    return;
  }

  // Agregar nueva reseña
  resenas.push({
    nombre: nombre,
    puntuacion: estrellaSeleccionada,
    texto: texto
  });

  // Guardar en localStorage
  guardarResenas();

  // Limpiar formulario
  document.getElementById("nombreUsuario").value = "";
  document.getElementById("textoResena").value = "";
  estrellaSeleccionada = 0;
  crearEstrellas();

  alert("¡Gracias por tu reseña! 🎉");
  mostrarResenas();
}

/**
 * Mostrar reseñas filtradas
 */
function mostrarResenas() {
  listaResenas.innerHTML = "";

  // Filtrar reseñas
  let resenasFiltradas = resenas;
  if (filtroActual !== "todas") {
    resenasFiltradas = resenas.filter(r => r.puntuacion === parseInt(filtroActual));
  }

  if (resenasFiltradas.length === 0) {
    listaResenas.innerHTML = "<p style='text-align: center; color: #999;'>Sin reseñas en este filtro</p>";
    return;
  }

  resenasFiltradas.forEach((r, index) => {
    const div = document.createElement("div");
    div.className = "resena-item";

    const estrellas = "★".repeat(r.puntuacion) + "☆".repeat(5 - r.puntuacion);

    let html = `
      <div class="resena-cabeza">
        <span class="resena-nombre">${r.nombre}</span>
        <span class="estrellas-display">${estrellas}</span>
      </div>
      <div class="resena-texto">${r.texto}</div>
    `;

    if (modoAdmin) {
      html += `<button class="btn-admin" onclick="eliminarResena(${resenas.indexOf(r)})">Eliminar</button>`;
    }

    div.innerHTML = html;
    listaResenas.appendChild(div);
  });
}

/**
 * Eliminar una reseña por índice
 * @param {number} index - Índice de la reseña a eliminar
 */
function eliminarResena(index) {
  resenas.splice(index, 1);
  guardarResenas();
  mostrarResenas();
}

/**
 * Filtrar reseñas por número de estrellas
 * @param {string|number} numEstrellas - Número de estrellas o 'todas'
 */
function filtrarPorEstrellas(numEstrellas) {
  filtroActual = numEstrellas;

  // Actualizar botones activos
  document.querySelectorAll(".btn-filtro").forEach(btn => {
    btn.classList.remove("activo");
  });
  event.target.classList.add("activo");

  mostrarResenas();
}

/**
 * Alternar visibilidad del contenedor de filtros
 */
function toggleFiltros() {
  const contenedor = document.getElementById("contenedorFiltros");
  if (contenedor.style.display === "none") {
    contenedor.style.display = "block";
  } else {
    contenedor.style.display = "none";
  }
}

// ======================= FUNCIONES DE ADMINISTRADOR =======================
/**
 * Activar modo administrador con contraseña
 */
function activarModoAdmin() {
  const pass = document.getElementById("adminPass").value;
  if (pass === "1234") {
    modoAdmin = true;
    alert("Modo administrador activado");
    mostrarResenas();
  } else {
    alert("Clave incorrecta");
  }
}

/**
 * Mostrar/ocultar panel de login admin
 */
function mostrarLoginAdmin() {
  document.getElementById("adminPanel").style.display = 
    document.getElementById("adminPanel").style.display === "none" ? "block" : "none";
}

// ======================= FUNCIONES DE PRODUCTOS =======================
/**
 * Mostrar lista de productos
 * @param {Array} lista - Lista de productos a mostrar
 */
function mostrarProductos(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}">
      <h3>${p.nombre}</h3>
      <p class="precio">$${p.precio}</p>
    `;
    contenedor.appendChild(div);
  });
}

/**
 * Filtrar productos por búsqueda de texto
 */
function filtrarProductos() {
  const texto = document.getElementById("busqueda").value.toLowerCase();
  const filtrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(texto)
  );
  mostrarProductos(filtrados);
}

/**
 * Filtrar productos por categoría
 * @param {string} categoria - Categoría a filtrar
 */
function filtrarCategoria(categoria) {
  if (categoria === 'todos') {
    mostrarProductos(productos);
  } else {
    const filtrados = productos.filter(p => p.categoria === categoria);
    mostrarProductos(filtrados);
  }
}

/**
 * Alternar visibilidad del contenedor de categorías
 */
function toggleCategorias() {
  const contenedor = document.getElementById("contenedorCategorias");
  if (contenedor.style.display === "none") {
    contenedor.style.display = "flex";
  } else {
    contenedor.style.display = "none";
  }
}

// ======================= FUNCIONES DE NAVEGACIÓN =======================
/**
 * Mostrar una sección específica y ocultar las demás
 * @param {string} id - ID de la sección a mostrar
 */
function mostrarSeccion(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("activo"));
  document.getElementById(id).classList.add("activo");
}