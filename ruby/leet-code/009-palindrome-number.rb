# https://leetcode.com/problems/palindrome-number/
# 
# Determine whether an integer is a palindrome. An integer is a palindrome when
# it reads the same backward as forward.
# 
# Example 1:
# 
# Input: 121
# Output: true
# Example 2:
# 
# Input: -121
# Output: false
# Explanation: From left to right, it reads -121. From right to left, it becomes
# 121-. Therefore it is not a palindrome.
# Example 3:
# 
# Input: 10
# Output: false
# Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
# Follow up:
# 
# Coud you solve it without converting the integer to a string?

# @param {Integer} x
# @return {Boolean}

def is_palindrome(x)
  int_string = x.to_s
  left, right = 0, int_string.length - 1

  while left < right
    return false if int_string[left] != int_string[right]

    left += 1
    right -= 1
  end

  true
end
