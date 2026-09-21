// migrate-mongodb.js
// Run: node migrate-mongodb.js
// Pehle: npm install mongodb

const { MongoClient } = require("mongodb");

// 👇 PURANE Atlas account ki connection string (jahan se data le kar aana hai)
const OLD_URI = "mongodb+srv://waqarahmedonline426_db_user:haker125@cluster0.oemwigf.mongodb.net/?appName=Cluster0";
const OLD_DB_NAME = "mparoma";

// 👇 NAYE Atlas account ki connection string (jahan data copy karna hai)
const NEW_URI = "mongodb+srv://mparomam_db_user:rRAS21ve5wxrZQMG@mparoma.yhvmkeg.mongodb.net/?appName=mparoma";
const NEW_DB_NAME = "mparoma";

async function main() {
  const oldClient = new MongoClient(OLD_URI);
  const newClient = new MongoClient(NEW_URI);

  await oldClient.connect();
  await newClient.connect();

  const oldDb = oldClient.db(OLD_DB_NAME);
  const newDb = newClient.db(NEW_DB_NAME);

  const collections = await oldDb.listCollections().toArray();
  console.log(`Total ${collections.length} collections mili purane database mein.`);

  for (const { name } of collections) {
    const docs = await oldDb.collection(name).find({}).toArray();

    if (docs.length === 0) {
      console.log(`⏭️  ${name}: khali hai, skip.`);
      continue;
    }

    await newDb.collection(name).insertMany(docs, { ordered: false });
    console.log(`✅ ${name}: ${docs.length} documents copy ho gaye.`);
  }

  console.log("🎉 Migration complete! Sara data naye cluster mein copy ho gaya.");

  await oldClient.close();
  await newClient.close();
}

main().catch((err) => {
  console.error("❌ Migration mein masla aaya:", err.message);
});