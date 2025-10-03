import { openDB } from "idb";

const DB_NAME = "news-db";
const STORE_NAME = "articles";

async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
        console.table(":: getDB :: ", db);
      }
    },
  });
}

export async function saveNews(article) {
  const db = await getDB();
  await db.put(STORE_NAME, article);
}

export async function getSavedNews() {
  const db = await getDB();
  return await db.getAll(STORE_NAME);
}
