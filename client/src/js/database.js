import req from 'express/lib/request';
import { openDB } from 'idb';

const initdb = async () =>
  openDB('myTextEdit', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('myTextEdit')) {
        console.log('myTextEdit database already exists');
        return;
      }
      db.createObjectStore('myTextEdit', { keyPath: 'id', autoIncrement: true });
      console.log('myTextEdit database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // OPen indexDB
  const indexDB = await openDB("myTextEdit", 1)
  const dbtx = indexDB.transaction("myTextEdit", "readwrite")
  const store = dbtx.objectStore("myTextEdit")
  const request = store.put({id:1, jate:content})
  const result = await request;
  console.log(result)
}

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const indexDB = await openDB("myTextEdit", 1)
  const dbtx = indexDB.transaction("myTextEdit", "readonly")
  const store = dbtx.objectStore("myTextEdit")
  const request = store.getAll()
  const result = await request;
  if (result){
    return result.values
  }
  else {
    console.error("Error")
  }
}

initdb();
