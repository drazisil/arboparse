/**
 * @export
 * @typedef {object} ArboToken
 * @property {string} tokenType
 * @property {string} value
 */

const debug = require("debug")("arbo:*");
const { readFromFile } = require("../helpers/index.js");

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
      const element = charStream[cursor];

      const { tokenType, nextCursor, value } = this._getToken(
        charStream,
        cursor
      );

      // Handle logic
      if (tokenType === "sourceCharacter") {
        this._tokens.push({
          tokenType,
          value,
        });
      } else {
        this._tokens.push({
          tokenType,
          value,
        });
      }

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
   * @param {string[]} input
   * @param {number} cursor
   * @param {string} currentToken
   * @return { tokenType: string, nextCursor: number, currentToken: string }
   */
  _getToken(input, cursor, currentToken) {
    const startChar = input[cursor];
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

    const otherPunctuatorStrings = [
      "{",
      "(",
      ")",
      "[",
      "]",
      ".",
      "...",
      ";",
      ",",
      "<",
      ">",
      "<=",
      ">=",
      "==",
      "!=",
      "===",
      "!==",
      "+",
      "-",
      "*",
      "%",
      "**",
      "++",
      "--",
      "<<",
      ">>",
      ">>>",
      "&",
      "|",
      "^",
      "!",
      "~",
      "&&",
      "||",
      "??",
      "?",
      ":",
      "=",
      "+=",
      "-=",
      "*=",
      "%=",
      "**=",
      ">>=",
      ">>>=",
      "&=",
      "|=",
      "^=",
      "=>",
    ];

    const sortedOtherPunctuatorStrings = otherPunctuatorStrings.sort((a, b) => {
      if (a < b) return 1;
      if (a > b.region) return 1;
      return 0;
    });

    const reservedWordStrings = ["const"];

    const sortedReservedWordStrings = reservedWordStrings.sort((a, b) => {
      if (a < b) return 1;
      if (a > b.region) return 1;
      return 0;
    });

    if (whitespaceCodes.includes(firstUnicode)) {
      return {
        tokenType: "WhiteSpace",
        nextCursor: cursor + 1,
        value: startChar,
      };
    }

    if (sortedOtherPunctuatorStrings.includes(startChar)) {
      return {
        tokenType: "Punctuator",
        nextCursor: cursor + 1,
        value: startChar,
      };
    }

    if (lineTerminatorCodes.includes(firstUnicode)) {
      return {
        tokenType: "LineTerminator",
        nextCursor: cursor + 1,
        value: startChar,
      };
    }

    const tokenType = `SourceCharacter`;
    let token = startChar;

    let newCursor = cursor;
    let checkChar = startChar;
    let checkUnicode = updateCheckpoints(checkChar);

    while (
      !whitespaceCodes.includes(checkUnicode) &&
      !sortedOtherPunctuatorStrings.includes(checkChar) &&
      !lineTerminatorCodes.includes(checkUnicode)
    ) {
      if (sortedReservedWordStrings.includes(token)) {
        return {
          tokenType: "ReservedWord",
          nextCursor: newCursor + 1,
          value: token,
        };
      }

      newCursor++;
      checkChar = input[newCursor];
      checkUnicode = updateCheckpoints(checkChar);
      token = token.concat(input[newCursor]);
    }

    return {
      tokenType: `SourceCharacter`,
      nextCursor: cursor +1,
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
function updateCheckpoints(checkChar) {
  let checkCharCodePoint = getCodepoint(checkChar);
  let checkUnicode = getUnicodeString(checkCharCodePoint);
  return { checkUnicode };
}

function getUnicodeString(firstCharCodePoint) {
  return (
    "u" +
    "0000".substring(0, 4 - firstCharCodePoint.length) +
    firstCharCodePoint
  );
}

function getCodepoint(startChar) {
  return startChar.codePointAt().toString(16);
}
