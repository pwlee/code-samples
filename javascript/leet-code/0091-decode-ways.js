// https://leetcode.com/problems/decode-ways/
// 
// A message containing letters from A-Z is being encoded to numbers using the
// following mapping:
// 
// 'A' -> 1
// 'B' -> 2
// ...
// 'Z' -> 26
// Given a non-empty string containing only digits, determine the total number of
// ways to decode it.
// 
// Example 1:
// 
// Input: "12"
// Output: 2
// Explanation: It could be decoded as "AB" (1 2) or "L" (12).
// Example 2:
// 
// Input: "226"
// Output: 3
// Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

/**
 * @param {string} s
 * @return {number}
 */

const numDecoder = [null].concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""))

const numDecodings = (s) => {
  if (s === "") {
    return 0
  }
  
  return numDecodingsRecursive("", s, {})
}

const numDecodingsRecursive = (decodedString, remainingCode, memo) => {
  if (remainingCode === "") {
    return 1
  } else if (memo[remainingCode]) {
    return memo[remainingCode]
  } else {
    const nextChar = numDecoder[remainingCode[0]]
    const nextTwoChars = numDecoder[remainingCode[0] + remainingCode[1]]
    
    if (!nextChar && remainingCode.length > 1 && !nextTwoChars) {
      return 0
    }
    
    let numDecodings = 0
    if (nextChar) {
      numDecodings += numDecodingsRecursive(decodedString + nextChar, remainingCode.substr(1), memo)
    }
    if (nextTwoChars) {
      numDecodings += numDecodingsRecursive(decodedString + nextTwoChars, remainingCode.substr(2), memo)
    }
    
    memo[remainingCode] = numDecodings
    return memo[remainingCode]
  }
}
