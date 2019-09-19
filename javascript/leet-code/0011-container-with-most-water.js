// https://leetcode.com/problems/container-with-most-water/
// 
// Given n non-negative integers a1, a2, ..., an , where each represents a point at
// coordinate (i, ai). n vertical lines are drawn such that the two endpoints of
// line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms
// a container, such that the container contains the most water.
// 
// Note: You may not slant the container and n is at least 2.
// 
// [image]
// 
// The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this
// case, the max area of water (blue section) the container can contain is 49.
// 
// Example:
// 
// Input: [1,8,6,2,5,4,8,3,7]
// Output: 49

/**
 * @param {number[]} heights
 * @return {number}
 */

const maxArea = (heights) => {
  let largestArea = 0
  let left = 0
  let right = heights.length - 1
  
  while (left < right) {
    const width = right - left
    const height = Math.min(heights[left], heights[right])
    const area = width * height
    
    if (area > largestArea) {
      largestArea = area
    }
    
    if (heights[left] < heights[right]) {
      left++
    } else {
      right--
    }
  }
  
  return largestArea
}

// Brute Force
// const maxArea = (heights) => {
//   let largestArea = 0
  
//   for (let i = 0; i < heights.length; i++) {
//     for (let j = i + 1; j < heights.length; j++) {
//       const width = j - i
//       const height = Math.min(heights[i], heights[j])
//       const area = width * height
      
//       if (area > largestArea) {
//         largestArea = area
//       }
//     }
//   }
  
//   return largestArea
// }
