/**
 * @export
 * @typedef {object} ArboToken
 * @property {number} seq
 * @property {string} value
 */

const { readFromFile } = require("../helpers/index.js")

class ArboLex {
    /**
     *
     * @type {ArboToken[]}
     * @memberof ArboLex
     */
    _tokens = []

    /**
     *
     * @type {string}
     * @memberof ArboLex
     */
    _input = ''

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

    async lex(isFile = false) {
        if (isFile) {
            this._input = await readFromFile(this._input)
        }

        if (this._input.length === 0) {
            return []
        }
        const splitInput = this._input.split('')
        return splitInput
    }
}

module.exports = {
    ArboLex
}