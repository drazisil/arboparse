const { open } = require("fs/promises");

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

/**
 *
 *
 * @param {string} filepath
 * @return {Promise<string>} 
 */
async function readFromFile(filepath) {
    try {
        const handle = await open(filepath)
        const input = (await handle.readFile()).toString("utf-8")
        return input
    } catch ( /** @type {unknown} */ error) {
        if (error instanceof Error) {
            throw new Error(`Error reading file: ${error.message}`)
        }
        throw new Error(`Error reading file: ${String(error)}`)
    }
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
  readFromFile,
  readFromStdin,
};
