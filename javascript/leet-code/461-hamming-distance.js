// https://leetcode.com/problems/hamming-distance/
//
// The Hamming distance between two integers is the number of positions at which
// the corresponding bits are different.
// 
// Given two integers x and y, calculate the Hamming distance.
// 
// Note:
// 0 ≤ x, y < 231.
// 
// Example:
// 
// Input: x = 1, y = 4
// 
// Output: 2
// 
// Explanation:
// 1   (0 0 0 1)
// 4   (0 1 0 0)
//        ↑   ↑
// 
// The above arrows point to positions where the corresponding bits are different.

/**
 * @param {number} x
 * @param {number} y
 * @return {number}
 */
const hammingDistance = (x, y) => {
  const bin1 = binary(x)
  const bin2 = binary(y)
  
  let diff = 0

  for (let i = 0; i < bin1.length || i < bin2.length; i++) {
    const digit1 = bin1[i] || 0
    const digit2 = bin2[i] || 0
    
    if (digit1 !== digit2) {
      diff++
    }
  }
  
  return diff
}

const binary = (num) => {
  const converted = []
  
  let pow = Math.floor(Math.log2(num))
  let remainder = num
  
  while (pow >= 0) {
    if (Math.pow(2, pow) <= remainder) {
      remainder -= Math.pow(2, pow)
      converted.push(1)
    } else {
      converted.push(0)
    }
    
    pow--
  }
  
  return converted.reverse()
}
