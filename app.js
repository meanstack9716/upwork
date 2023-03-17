const express = require("express");
const app = express();


const router = require("./router/data");
app.use("/data", router);

const port = 3000;

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
