// ======================= app.js =======================
const productos = [
  { nombre: "Remera Oversize", precio: 8000, categoria: "remeras", imagen: "https://via.placeholder.com/300" },
  { nombre: "Pantalón Jeans", precio: 15000, categoria: "pantalones", imagen: "https://via.placeholder.com/300" },
  { nombre: "Buzo Hoodie", precio: 14000, categoria: "buzos", imagen: "https://via.placeholder.com/300" }
];

const resenas = [
  { texto: "Excelente calidad" },
  { texto: "Muy recomendable" }
];

let modoAdmin = false;

const contenedor = document.getElementById("productos");
const listaResenas = document.getElementById("listaResenas");

function mostrarProductos(lista) {
  contenedor.innerHTML = "";
  lista.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
      <img src="${p.imagen}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio}</p>
    `;
    contenedor.appendChild(div);
  });
}

function filtrarProductos() {
  const texto = document.getElementById("busqueda").value.toLowerCase();
  const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
  mostrarProductos(filtrados);
}

function filtrarCategoria(cat) {
  if (cat === 'todos') return mostrarProductos(productos);
  mostrarProductos(productos.filter(p => p.categoria === cat));
}

function mostrarSeccion(id) {
  document.querySelectorAll("section").forEach(s => s.classList.remove("activo"));
  document.getElementById(id).classList.add("activo");
}

function mostrarResenas() {
  listaResenas.innerHTML = "";
  resenas.forEach((r, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${r.texto}</p>
      ${modoAdmin ? `<button onclick="eliminarResena(${i})">Eliminar</button>` : ""}
    `;
    listaResenas.appendChild(div);
  });
}

function eliminarResena(i) {
  resenas.splice(i, 1);
  mostrarResenas();
}

function activarModoAdmin() {
  if (document.getElementById("adminPass").value === "1234") {
    modoAdmin = true;
    mostrarResenas();
  }
}

function mostrarLoginAdmin() {
  document.getElementById("adminPanel").style.display = "block";
}

mostrarProductos(productos);
mostrarResenas();