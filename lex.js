const { ArboLex } = require("./lib/arbolex/ArboLex.js");
const { printUsage, readFromStdin } = require("./lib/helpers/index.js");

async function main() {
  /** @type {string[]} */
  let input;
  let isFile = false;

  if (process.argv.length < 3) {
    printUsage();
    process.exit(-1);
  }

  if (process.argv.length === 4) {
    if (process.argv[2] === "-f") {
      isFile = true;
      input = process.argv[3];

    } else if (process.argv[2] === "--") {
      input = await readFromStdin();
    } else {
      input = process.argv[2];
    }
  }

  const newLexer = new ArboLex(input);

  // skipcq: JS-0002
  console.dir(await newLexer.lex(isFile));
}

main();
