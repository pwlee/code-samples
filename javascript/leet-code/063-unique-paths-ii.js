// https://leetcode.com/problems/unique-paths-ii/

// A robot is located at the top-left corner of a m x n grid (marked 'Start'
// in the diagram below).
// 
// The robot can only move either down or right at any point in time. The robot
// is trying to reach the bottom-right corner of the grid (marked 'Finish' in
// the diagram below).
// 
// Now consider if some obstacles are added to the grids. How many unique paths
// would there be?

// An obstacle and empty space is marked as 1 and 0 respectively in the grid.
// 
// Note: m and n will be at most 100.
// 
// Example 1:
// 
// Input:
// [
//   [0,0,0],
//   [0,1,0],
//   [0,0,0]
// ]
// Output: 2
// Explanation:
// There is one obstacle in the middle of the 3x3 grid above.
// There are two ways to reach the bottom-right corner:
// 1. Right -> Right -> Down -> Down
// 2. Down -> Down -> Right -> Right

// The same intuition from the previous 'Unique Paths' problem
// (https://leetcode.com/problems/unique-paths/) still applies. You can account
// for the obstacles by pre-filling their entries in the DP table with a value of 0.
// That is, there are no unique paths that lead to a cell with an obstacle on it.

const uniquePathsWithObstacles = (obstacleGrid) => {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length
  
  // Initialize the DP table as a 2D array
  const dp = []
  for (let i = 0; i < m; i++) {
    dp[i] = []
  }
  
  // Pre-fill 0 values in DP table for obstacle cells
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i][j] = 0
      }
    }
  }
  
  // Set values for the base cases:
  
  // When width is 1:
  // Base case set up is slightly different. If a row/column has an obstacle in it,
  // any subsequent rows can't be reached. Another way to express that is to fill
  // in the current cell using the previous value used. This will keep filling in 1
  // until we hit a cell whose value was pre-filled with 0
  for (let i = 0; i < m; i++) {
    if (typeof dp[i][0] === 'undefined') {
      dp[i][0] = typeof dp[i-1] !== 'undefined' ? dp[i-1][0] : 1
    }
  }
  
  // When height is 1:
  // Base case set up is slightly different. If a row/column has an obstacle in it,
  // any subsequent rows can't be reached. Another way to express that is to fill
  // in the current cell using the previous value used. This will keep filling in 1
  // until we hit a cell whose value was pre-filled with 0
  for (let i = 0; i < n; i++) {
    if (typeof dp[0][i] === 'undefined') {
      dp[0][i] = typeof dp[0][i-1] !== 'undefined' ? dp[0][i-1] : 1
    }
  }
  
  // Now fill in the DP table like you normally would.
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      // Obstacles have been pre-filled with 0, so skip those
      if (typeof dp[i][j] === 'undefined') {
        dp[i][j] = dp[i-1][j] + dp[i][j-1]
      }
    }   
  }

  return dp[m-1][n-1]
}
