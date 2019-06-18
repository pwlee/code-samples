# https://leetcode.com/problems/longest-common-prefix/
#
# Write a function to find the longest common prefix string amongst an
# array of strings.
#
# If there is no common prefix, return an empty string "".
#
# Example 1:
# 
# Input: ["flower","flow","flight"]
# Output: "fl"
# Example 2:
# 
# Input: ["dog","racecar","car"]
# Output: ""
# Explanation: There is no common prefix among the input strings.
# Note:
#
# All given inputs are in lowercase letters a-z.

# @param {String[]} strs
# @return {String}

def longest_common_prefix(strs)
  return "" if strs.empty?

  prefix = ""
  index = 0

  while chars_at_index_are_same?(strs, index)
    prefix += strs[0][index]
    index += 1
  end

  prefix
end

def chars_at_index_are_same?(strs, index)
  first_char = nil

  strs.each do |str|
    return false unless str[index]
    first_char ||= str[index]
    return false if first_char != str[index]
  end

  true
end
