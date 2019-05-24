// https://leetcode.com/problems/longest-substring-without-repeating-characters

// Given a string, find the length of the longest substring without repeating characters.
// 
// Example 1:
// 
// Input: "abcabcbb"
// Output: 3 
// Explanation: The answer is "abc", with the length of 3. 
// Example 2:
// 
// Input: "bbbbb"
// Output: 1
// Explanation: The answer is "b", with the length of 1.
// Example 3:
// 
// Input: "pwwkew"
// Output: 3
// Explanation: The answer is "wke", with the length of 3. 
// Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

/**
 * @param {string} s
 * @return {number}
 */

// Note: This is not the most optimal solution. Current implementation is O(n^2).
// Using a "sliding window" improves runtime to O(n). See:
// https://leetcode.com/problems/longest-substring-without-repeating-characters/solution/
const lengthOfLongestSubstring = (s) => {
  let maxLength = 0
  
  for(let i = 0; i < s.length; i++) {
    let currentSubstring = ""
    let encounteredChars = {}

    for(let j = i; j < s.length; j++) {
      const currentChar = s[j]
      
      if (!encounteredChars[currentChar]) {
        currentSubstring += currentChar
        encounteredChars[currentChar] = true
        
        if (currentSubstring.length > maxLength) {
          maxLength = currentSubstring.length
        }
      } else {
        break
      }
    }  
  }
  
  return maxLength
}
