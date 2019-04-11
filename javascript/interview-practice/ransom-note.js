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

function canConstruct(ransomNote, magazine) {
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

function buildWordCounts(input) {
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

// const magazine = "dog owners across the us are happy to give up to one walk per day but they say some dogs want dog"
// const ransomNote = "dog owners happy dog day"

// console.log(buildWordCounts(magazine))
// console.log(canCreateRansomNote(magazine, ransomNote))
