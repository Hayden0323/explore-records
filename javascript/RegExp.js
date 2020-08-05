/**
 * find http url
 */
const httpReg = /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/([\w\.]*))*([\?&]\w+=\w+)*$/

/**
 * find 3 same words
 */
const wordReg = /(\w)\1{2,}/g

/**
 * find time-formated
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

/**
 * find programming language
 * for example:
 * 1. JavaScript
 * 2. C++
 */
const languageReg = /Java(Script)?|PHP|C(\+\+)?/g

/**
 * find matching bbtags
 * for example:
 * 1. [b]hello![/b]
 * 2. [quote]
        [url]http://google.com[/url]
      [/quote]
 */
const bbtagsReg = /\[(b|url|quote)\][\s\S]*?\[\/\1\]/g

/**
 * match exact tag
 * for example:
 * 1. <style>
 * 2. <style test="...">
 * 3. <styler>
 */
const exactReg = /<style(>|\s.*?>)/g

/**
 * find non negative integers
 * for example:
 * 1. 0
 * 2. 12
 * 3. -5
 * 4. -18
 */
const nonNegativeReg = /(?<!-)\d+/g
