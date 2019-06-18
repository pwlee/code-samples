# https://leetcode.com/problems/letter-combinations-of-a-phone-number/
# 
# Given a string containing digits from 2-9 inclusive, return all possible letter
# combinations that the number could represent.
# 
# A mapping of digit to letters (just like on the telephone buttons) is given
# below. Note that 1 does not map to any letters.
# 
# Example:
# 
# Input: "23"
# Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
# Note:
# 
# Although the above answer is in lexicographical order, your answer could be in
# any order you want.

# @param {String} digits
# @return {String[]}

def letter_combinations(digits)
  letter_combinations_recursive(digits, "")
end

def letter_combinations_recursive(digits, combination)
  if digits.nil? || digits.empty?
    return combination.empty? ? [] : [combination]
  end

  digit = digits[0]
  remaining_digits = digits[1..digits.length-1]

  numbers_to_letters[digit].flat_map do |char|
    letter_combinations_recursive(remaining_digits, combination + char)
  end
end

def numbers_to_letters
  @numbers_to_letters ||= {
    "2" => ["a", "b", "c"],
    "3" => ["d", "e", "f"],
    "4" => ["g", "h", "i"],
    "5" => ["j", "k", "l"],
    "6" => ["m", "n", "o"],
    "7" => ["p", "q", "r", "s"],
    "8" => ["t", "u", "v"],
    "9" => ["w", "x", "y", "z"]
  }
end
