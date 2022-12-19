const fs = require("fs");
const lineReader = require("line-reader");
const Promise = require("bluebird");
const inputFilePath =
  "C:\\Users\\Dario\\OneDrive\\Desktop\\FINKI\\VII semestar\\PVO\\project_1\\file.txt";
const outputFilePath =
  "C:\\Users\\Dario\\OneDrive\\Desktop\\FINKI\\VII semestar\\PVO\\project_1\\output.txt";

// TODO: Function to write 200.000 integers [0-1023] in txt file.
function writeToFile(filePath) {
  for (let i = 0; i < 200000; i++) {
    let record = Math.floor(Math.random() * 1023);
    fs.appendFileSync(filePath, `${record}\n`);
  }
}

// TODO: Function to read the content of txt file, calculate the sum
// of 2 neighbour integers and write the result in another txt file.
function sumOfNeighbours(inputFile, outputFile) {
  var startTime;
  var endTime;
  var isFirst = true;
  var savedInt;

  console.log("Processing, please wait...");

  startTime = new Date();

  //If the output file exists, truncate its content
  fs.truncate(outputFile, 0, function () {
    console.log(`${outputFilePath} truncated.`);
  });

  var eachLine = Promise.promisify(lineReader.eachLine);

  eachLine(inputFile, (line, last) => {
    if (isFirst) {
      savedInt = parseInt(line);
      isFirst = false;
    } else {
      isFirst = true;
      fs.appendFileSync(outputFile, `${savedInt + parseInt(line)}\n`);
      //console.log(savedInt + parseInt(line));
    }
  })
    .then(() => {
      endTime = new Date();
      const diffTime = Math.abs(endTime - startTime);
      console.log("Completed!");
      console.log(`Time elapsed: ${diffTime}ms`);
    })
    .catch((err) => console.log(err));
}

function main(write) {
  if (write) {
    writeToFile(inputFilePath);
  }
  sumOfNeighbours(inputFilePath, outputFilePath);
}

main();
