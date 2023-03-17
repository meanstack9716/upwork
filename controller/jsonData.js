const xml2js = require("xml2js");
const fs = require("fs");
const { connectToDb, insertDocuments } = require("../Database/db");

const createJsonData = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      console.log(req.file);
      res.status(401).send({ message: "File not found" });
    }

    const file = req.file.path;
    fs.readFile(file, async (err, data) => {
      if (err) {
        console.log(err);
        res.status(401).send({ message: "File is not reading..." });
      }

      xml2js.parseString(data, async (err, result) => {
        if (err) {
          console.error(err);
          res.status(401).send({ message: err });
        }

        const items = result.rss.channel[0].item;
        const { collection, client } = await connectToDb();

        try {
          const insertedCount = await insertDocuments(collection, items);
          res.status(200).send({ items });
        } catch (error) {
          console.error(error);
          res.status(401).send({ message: "Error" });
        } finally {
          await client.close();
        }
      });
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Error" });
  }
};

module.exports = { createJsonData };
