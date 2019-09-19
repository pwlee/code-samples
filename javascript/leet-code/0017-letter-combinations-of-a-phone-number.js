// https://leetcode.com/problems/letter-combinations-of-a-phone-number/
// 
// Given a string containing digits from 2-9 inclusive, return all possible letter
// combinations that the number could represent.
// 
// A mapping of digit to letters (just like on the telephone buttons) is given below.
// Note that 1 does not map to any letters.
// 
// Example:
// 
// Input: "23"
// Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
// Note:
// 
// Although the above answer is in lexicographical order, your answer could be in
// any order you want.

const letterMap = {
  "2": ["a", "b", "c"],
  "3": ["d", "e", "f"],
  "4": ["g", "h", "i"],
  "5": ["j", "k", "l"],
  "6": ["m", "n", "o"],
  "7": ["p", "q", "r", "s"],
  "8": ["t", "u", "v"],
  "9": ["w", "x", "y", "z"]
}

const letterCombinations = (digits) => {
  const combinations = []
  
  if (digits.length > 0 && !digits.includes(1)) {
    letterCombinationsRecursive(digits, "", combinations)
  }

  return combinations
}

const letterCombinationsRecursive = (digits, currentString, combinations) => {
  if (digits === "") {
    combinations.push(currentString)
  } else {
    const possibleLetters = letterMap[digits[0]]
    
    for (let i = 0; i < possibleLetters.length; i++) {
      const possibleLetter = possibleLetters[i]

      letterCombinationsRecursive(digits.substring(1), currentString + possibleLetter, combinations)
    }
  }
}
