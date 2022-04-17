const assert = require("assert");
const { describe } = require("mocha");
const { ArboLex } = require("../lib/arbolex/ArboLex.js");


describe('ArboLex', function() {
    describe('#lex', function() {
        it('should be able to read a file')
        it('should be able to read a string', function() {
            // Arrange
            const input = 'console.log("Hello, Arbo!")'
            const expectedOutput = input.split('')

            // Act
            const newLexer = new ArboLex(input)
            const output = newLexer.lex()

            // Assert
            assert.deepEqual(output, expectedOutput)

        })
        it('should throw an error when the input is invalid')
        it('should return an array of ArboToken[]')
    })
})