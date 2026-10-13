import { readFile } from "node:fs/promises";
import pg from "pg";

// Cria as tabelas e os dados de demonstração. Pode ser executado mais de uma vez.
const files = ["schema.sql", "seed.sql"];

const client = new pg.Client({
  connectionString: process.env.DATABASE_URI,
  ssl:
    process.env.DATABASE_SSL === "false" ? false : { rejectUnauthorized: false },
});

await client.connect();
try {
  for (const file of files) {
    const sql = await readFile(
      new URL(`../src/database/${file}`, import.meta.url),
      "utf8",
    );
    await client.query(sql);
    console.log(`${file} aplicado.`);
  }
} finally {
  await client.end();
}
