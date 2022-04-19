/**
 * @export
 * @typedef {object} ArboToken
 * @property {number} seq
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
    let lastType = "";
    let currentToken = "";

    const charStream = inputString;

    const maxLength = charStream.length;
    let cursor = 0;

    while (cursor < maxLength) {
      const element = charStream[cursor];

      debug(`Checking ${element}`);
      const { tokenType, nextCursor, value } = this._getToken(
        charStream,
        cursor,
        currentToken
      );

    if (
        lastType === "Punctuator" &&
        tokenType !== "Punctuator"
      ) {
        lastType = tokenType;
        const newToken = {
          tokenType: lastType,
          value: element,
          tokenSoFar: currentToken,
        };
        currentToken = element;
        parts.push(newToken);
    } else if (lastType !== "ReservedWord" && tokenType == "ReservedWord") {
        lastType = tokenType;
        currentToken = currentToken.concat(element);
        const newToken = {
          tokenType: lastType,
          value: value,
          tokenSoFar: value,
        };
        currentToken = '';
        parts.push(newToken);
      }else if (tokenType == "SourceCharacter") {
        if (lastType !== "SourceCharacter") {
            currentToken = element
        } else {
            currentToken = currentToken.concat(element)
        }
        
        const newToken = {
          tokenType: tokenType,
          value: element,
          tokenSoFar: currentToken,
        };
        parts.push(newToken);
        lastType = tokenType;
      } else {
        lastType = tokenType;
        currentToken = element;
        const newToken = {
          tokenType,
          value: element,
          tokenSoFar: currentToken,
        };
        currentToken = element
        parts.push(newToken);
      }

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
   * @param {string} currentToken
   * @return { tokenType: string, nextCursor: number, currentToken: string }
   */
  _getToken(input, cursor, currentToken) {
    const thisChar = input[cursor]; /*?*/
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

    const reservedWordStrings = [
        'const'
    ]

    
    if (whitespaceCodes.includes(firstUnicode) ) {
      return {
        tokenType: "WhiteSpace",
        nextCursor: cursor + 1,
        value: currentToken.concat(thisChar),
      };
    }

    if (otherPunctuatorStrings.includes(thisChar) ) {
      return {
        tokenType: "Punctuator",
        nextCursor: cursor + 1,
        value: currentToken.concat(thisChar ),
      };
    }

    if (reservedWordStrings.includes(currentToken.concat(thisChar)) ) {
        return {
          tokenType: "ReservedWord",
          nextCursor: cursor + 1,
          value: currentToken.concat(thisChar ),
        };
      }
  

    if (lineTerminatorCodes.includes(firstUnicode)) {
      return {
        tokenType: "LineTerminator",
        nextCursor: cursor + 1,
        value: currentToken.concat(thisChar),
      };
    }

    return {
      tokenType: `SourceCharacter`,
      nextCursor: cursor + 1,
      value: currentToken.concat(thisChar),
    };
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
