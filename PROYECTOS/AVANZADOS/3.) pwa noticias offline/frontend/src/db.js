import { openDB } from "idb"; // Importa la función 'openDB' desde la biblioteca 'idb', que facilita el uso de IndexedDB en el navegador.

const DB_NAME = "newsDB"; // Define el nombre de la base de datos que se va a crear o abrir. En este caso, es "newsDB".
const STORE_NAME = "articles"; // Define el nombre del almacén de objetos dentro de la base de datos. En este caso, es "articles".

// Abre o crea la base de datos
export const openNewsDB = async () => {
  // Función asincrónica para abrir o crear la base de datos.
  return openDB(DB_NAME, 1, {
    // Se especifica que se abrirá o se creará la base de datos con la versión 1.
    upgrade(db) {
      // Esta función se ejecuta cuando la base de datos necesita ser actualizada o se crea por primera vez.
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        // Si no existe un almacén de objetos llamado "articles", lo crea.
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
        // La propiedad "id" de cada artículo se usará como la clave primaria para este almacén.
      }
    },
  });
};

// Guarda noticias en IndexedDB
export const saveNews = async (articles) => {
  // Función asincrónica para guardar una lista de artículos en IndexedDB.

  const db = await openNewsDB();
  // Abre la base de datos 'newsDB' usando la función definida previamente.
  // Si no existe, la crea. Si existe, la abre.

  const tx = db.transaction(STORE_NAME, "readwrite");
  // Crea una transacción sobre el almacén de objetos llamado 'articles' (STORE_NAME),
  // con permisos de lectura y escritura ("readwrite") para poder modificar los datos.

  const store = tx.objectStore(STORE_NAME);
  // Obtiene una referencia al almacén de objetos dentro de la transacción.
  // Aquí es donde se guardarán los artículos.

  articles.forEach((article, index) => {
    // Recorre todos los artículos que se quieren guardar.

    if (!article.id) {
      // Verifica si el artículo no tiene una propiedad `id`,
      // lo cual es obligatorio si el almacén fue creado con `keyPath: "id"`.

      // Genera un `id` único basado en la URL del artículo (si existe),
      // o usando el título más el índice como último recurso.
      article.id = article.url || `${article.title}-${index}`;
    }

    store.put(article);
    // Guarda el artículo en el almacén usando el método `put`.
    // Si ya existe un artículo con el mismo `id`, lo sobrescribe (actualiza).
    // Si no existe, lo inserta como nuevo.
  });

  await tx.done;
  // Espera a que la transacción termine completamente.
  // Esto garantiza que todos los artículos hayan sido guardados antes de continuar.
};

// Obtiene todas las noticias de IndexedDB
export const getSavedNews = async () => {
  // Función asincrónica para obtener todas las noticias almacenadas en IndexedDB.
  const db = await openNewsDB();
  // Abre la base de datos usando 'openNewsDB'.

  const tx = db.transaction(STORE_NAME, "readonly");
  // Inicia una transacción en el almacén de objetos "articles", pero esta vez solo con permisos de lectura ("readonly").

  const store = tx.objectStore(STORE_NAME);
  // Obtiene el almacén de objetos "articles" dentro de la transacción.

  return await store.getAll();
  // Devuelve todas las noticias almacenadas en el almacén de objetos "articles".
  // 'getAll' es un método que obtiene todos los objetos almacenados en el almacén.
};
