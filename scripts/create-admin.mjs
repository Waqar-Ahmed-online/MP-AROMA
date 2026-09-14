import { config } from "dotenv";
config({ path: ".env.local" });

import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import readline from "node:readline/promises";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "mparoma";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function main() {
  const email = await rl.question("Admin email: ");
  const password = await rl.question("Admin password: ");
  rl.close();

  const passwordHash = await bcrypt.hash(password, 10);

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  await db.collection("admins").updateOne(
    { email },
    { $set: { email, passwordHash, createdAt: new Date() } },
    { upsert: true }
  );

  console.log(`Admin "${email}" ready.`);
  await client.close();
}

main();