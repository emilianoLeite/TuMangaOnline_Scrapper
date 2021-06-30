import { MongoClient } from 'mongodb'
import type { Db, MongoClientOptions } from 'mongodb'

interface Cache {
   conn: null | {client: MongoClient,db: Db};
   promise: null | Promise<{client: MongoClient,db: Db}> ;
}


declare global {
  namespace NodeJS {
    interface Global {
      mongo: any
  }
  }
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached: Cache = global.mongo

if (!cached) {
  cached = global.mongo = { conn: null, promise: null }
}

export async function connectToDatabase() {
  const MONGODB_URI = process.env['MONGODB_URI']
  const MONGODB_DB = process.env['MONGODB_DB']

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

    const x  = MongoClient.connect(MONGODB_URI, opts).then((client) => {
      return {
        client,
        db: client.db(MONGODB_DB),
      }
    })
    cached.promise = x
  }
  cached.conn = await cached.promise
  return cached.conn
}