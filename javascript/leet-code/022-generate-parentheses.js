// https://leetcode.com/problems/generate-parentheses/
// 
// Given n pairs of parentheses, write a function to generate all combinations of
// well-formed parentheses.
// 
// For example, given n = 3, a solution set is:
// 
// [
//   "((()))",
//   "(()())",
//   "(())()",
//   "()(())",
//   "()()()"
// ]

const generateParenthesis = (n) => {
  const combinations = []
  
  generateParenthesisRecursive(n, "", 0, 0, combinations)
  
  return combinations
}

const generateParenthesisRecursive = (n, parenString, numOpen, numClose, combinations) => {
  if (numOpen === n && numClose === n) {
    combinations.push(parenString)
    return
  }
  
  if (numOpen < n) {
    generateParenthesisRecursive(n, parenString + '(', numOpen + 1, numClose, combinations)
  }
  
  if (numClose < n && numClose < numOpen) {
    generateParenthesisRecursive(n, parenString + ')', numOpen, numClose + 1, combinations)
  }
}
