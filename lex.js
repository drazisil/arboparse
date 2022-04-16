const { ArboLex } = require("./lib/arbolex/ArboLex.js")

if (process.argv.length < 3) {
    console.error(`usage: node lex.js <input>`)
    process.exit(-1)
}

const newLexer = new ArboLex(process.argv[2])

console.dir(newLexer.lex())