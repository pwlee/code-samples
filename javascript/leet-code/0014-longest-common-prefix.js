// https://leetcode.com/problems/longest-common-prefix

// Write a function to find the longest common prefix string amongst an array of strings.
// 
// If there is no common prefix, return an empty string "".
// 
// Example 1:
// 
// Input: ["flower","flow","flight"]
// Output: "fl"
// Example 2:
// 
// Input: ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.
// Note:
// 
// All given inputs are in lowercase letters a-z.

/**
 * @param {string[]} strs
 * @return {string}
 */

const longestCommonPrefix = (strs) => {
  if (strs.length == 0) { return "" }

  let commonPrefix = ""
  let keepItGoing = true
  let letterIndex = 0
  
  while(keepItGoing) {
    const commonLetter = strs[0][letterIndex]

    for (const word of strs) {
      if (letterIndex >= word.length || word[letterIndex] !== commonLetter) {
        keepItGoing = false
        break
      }
    }
    
    if (!keepItGoing) {
      break
    }
    
    commonPrefix += commonLetter
    letterIndex++
  }
  
  return commonPrefix
}
