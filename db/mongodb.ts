import { MongoClient } from 'mongodb'
import type { MongoClientOptions } from 'mongodb'

// Example copied from https://github.com/vercel/next.js/blob/canary/examples/with-mongodb/util/mongodb.js
/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  const MONGODB_URI = process.env.MONGODB_URI
  const MONGODB_DB = process.env.MONGODB_DB

  if (!MONGODB_URI) {
    throw new Error(
      'Please define the MONGODB_URI environment variable inside .env.local'
    )
  }

  if (!MONGODB_DB) {
    throw new Error(
      'Please define the MONGODB_DB environment variable inside .env.local'
    )
  }

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts: MongoClientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      forceServerObjectId: true
    }

    cached.promise  = MongoClient.connect(MONGODB_URI, opts).then(
      (client) => ({ client, db: client.db(MONGODB_DB) })
    )
  }

  cached.conn = await cached.promise
  return cached.conn
}