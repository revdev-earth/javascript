// Ejercicio 1: Guardar y recuperar configuraciones con localStorage
// Enunciado: Crea un programa que guarde el idioma preferido del usuario en localStorage y luego lo recupere para mostrarlo en consola.
localStorage.setItem("idioma", "español");
const idioma = localStorage.getItem("idioma");
console.log("Idioma preferido:", idioma);

// Ejercicio 2: Manejar datos temporales con sessionStorage
// Enunciado: Simula un formulario de login que guarda temporalmente el nombre de usuario en sessionStorage y lo muestra en consola.
sessionStorage.setItem("username", "juan123");
console.log("Usuario en sesión:", sessionStorage.getItem("username"));

// Ejercicio 3: Uso básico de IndexedDB
// Enunciado: Crea una base de datos llamada "TareasDB" con un objectStore "tareas" y agrega una tarea con id y descripción.
const request = indexedDB.open("TareasDB", 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;
  db.createObjectStore("tareas", { keyPath: "id" });
};

request.onsuccess = () => {
  const db = request.result;
  const tx = db.transaction("tareas", "readwrite");
  tx.objectStore("tareas").add({ id: 1, descripcion: "Estudiar JavaScript" });
  console.log("Tarea agregada en IndexedDB");
};

// Ejercicio 4: Crear y leer cookies
// Enunciado: Crea una cookie con el nombre del usuario y luego recupérala para mostrarla en consola.
document.cookie = "nombreUsuario=Ana; path=/; max-age=3600";
console.log("Cookies actuales:", document.cookie);

// Ejercicio 5: Cache API en un Service Worker
// Enunciado: Implementa un service worker que cachee archivos básicos de una aplicación al instalarse.
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("app-cache-v1").then((cache) => {
      return cache.addAll(["/", "/index.html", "/app.js"]);
    })
  );
});

// Ejercicio 6: Estrategia offline-first con IndexedDB y fetch
// Enunciado: Implementa una función que guarde notas en IndexedDB y las sincronice con el servidor si hay conexión.
async function saveNotaOffline(nota) {
  const dbRequest = indexedDB.open("NotasDB", 1);

  dbRequest.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore("notas", { keyPath: "id" });
  };

  dbRequest.onsuccess = () => {
    const db = dbRequest.result;
    const tx = db.transaction("notas", "readwrite");
    tx.objectStore("notas").put(nota);

    if (navigator.onLine) {
      fetch("/api/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nota),
      }).then(() => console.log("Nota sincronizada con servidor"));
    } else {
      console.log("Nota guardada offline");
    }
  };
}

saveNotaOffline({ id: Date.now(), contenido: "Practicar IndexedDB" });
