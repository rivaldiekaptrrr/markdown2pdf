import { openDB, type IDBPDatabase } from 'idb';

const DB_NAME = 'markdown2pdf';
const STORE_NAME = 'documents';
const DB_VERSION = 1;

export interface DocumentRecord {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

async function getDB(): Promise<IDBPDatabase> {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
}

export async function saveDocument(doc: DocumentRecord): Promise<void> {
  const db = await getDB();
  await db.put(STORE_NAME, doc);
}

export async function loadDocument(id: string): Promise<DocumentRecord | undefined> {
  const db = await getDB();
  return db.get(STORE_NAME, id);
}

export async function loadLastDocument(): Promise<DocumentRecord | undefined> {
  const db = await getDB();
  const all: DocumentRecord[] = await db.getAll(STORE_NAME);
  if (!all.length) return undefined;
  return all.sort((a, b) => b.updatedAt - a.updatedAt)[0];
}
