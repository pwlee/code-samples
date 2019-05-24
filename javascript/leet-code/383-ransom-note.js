// https://leetcode.com/problems/ransom-note

// Given an arbitrary ransom note string and another string containing letters 
// from all the magazines, write a function that will return true if the ransom
// note can be constructed from the magazines ; otherwise, it will return false.
// 
// Each letter in the magazine string can only be used once in your ransom note.
// 
// Note:
// You may assume that both strings contain only lowercase letters.

// canConstruct("a", "b") -> false
// canConstruct("aa", "ab") -> false
// canConstruct("aa", "aab") -> true

const canConstruct = (ransomNote, magazine) => {
  const magazineWordCounts = buildWordCounts(magazine)

  for (const word of ransomNote.split("")) {
    if (!magazineWordCounts[word] || magazineWordCounts[word] == 0) {
      return false
    } else {
      magazineWordCounts[word]--
    }
  }

  return true
}

const buildWordCounts = (input) => {
  const words = input.split("")
  const wordCounts = {}

  for (const word of words) {
    if (!wordCounts[word]) {
      wordCounts[word] = 1
    } else {
      wordCounts[word]++
    }
  }

  return wordCounts
}
