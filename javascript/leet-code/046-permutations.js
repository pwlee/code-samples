// https://leetcode.com/problems/permutations/
// 
// Given a collection of distinct integers, return all possible permutations.
// 
// Example:
// 
// Input: [1,2,3]
// Output:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = (nums) => {
  const permutations = []

  permuteRecursive(nums, [], permutations)
  
  return permutations
}

const permuteRecursive = (remainingNums, permutation, permutations) => {
  if (remainingNums.length === 0) {
    permutations.push(permutation)
  } else {
    for (let i = 0; i < remainingNums.length; i++) {
      const remainingNumsCopy = remainingNums.slice()
      const selectedValue = remainingNumsCopy.splice(i, 1)
      
      const permutationCopy = permutation.slice()
      permutationCopy.push(selectedValue[0])

      permuteRecursive(remainingNumsCopy, permutationCopy, permutations)
    }
  }
}
