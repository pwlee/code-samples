// https://leetcode.com/problems/minimum-path-sum/
//
// Given a m x n grid filled with non-negative numbers, find a path from top
// left to bottom right which minimizes the sum of all numbers along its path.
// 
// Note: You can only move either down or right at any point in time.
// 
// Example:
// 
// Input:
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// Output: 7
// Explanation: Because the path 1→3→1→1→1 minimizes the sum.

// ---------------------------------------------------------
// Iterative Solution Using Tabulation (Dynamic Programming)
// ---------------------------------------------------------
// You can think of it like this. For this 2 by 2 grid:
// [
//   [1,3],
//   [1,5]
// ]
// The only way to get to the bottom-right is to come
// from the top-right or bottom-left. The top-right has
// a weighted path of 4 while the bottom-left has a
// weighted path of 2. If we want to minimize the path weight,
// we'd want to come from the bottom-right.
//
// So the generated DP table looks like:
// [
//   [1, 4],
//   [2, 7]
// ]
const minPathSum = (grid) => {
  const m = grid.length
  const n = grid[0].length
  
  // Set up the DP table as 2D array
  const dp = new Array(m)
  for (let i = 0; i < m; i++) {
    dp[i] = new Array(n).fill(0)
  }
  
  // Fill in the base cases
  // A 1 by 1 grid's shortest path is just the cell weight
  dp[0][0] = grid[0][0]
  
  // An m by 1 grid's shortest path is just the sum of the weights
  for (let i = 1; i < m; i++) {
    dp[i][0] = dp[i-1][0] + grid[i][0]
  }
  
  // A by n grid's shortest path is also just the sum of the weights
  for (let i = 1; i < n; i++) {
    dp[0][i] = dp[0][i-1] + grid[0][i]
  }
  
  // Now we can fill in the table using the logic outline above
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
    }
  }
  
  return dp[m-1][n-1]
}
