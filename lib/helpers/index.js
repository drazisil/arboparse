const { open } = require("fs/promises");
const debug = require("debug")("arbo:*");

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
 * Return file contents as a string
 *
 * @param {string} filepath
 * @return {Promise<string>}
 */
async function readFromFile(filepath) {
  try {
    const handle = await open(filepath);
    const input = (await handle.readFile()).toString("utf-8");
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
 *
 * @param {string} input
 */
function tokenType(input) {
    const firstCharCodePoint = input.codePointAt().toString(16)
    const firstUnicode =  "u" + "0000".substring(0, 4 - firstCharCodePoint.length) + firstCharCodePoint;

    const whitespaceCodes = [
        'u0009',
        'u000b',
        'u000c',
        'u0020',
        'u00a0',
        'uufeff'
    ]

    const lineTerminatorCodes = [
        'u000a',
        'u000d',
        'u2028',
        'u2029'
    ]

    if (whitespaceCodes.includes(firstUnicode)) {
        return 'WhiteSpace'
    }

    if (lineTerminatorCodes.includes(firstUnicode)) {
        return 'LineTerminator'
    }

    return `unknown: ${firstUnicode}`

}

/**
 * Split a string on seperator, adding the seperator
 *
 * @param {string} inputString
 */
function splitOnToken(inputString) {
  const parts = [];
  let lastType = undefined;
  let currentToken = "";

  const charStream = inputString.split('');

  const maxLength = charStream.length;

  for (let index = 0; index < maxLength; index++) {
    const element = charStream.shift();

    debug(`Checking ${element}`);
    const newToken = { type: tokenType(element), value: element}
    parts.push(newToken);
  }

  return parts;
}

function printUsage() {
  // skipcq: JS-0002
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
  splitOnToken,
};
