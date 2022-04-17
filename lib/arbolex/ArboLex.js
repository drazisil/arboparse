/**
 * @export
 * @typedef {object} ArboToken
 * @property {number} seq
 * @property {string} value
 */

const { readFromFile, splitOnToken } = require("../helpers/index.js")

/**
 *
 *
 * @class ArboLex
 * @property {ArboToken[]} _tokens
 * @property {string} _input
 */
class ArboLex {

    /**
     * Creates an instance of ArboLex.
     * @param {string} input
     * @param {boolean} [isFile=false] If isFile === true, the input is treated as a file path, not an input string. Default is false
     * @memberof ArboLex
     */
    constructor(input) {

        if (typeof input !== "string") {
            throw new Error(`Input must be a string, recieved type ${typeof input}`)
        }

        if (input.length <= 0) {
            throw new Error(`input length was ${input.length}`)
        }

        this._input = input
    }

    /**
     * Lex input string into tokens
     * 
     * Reference: {@link https://web.archive.org/web/20220408053324/https://262.ecma-international.org/11.0/#sec-ecmascript-language-lexical-grammar}
     *
     * @param {boolean} [isFile=false] should input be treated as a file path? Default is false
     * @return {ArboToken[] | string[]} 
     * @memberof ArboLex
     */
    async lex(isFile = false) {
        if (isFile) {
            this._input = await readFromFile(this._input)
        }

        if (this._input.length === 0) {
            return []
        }
        const splitInput = splitOnToken(this._input)
        return splitInput
    }
}

module.exports = {
    ArboLex
}