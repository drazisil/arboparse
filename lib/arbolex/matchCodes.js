const whitespaceCodes = {
  tokenType: "WhiteSpace",
  values: ["u0009", "u000b", "u000c", "u0020", "u00a0", "uufeff"],
};
const lineTerminatorCodes = {
  tokenType: "LineTerminator",
  values: ["u000a", "u000d", "u2028", "u2029"],
};
const otherPunctuatorStrings = {
  tokenType: "Punctuator",
  values: [
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
  ],
};
const rightBracePunctuatorCodes = {
  tokenType: "Punctuator",
  values: ["u007d"],
};
const singleStringCharactersCodes = {
  tokenType: 'StringLiteral',
  values:  ["u0027"]}
const reservedWordStrings = {
  tokenType: "ReservedWord",
  values: ["const"],
};

module.exports = {
  whitespaceCodes,
  lineTerminatorCodes,
  otherPunctuatorStrings,
  rightBracePunctuatorCodes,
  singleStringCharactersCodes,
  reservedWordStrings,
};
