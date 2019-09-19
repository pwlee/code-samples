// https://leetcode.com/problems/delete-operation-for-two-strings/
// 
// Given two words word1 and word2, find the minimum number of steps required to
// make word1 and word2 the same, where in each step you can delete one character
// in either string.
// 
// Example 1:
// Input: "sea", "eat"
// Output: 2
// Explanation: You need one step to make "sea" to "ea" and another step to make
// "eat" to "ea".
// 
// Note:
// The length of given words won't exceed 500.
// Characters in given words can only be lower-case letters.

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
const minDistance = (word1, word2) => {
  if (word1 === "" && word2 === "") {
    return 0
  }

  const lcsLength = findLCSLength(word1, word2, 0, 0, [])

  // Once we know the lcs length, we can calculate how many letters need to be
  // deleted using the formula: s1.length + s2.length - (2 * lcs.length)
  // (we don't care about which letters need to be deleted, only how many)
  // Ex:
  //   word1: "hotdog"   (length: 6)
  //   word2: "snotlog"  (length: 7)
  //   lcs:   "otog"     (length: 4)
  //   dels:  5          (6 + 7) - (2 * 4)
  return word1.length + word2.length - (2 * lcsLength)
}

// Note: We don't actually care what the longest common subsequence is, we only
// care about its length. We can find the lcs recursively using two iterators (i, j).
// If the chars at each iterator match, add one and advance both iterators.
// If the chars don't match, we have two cases to consider:
// a) i is moved forward while j stays in place
// b) j is moved forward while i stays in place
// The max lcs length will be the max of those cases.
const findLCSLength = (word1, word2, i, j, memo) => {
  if (i == word1.length || j == word2.length) {
    return 0
  }
  
  memo[i] = memo[i] || []
  if (typeof memo[i][j] !== 'undefined') {
    return memo[i][j]
  }
  
  if (word1[i] === word2[j]) {
    memo[i][j] = 1 + findLCSLength(word1, word2, i+1, j+1, memo)
  } else {
    memo[i][j] = Math.max(
      findLCSLength(word1, word2, i+1, j, memo),
      findLCSLength(word1, word2, i, j+1, memo)
    )
  }
      
  return memo[i][j]
}
