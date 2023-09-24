import { sql } from './db.js'

sql`
CREATE TABLE books (
    id  TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    author TEXT,
    pages INTEGER
  );
`.then(() => {
    console.log("Tabela criada!");
})