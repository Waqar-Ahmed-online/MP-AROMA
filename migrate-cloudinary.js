// migrate-cloudinary.js
// Run: node migrate-cloudinary.js
// Pehle: npm install cloudinary mongodb

const cloudinary = require("cloudinary").v2;
const { MongoClient } = require("mongodb");

// 👇 PURANE account ki details (jahan se images le kar aani hain)
const OLD_ACCOUNT = {
  cloud_name: "mfd5vbiw",
  api_key: "932482714258894",
  api_secret: "PJ6CjDf0RTlwY5bhMAWNhS02S3E",
};

// 👇 NAYE account ki details
const NEW_ACCOUNT = {
  cloud_name: "corjrgqz",
  api_key: "757986582297956",
  api_secret: "CxEH9wU-DMoeRJpwnQDjfQxkp9M",
};

const MONGODB_URI = "mongodb+srv://waqarahmedonline426_db_user:haker125@cluster0.oemwigf.mongodb.net/sip-stall-pos?appName=Cluster0";
const DB_NAME = "mparoma"; // 👈 fix kiya

async function main() {
  // ---- Step A: OLD account se saari images ki list nikalo ----
  cloudinary.config(OLD_ACCOUNT);

  let allResources = [];
  let nextCursor = undefined;
  do {
    const res = await cloudinary.api.resources({
      type: "upload",
      prefix: "mparoma",
      max_results: 100,
      next_cursor: nextCursor,
    });
    allResources = allResources.concat(res.resources);
    nextCursor = res.next_cursor;
  } while (nextCursor);

  console.log(`Total ${allResources.length} images mili purane account mein.`);

  // ---- Step B: har image ko NAYE account mein upload karo (same public_id ke sath) ----
  cloudinary.config(NEW_ACCOUNT);

  const urlMap = {};

  for (const resource of allResources) {
    try {
      const uploaded = await cloudinary.uploader.upload(resource.secure_url, {
        public_id: resource.public_id,
        overwrite: true,
      });
      urlMap[resource.secure_url] = uploaded.secure_url;
      console.log(`✅ Copied: ${resource.public_id}`);
    } catch (err) {
      console.error(`❌ Failed: ${resource.public_id}`, err.message);
    }
  }

  console.log("Cloudinary copy mukammal ho gaya. Ab database update ho raha hai...");

  // ---- Step C: SAARI collections mein purane links ko naye se replace karo ----
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);

  const collections = await db.listCollections().toArray();

  for (const { name } of collections) {
    const docs = await db.collection(name).find({}).toArray();

    for (const doc of docs) {
      let text = JSON.stringify(doc);
      let changed = false;

      for (const [oldUrl, newUrl] of Object.entries(urlMap)) {
        if (text.includes(oldUrl)) {
          text = text.split(oldUrl).join(newUrl);
          changed = true;
        }
      }

      if (changed) {
        const updatedDoc = JSON.parse(text);
        delete updatedDoc._id;
        await db.collection(name).updateOne(
          { _id: doc._id },
          { $set: updatedDoc }
        );
        console.log(`🔄 Updated in ${name}: ${doc._id}`);
      }
    }
  }

  console.log("✅ Database bhi update ho gaya. Migration complete!");
  await client.close();
}

main().catch(console.error);