/**
 *
 *
 * @return {Promise<string>}
 */
async function readFromStdin() {
  let stdin = process.stdin;
  /** @type {string[]} */
  let inputChunks = [];

  stdin.setEncoding("utf8");

  stdin.on("data", function (chunk) {
    inputChunks.push(chunk);
  });

  stdin.resume();

  return new Promise((resolve, reject) => {
    stdin.on("end", function () {
      let inputString = inputChunks.join();
      resolve(inputString);
    });
    stdin.on("error", function () {
      reject(Error("error during read"));
    });
    stdin.on("timeout", function () {
      reject(Error("timout during read"));
    });
  });
}

function printUsage() {
  console.log(`
usage: 
    To use input
        * node lex.js <input | filepath>
    To pipe from stdin (may block waiting on ctrl+d)
        * node lex.js --`);
}

module.exports = {
  printUsage,
  readFromStdin,
};
