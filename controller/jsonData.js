const xml2js = require("xml2js");
const https = require("https");
const cron = require("node-cron");
const { connectToDb, insertDocuments } = require("../Database/db");

const createJsonData = async () => {
  return new Promise((resolve, reject) => {
    https.get(process.env.API, (response) => {
      let data = "";
      response.on("data", (result) => {
        data += result;
      });

      response.on("end", async () => {
        xml2js.parseString(data, async (err, result) => {
          if (err) {
            console.error(err);
            reject(err);
          }

          const items = result.rss.channel[0].item;
          resolve({ items });
        });
      });
    });
  });
};

cron.schedule("*/20 * * * * *", async (req,res) => {
  try {
    const { collection, client } = await connectToDb();
    const response = await createJsonData();
    await insertDocuments(collection, response.items);
    await client.close();
    console.log("API data updated successfully.");
  } catch (error) {
    console.error(error);
  }
});

module.exports = { createJsonData };
