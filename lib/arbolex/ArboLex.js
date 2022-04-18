/**
 * @export
 * @typedef {object} ArboToken
 * @property {number} seq
 * @property {string} value
 */

const debug = require("debug")("arbo:*");
const { readFromFile, splitOnToken } = require("../helpers/index.js");

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
      throw new Error(`Input must be a string, recieved type ${typeof input}`);
    }

    if (input.length <= 0) {
      throw new Error(`input length was ${input.length}`);
    }

    this._input = input;
  }

  /**
   * Split a string on seperator, adding the seperator
   *
   * @param {string} inputString
   */
  _splitOnToken(inputString) {
    const parts = [];
    let lastType = undefined;
    let currentToken = "";

    const charStream = inputString;

    const maxLength = charStream.length;
    let cursor = 0;
    let nextCursor = 0;

    while (cursor < maxLength) {
      const element = charStream[cursor];

      debug(`Checking ${element}`);
      const { tokenType, nextCursor } = this._getToken(charStream, cursor);

      const newToken = { type: tokenType, value: element };
      parts.push(newToken);
      cursor = nextCursor;
    }

    return parts;
  }

  /**
   *
   *
   * @internal
   * @param {string[]} input
   * @param {number} cursor
   * @return { tokenType: string, nextCursor: number }
   */
  _getToken(input, cursor) {
    const firstCharCodePoint = input.codePointAt(cursor).toString(16);
    const firstUnicode =
      "u" +
      "0000".substring(0, 4 - firstCharCodePoint.length) +
      firstCharCodePoint;

    const whitespaceCodes = [
      "u0009",
      "u000b",
      "u000c",
      "u0020",
      "u00a0",
      "uufeff",
    ];

    const lineTerminatorCodes = ["u000a", "u000d", "u2028", "u2029"];

    if (whitespaceCodes.includes(firstUnicode)) {
      return { tokenType: "WhiteSpace", nextCursor: cursor + 1 };
    }

    if (lineTerminatorCodes.includes(firstUnicode)) {
      return { tokenType: "LineTerminator", nextCursor: cursor + 1 };
    }

    return { tokenType: `unknown: ${firstUnicode}`, nextCursor: cursor + 1 };
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
      this._input = await readFromFile(this._input);
    }

    if (this._input.length === 0) {
      return [];
    }
    const splitInput = this._splitOnToken(this._input);
    return splitInput;
  }
}

module.exports = {
  ArboLex,
};
