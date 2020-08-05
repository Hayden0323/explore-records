/**
 * http url
 */
const httpReg = /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/([\w\.]*))*([\?&]\w+=\w+)*$/

/**
 * 3 more words
 */
const wordReg = /(\w)\1{2,}/g

/**
 * hh:mm:ss
 */
const timeReg = /^((0?|1)\d|2[0-3]):((0?|[1-5])\d):((0?|[1-5])\d)/

/**
 * An arithmetical expression consists of 2 numbers and an operator between them, for instance:
 * The operator is one of: "+", "-", "*" or "/".
 * Create a function parse(expr) that takes an expression and returns an array of 3 items:
 * 1.The first number.
 * 2.The operator.
 * 3.The second number.
 */
function parse(expr) {
  let regexp = /(-?\d+(?:\.\d+)?)\s*([+-*\/])\s*(-?\d+(?:\.\d+)?)/

  let result = expr.match(regexp)

  if (!result) return []
  result.shift()

  return result
}
