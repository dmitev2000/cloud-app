const router = require("express").Router();
const fs = require("fs");

router.route("/calc").post((req, res) => {
  var result = [];
  var array;

  try {
    fs.readFile(`uploads\\${req.file.filename}`, (err, data) => {
      if (err) throw err;
      array = data.toString().split("\n");
      var i = 0;
      var len = array.length;
      //console.log("Calculating...");
      while (i < len) {
        var first = array[i];
        var second = array[i + 1];
        if (!second) {
          result.push(parseInt(first) + "\n");
          break;
        }
        result.push(parseInt(first) + parseInt(second) + "\n");
        i += 2;
      }
      //console.log("Done...");
      res.status(200).json(result);
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
