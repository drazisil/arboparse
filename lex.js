const { ArboLex } = require("./lib/arbolex/ArboLex.js");
const { printUsage, readFromStdin } = require("./lib/helpers/index.js");

async function main() {
  /** @type {string[]} */
  let input;

  if (process.argv.length < 3) {
    printUsage()
    process.exit(-1);
  }

if (process.argv[2] === '--')  {
    input = await readFromStdin()
} else {
    input = process.argv[2]
} 

  const newLexer = new ArboLex(input);

  console.dir(newLexer.lex());
}

main();
