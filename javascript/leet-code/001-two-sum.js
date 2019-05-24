// https://leetcode.com/problems/two-sum

// Given an array of integers, return indices of the two numbers such that they
// add up to a specific target.
// 
// You may assume that each input would have exactly one solution, and you may
// not use the same element twice.
// 
// Example:
// 
// Given nums = [2, 7, 11, 15], target = 9,
// 
// Because nums[0] + nums[1] = 2 + 7 = 9,
// return [0, 1].

const twoSum = function(nums, target) {
  const mappedValues = {}

  // map each value to its index
  // { 2: 0, 7: 1, 11: 2, 15: 3 }
  for (let i = 0; i < nums.length; i++) {
    mappedValues[nums[i]] = i;
  }
  
  for (let i = 0; i < nums.length; i++) {
    const difference = target - nums[i]

    if (mappedValues[difference] && mappedValues[difference] !== i) {
      return [i, mappedValues[difference]]
    }
  }
  
  return []
}
