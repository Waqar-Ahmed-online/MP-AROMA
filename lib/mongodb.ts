import { MongoClient, Db } from "mongodb";

// Standard Next.js + MongoDB connection pattern. Set MONGODB_URI in your
// .env.local (see .env.local.example) and every API route can call
// getDb() to get a connected database handle without reconnecting on
// every request (important in dev, where modules can reload often).

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "mparoma";

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getClientPromise(): Promise<MongoClient> {
  if (!uri) {
    throw new Error(
      "MONGODB_URI is not set. Add it to .env.local (see .env.local.example)."
    );
  }

  if (process.env.NODE_ENV === "development") {
    // Reuse the connection across hot reloads in development.
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  }

  if (!clientPromise) {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
  return clientPromise;
}

export async function getDb(): Promise<Db> {
  const connectedClient = await getClientPromise();
  return connectedClient.db(dbName);
}
