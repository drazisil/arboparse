const { open } = require("fs/promises");

/**
 * Return stdin as a string
 *
 * @return {Promise<string>}
 */
// skipcq: JS-0116 - This function returns a promise
async function readFromStdin() {
  let stdin = process.stdin;
  /** @type {string[]} */
  let inputChunks = [];

  stdin.setEncoding("utf8");

  stdin.on("data", function (chunk) {
    inputChunks.push(chunk.toString());
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
 * Return file contents as a string
 *
 * @param {string} filepath
 * @return {Promise<string>}
 */
async function readFromFile(filepath) {
  try {
    const handle = await open(filepath, 'r');
    const input = (await handle.readFile()).toString("utf8");
    await handle.close()
    return input;
  } catch (/** @type {unknown} */ error) {
    if (error instanceof Error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
    throw new Error(`Error reading file: ${String(error)}`);
  }
}

/**
 * 
 */
function printUsage() {
  // skipcq: JS-0002
  console.log(`
usage: 
    To use input
        * node lex.js <input | filepath>
    To pipe from stdin (may block waiting on ctrl+d)
        * node lex.js --`);
}

/**
 *
 *
 * @param {string} firstCharCodePoint
 * @return {string}
 */
 function getUnicodeString(firstCharCodePoint) {
  return `u${"0000".substring(0, 4 - firstCharCodePoint.length)}${firstCharCodePoint}`;
}

/**
 *
 *
 * @param {string} startChar
 * @return {string}
 */
 function getCodepoint(startChar) {
  return (startChar.codePointAt(0) || 0).toString(16);
}




/**
 *
 *
 * @param {string} checkChar
 * @return {string}
 */
function convertToUnicodeString(checkChar) {
  return getUnicodeString(getCodepoint(checkChar));
}

module.exports = {
  printUsage,
  readFromFile,
  readFromStdin,
  convertToUnicodeString
};
