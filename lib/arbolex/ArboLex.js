/**
 * @export
 * @typedef {object} ArboToken
 * @property {string} tokenType
 * @property {string} value
 */

const { readFromFile, convertToUnicodeString } = require("../helpers/index.js");
const {
  whitespaceCodes,
  otherPunctuatorStrings,
  lineTerminatorCodes,
  singleStringCharactersCodes,
  rightBracePunctuatorCodes,
  reservedWordStrings,
} = require("./matchCodes.js");



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
   * @memberof ArboLex
   */
  constructor(input) {
    if (typeof input !== "string") {
      throw new Error(`Input must be a string, recieved type ${typeof input}`);
    }

    if (input.length <= 0) {
      throw new Error(`input length was ${input.length}`);
    }

    /** @type {ArboToken[]} */
    this._tokens = [];
    this._input = input;
  }

  /**
   * Split a string on seperator, adding the seperator
   *
   * @param {string} inputString
   */
  _splitOnToken(inputString) {
    const charStream = inputString;

    const maxLength = charStream.length;
    let cursor = 0;

    while (cursor < maxLength) {

      const { tokenType, nextCursor, value } = ArboLex._getToken(
        charStream,
        cursor
      );

      // Handle logic
      this._tokens.push({
        tokenType,
        value,
      });

      // Move cursor
      cursor = nextCursor;
    }

    return this._tokens;
  }

  //#region

  /**
   *
   *
   * @internal
   * @param {string} input
   * @param {number} cursor
   * @return { {tokenType: string, nextCursor: number, value: string} }
   */
  static _getToken(input, cursor) {
    const startChar = input[cursor];
    const firstUnicode =convertToUnicodeString(startChar)

    if (whitespaceCodes.values.includes(firstUnicode)) {
      return {
        tokenType: whitespaceCodes.tokenType,
        nextCursor: cursor + 1,
        value: startChar,
      };
    }

    if (otherPunctuatorStrings.values.includes(startChar)) {
      return {
        tokenType: otherPunctuatorStrings.tokenType,
        nextCursor: cursor + 1,
        value: startChar,
      };
    }

    if (lineTerminatorCodes.values.includes(firstUnicode)) {
      return {
        tokenType: lineTerminatorCodes.tokenType,
        nextCursor: cursor + 1,
        value: startChar,
      };
    }

    let token = startChar;

    let newCursor = cursor;
    let checkChar = startChar;
    let checkUnicode = convertToUnicodeString(checkChar);

    while (
      !whitespaceCodes.values.includes(checkUnicode) &&
      !otherPunctuatorStrings.values.includes(checkChar) &&
      !lineTerminatorCodes.values.includes(checkUnicode) &&
      !singleStringCharactersCodes.values.includes(checkUnicode) &&
      !rightBracePunctuatorCodes.values.includes(checkUnicode)
    ) {
      if (reservedWordStrings.values.includes(token)) {
        return {
          tokenType: reservedWordStrings.tokenType,
          nextCursor: newCursor + 1,
          value: token,
        };
      }

      newCursor++;
      if (newCursor >= input.length) {
        // We have reached the end of input

        break;
      }
      checkChar = input[newCursor];
      checkUnicode = convertToUnicodeString(checkChar);
      token = token.concat(input[newCursor]);
    }

    return {
      tokenType: `SourceCharacter`,
      nextCursor: cursor + 1,
      value: startChar,
    };
  }

  //#endregion

  /**
   * Lex input string into tokens
   *
   * Reference: {@link https://web.archive.org/web/20220408053324/https://262.ecma-international.org/11.0/#sec-ecmascript-language-lexical-grammar}
   *
   * @param {boolean} [isFile=false] If isFile === true, the input is treated as a file path, not an input string. Default is false
   * @return {Promise<void>}
   * @memberof ArboLex
   */
  async lex(isFile = false) {
    if (isFile) {
      this._input = await readFromFile(this._input);
    }

    if (this._input.length === 0) {
      this._tokens = [];
      return;
    }
    const splitInput = this._splitOnToken(this._input);
    this._tokens = splitInput;
  }

  /**
   *
   *
   * @readonly
   * @returns {ArboToken[]}
   * @memberof ArboLex
   */
  get tokens() {
    return this._tokens;
  }
}

module.exports = {
  ArboLex,
};



