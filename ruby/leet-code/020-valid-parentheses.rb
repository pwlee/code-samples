# https://leetcode.com/problems/valid-parentheses/
#
# Given a string containing just the characters '(', ')', '{', '}', '[' and ']',
# determine if the input string is valid.
# 
# An input string is valid if:
# 
# Open brackets must be closed by the same type of brackets.
# Open brackets must be closed in the correct order.
# Note that an empty string is also considered valid.
# 
# Example 1:
# 
# Input: "()"
# Output: true
# Example 2:
# 
# Input: "()[]{}"
# Output: true
# Example 3:
# 
# Input: "(]"
# Output: false
# Example 4:
# 
# Input: "([)]"
# Output: false
# Example 5:
# 
# Input: "{[]}"
# Output: true

# @param {String} s
# @return {Boolean}
def is_valid(s)
  paren_stack = []

  while s.length > 0
    char = s.slice!(0)

    if opening_paren?(char)
      paren_stack << char
    elsif closing_paren?(char)
      open_paren = paren_stack.pop

      return false if mismatched_pair?(open_paren, char)
    else
      puts "Unrecognized char: #{char}"
    end
  end
  
  paren_stack.size === 0
end

def opening_chars
  @opening_chars ||= {
    "(" => true,
    "[" => true,
    "{" => true
  }
end

def closing_pairs
  @closing_pairs ||= {
    ")" => "(",
    "]" => "[",
    "}" => "{",
  }
end

def opening_paren?(char)
  opening_chars[char]
end

def closing_paren?(char)
  closing_pairs[char]
end

def mismatched_pair?(open, close)
  closing_pairs[close] != open
end
