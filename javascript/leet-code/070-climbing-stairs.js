// https://leetcode.com/problems/climbing-stairs/
//
// You are climbing a stair case. It takes n steps to reach to the top.
// 
// Each time you can either climb 1 or 2 steps. In how many distinct ways can you
// climb to the top?
// 
// Note: Given n will be a positive integer.
// 
// Example 1:
// 
// Input: 2
// Output: 2
// Explanation: There are two ways to climb to the top.
// 1. 1 step + 1 step
// 2. 2 steps
// Example 2:
// 
// Input: 3
// Output: 3
// Explanation: There are three ways to climb to the top.
// 1. 1 step + 1 step + 1 step
// 2. 1 step + 2 steps
// 3. 2 steps + 1 step

// ---------------------------------------------------------
// Recursive solution with memoization (Dynamic Programming)
// ---------------------------------------------------------
const climbStairs = (n) => {
  return climbStairsRecursively(n, {})
}

const climbStairsRecursively = (n, memo) => {
  if (n === 0) {
    return 1
  } else if (n < 0) {
    return 0
  } else if (typeof memo[n] !== 'undefined') {
    return memo[n]
  } else {
    memo[n] = climbStairsRecursively(n-1, memo) + climbStairsRecursively(n-2, memo)
    return memo[n]
  }
}

// --------------------------------------------------------
// Iterative solution with tabulation (Dynamic Programming)
// --------------------------------------------------------
// To get to the Nth step, you can take 1 step from the Nth - 1 step
// or you can take 2 steps from the Nth - 2 step.
const climbStairs = (n) => {
  const dp = [0, 1, 2]
  
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2]
  }
  
  return dp[n]
}
