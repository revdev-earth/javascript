import { openDB } from "idb";

const DB_NAME = "newsDB";
const STORE_NAME = "articles";

// Abre o crea la base de datos
export const openNewsDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

// Guarda noticias en IndexedDB
export const saveNews = async (articles) => {
  const db = await openNewsDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  articles.forEach((article) => {
    store.put(article);
  });

  await tx.done;
};

// Obtiene todas las noticias de IndexedDB
export const getSavedNews = async () => {
  const db = await openNewsDB();
  const tx = db.transaction(STORE_NAME, "readonly");
  const store = tx.objectStore(STORE_NAME);
  return await store.getAll();
};
