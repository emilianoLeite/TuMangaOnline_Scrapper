declare module NodeJS  {
  interface Global {
      mongo: GlobalMongo
  }
}

interface GlobalMongo {
  conn: null | { client: MongoClient,db: Db };
  promise: null | Promise<{ client: MongoClient,db: Db }> ;
}
