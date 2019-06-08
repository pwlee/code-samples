// https://leetcode.com/problems/combination-sum/
// 
// Given a set of candidate numbers (candidates) (without duplicates) and a
// target number (target), find all unique combinations in candidates where the
// candidate numbers sums to target.
// 
// The same repeated number may be chosen from candidates unlimited number of
// times.
// 
// Note:
// 
// All numbers (including target) will be positive integers.
// The solution set must not contain duplicate combinations.
// Example 1:
// 
// Input: candidates = [2,3,6,7], target = 7,
// A solution set is:
// [
//   [7],
//   [2,2,3]
// ]
// Example 2:
// 
// Input: candidates = [2,3,5], target = 8,
// A solution set is:
// [
//   [2,2,2,2],
//   [2,3,3],
//   [3,5]
// ]

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = (candidates, target) => {
  const uniqueSets = {}
  
  comSumRecur(candidates, [], 0, target, uniqueSets)

  return extractSolutions(uniqueSets)
}

const comSumRecur = (candidates, currentSet, currentSum, target, solutions) => {
  if (currentSum === target) {
    const setKey = toHashKey(currentSet)
    solutions[setKey] = true
    return
  } else if (currentSum > target) {
    return
  }
  
  for (const candidate of candidates) {
    const nextSet = currentSet.slice()
    nextSet.push(candidate)
    
    comSumRecur(candidates, nextSet, currentSum + candidate, target, solutions)
  }
}

const KEY_SEPARATOR = "|"

const toHashKey = (solutionSet) => {
  return solutionSet.sort((a,b) => a-b).join(KEY_SEPARATOR)
}

const extractSolutions = (sets) => {
  const solutions = []
  
  for (const key in sets) {
    solutions.push(key.split(KEY_SEPARATOR))
  }
  
  return solutions
}
