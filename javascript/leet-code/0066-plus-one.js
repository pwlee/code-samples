// https://leetcode.com/problems/plus-one/
//
// Given a non-empty array of digits representing a non-negative integer, plus one
// to the integer.
// 
// The digits are stored such that the most significant digit is at the head of the
// list, and each element in the array contain a single digit.
// 
// You may assume the integer does not contain any leading zero, except the number
// 0 itself.
// 
// Example 1:
// 
// Input: [1,2,3]
// Output: [1,2,4]
// Explanation: The array represents the integer 123.
// Example 2:
// 
// Input: [4,3,2,1]
// Output: [4,3,2,2]
// Explanation: The array represents the integer 4321.

/**
 * @param {number[]} digits
 * @return {number[]}
 */
const plusOne = (digits) => {
  let hasOverFlow = false
  let digitIndex = digits.length - 1
  
  do {
    if (digits[digitIndex] === 9) {
      digits[digitIndex] = 0
      hasOverFlow = true
    } else {
      digits[digitIndex]++
      hasOverFlow = false
    }
    digitIndex--
  } while (digitIndex >= 0 && hasOverFlow)
    
  if (hasOverFlow) {
    digits.unshift(1)
  }
  
  return digits
}
