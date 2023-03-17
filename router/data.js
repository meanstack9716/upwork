let express = require("express");
const router = express.Router();
const multer = require("multer");

const { createJsonData } = require("../controller/jsonData");


router.post("/jsonData", createJsonData);

module.exports = router;
