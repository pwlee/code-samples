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
  const subseqs1 = generateSubsequences(word1)
  const subseqs2 = generateSubsequences(word2)
  const longestCommonSubseq = findLongestCommonSubseq(subseqs1, subseqs2)
  
  return (
    deleteDistanceFrom(word1, longestCommonSubseq) +
    deleteDistanceFrom(word2, longestCommonSubseq)
  )
}

const generateSubsequences = (string) => {
  const subseqs = {}
  
  generateSubseqRecur(string.split(""), "", subseqs)
  
  return subseqs
}

const generateSubseqRecur = (remainingChars, subseq, subseqs) => {
  if (remainingChars.length === 0) {
    subseqs[subseq] = 1
    return
  }
  
  const newRemainingChars = remainingChars.slice()
  const nextChar = newRemainingChars.splice(0,1)[0]
  generateSubseqRecur(newRemainingChars, subseq, subseqs)
  generateSubseqRecur(newRemainingChars, subseq + nextChar, subseqs)
}

const findLongestCommonSubseq = (subseqs1, subseqs2) => {
  let longestCommonSubseq = ""
  
  for (const subseq1 in subseqs1) {
    if (subseqs2[subseq1] && subseq1.length > longestCommonSubseq.length) {
      longestCommonSubseq = subseq1
    }
  }
  
  return longestCommonSubseq
}

const deleteDistanceFrom = (word, subseq) => {
  let distance = 0
  let i = 0
  
  while (word !== subseq && word.length > 0) {
    if (word[i] === subseq[i]) {
      i++
    } else {
      word = removeCharAt(word, i)
      distance++
    }
  }
  
  return distance
}

const removeCharAt = (word, i) => {
  const chars = word.split("")
  chars.splice(i, 1)
  return chars.join("")
}
