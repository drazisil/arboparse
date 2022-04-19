const assert = require("assert");
const { describe } = require("mocha");
const { ArboLex } = require("../lib/arbolex/ArboLex.js");


describe('ArboLex', function() {
    describe('#lex', function() {
        it('should be able to read a file', async function() {
            // Arrange
            const input = 'test/fixtures/testJs.js'
            const isFile = true

            // Act
            const newLexer = new ArboLex(input)
            /** @type {string[]} */
            const outputString = (await newLexer.lex(isFile))

            // Assert
            console.dir(outputString)
            assert.ok(outputString.some(e => e.tokenSoFar === 'return'))

        })
        it('should be able to read a string', async function() {
            // Arrange
            const input = 'console.log("Hello, Arbo!")'

            // Act
            const newLexer = new ArboLex(input)
            const output = await newLexer.lex()

            // Assert
            console.dir(output)
            assert.ok(output.some(e => e.tokenSoFar === '"Hello'))

        })
        it('should throw an error when the input is invalid')
        it('should return an array of ArboToken[]')
    })
})