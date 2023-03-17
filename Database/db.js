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
  let insertedCount = 0;

  for (const document of documents) {
    const filter = { title: document.title[0] }; // use title as the unique identifier
    const update = { $set: document };
    const options = { upsert: true };

    const result = await collection.updateOne(filter, update, options);

    if (result.upsertedCount > 0) {
      insertedCount++;
    }
  }

  console.log(`${insertedCount} documents were inserted into the collection`);
  return insertedCount;
};

module.exports = { connectToDb, insertDocuments };
