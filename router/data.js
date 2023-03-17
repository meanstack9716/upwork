let express = require("express");
const router = express.Router();
const multer = require("multer");

const { createJsonData } = require("../controller/jsonData");
const { upload } = require("../middleWare/upload");

router.post("/jsonData", upload.single("file"), createJsonData);

module.exports = router;
