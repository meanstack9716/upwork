const xml2js = require("xml2js");
const https = require("https");
const { connectToDb, insertDocuments } = require("../Database/db");

const createJsonData = async (req, res) => {
  try {
    https.get(process.env.API, (response) => {
      let data = "";
      response.on("data", (result) => {
        data += result;
      });

      response.on("end", async () => {
        xml2js.parseString(data, async (err, result) => {
          if (err) {
            console.error(err);
            res.status(401).send({ message: err });
          }

          const items = result.rss.channel[0].item;
          const { collection, client } = await connectToDb();

          try {
            const insertedData = await insertDocuments(collection, items);
            res.status(200).send({ insertedData });
          } catch (error) {
            console.error(error);
            res.status(401).send({ message: "Error" });
          } finally {
            await client.close();
          }
        });
      });
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Error" });
  }
};

module.exports = { createJsonData };
