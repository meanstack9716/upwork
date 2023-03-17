const { MongoClient, ServerApiVersion } = require("mongodb");

const connectToDb = async () => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const collection = db.collection(process.env.COLLECTION_NAME);
  return { client, collection };
};

const insertDocuments = async (collection, documents) => {
  const result = await collection.insertMany(documents);
  console.log(
    `${result.insertedCount} documents were inserted into the collection`
  );
  return result.insertedCount;
};

module.exports = { connectToDb, insertDocuments };
