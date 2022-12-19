/* eslint-disable no-unused-vars */
const router = require("express").Router();
const fs = require("fs");
const lineReader = require("line-reader");
const Promise = require("bluebird");

router.route("/calc").post((req, res) => {
  var isFirst = true;
  var savedInt;
  var eachLine = Promise.promisify(lineReader.eachLine);
  var result = [];

  fs.truncate("tmp\\output.txt", 0, function () {
    console.log("tmp\\output.txt truncated.");
  });

  eachLine(`uploads\\${req.file.filename}`, (line, last) => {
    console.log(line);
    if (isFirst) {
      savedInt = parseInt(line);
      isFirst = false;
    } else {
      isFirst = true;
      result.push((savedInt + parseInt(line)) + "\n");
      fs.appendFileSync("tmp\\output.txt", `${savedInt + parseInt(line)}\n`);
    }
  })
    .then(() => {
      res.status(200).json(result);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
