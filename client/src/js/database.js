import { openDB } from 'idb';

const DB_NAME = 'jate';
const DB_VERSION = 1;
const STORE_NAME = 'jate';

const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        console.log(`${STORE_NAME} database created`);
        return store;
      }
      console.log(`${STORE_NAME} database already exists`);
    },
  });
  return db;
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDB = await initDB();
  const tx = jateDB.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);
  const request = store.put({ jate: content });
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
  const jateDB = await initDB();
  const tx = jateDB.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const request = store.getAll();
  const result = await request;
  console.log(result);
};
initdb();
