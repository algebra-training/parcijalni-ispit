const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();

const random = require("random");
console.log("Nasumičan broj između 1 i 100:", random.int(1, 100));

router.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.use("/assets", express.static(__dirname + "/assets"));
app.use("/", router);

app.listen(process.env.port || 3000);
console.log("Running at Port 3000");
