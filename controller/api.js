const xml2js = require("xml2js");
const fs = require("fs");

const createJsonData = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      console.log(req.file);
      res.status(401).send({ message: "File not found" });
    }

    const file = req.file.path;
    fs.readFile(file, (err, data) => {
      if (err) {
        console.log(err);
        res.status(401).send({ message: err });
      }

      xml2js.parseString(data, (err, result) => {
        if (err) {
          console.error(err);
        }
        res.status(200).send(result);
      });
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "Error" });
  }
};

module.exports = { createJsonData };
