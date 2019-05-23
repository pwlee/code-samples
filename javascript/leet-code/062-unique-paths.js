// https://leetcode.com/problems/unique-paths/

// A robot is located at the top-left corner of a m x n grid (marked 'Start' in
// the diagram below).
// 
// The robot can only move either down or right at any point in time. The robot
// is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).
// 
// How many possible unique paths are there?

// Note: m and n will be at most 100.
// 
// Example 1:
// 
// Input: m = 3, n = 2
// Output: 3
// Explanation:
// From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
// 1. Right -> Right -> Down
// 2. Right -> Down -> Right
// 3. Down -> Right -> Right
// 
// Example 2:
// 
// Input: m = 7, n = 3
// Output: 28

// Normal recursive solution is way too slow.
// Runtime complexity: O(2^m) * O(2^n) = O(2^mn) (I think)
// Part of the reason why normal recursion is so slow is because we're doing redundant work.
// For m = 3 & n = 3, the recursive function calls look something like:

// countPaths(0, 0, 3, 3, memo)
// countPaths(1, 0, 3, 3, memo) + countPaths(0, 1, 3, 3, memo)
// countPaths(2, 0, 3, 3, memo) + countPaths(1, 1, 3, 3, memo) // repeat
// countPaths(1, 1, 3, 3, memo) + countPaths(0, 2, 3, 3, memo) // repeat
// ...

// So, a recursive solution which utilizes memoization dramatically
// reduces the number of calls. A good way to think about it is that, in the
// worst case, it takes O(mn) calls to fill the memo table completely.
// Space complexity: O(mn) for the memo table + Overhead for recursive function
// call stack (max depth of recursion tree)

// ---------------------------------------------------------------
// Begin Recursive Solution With Memoization (Dynamic Programming)
// ---------------------------------------------------------------
const uniquePaths = (m, n) => {
  if (m === 0 || n === 0) {
    return 0
  }

  // Store computed values
  const memo = []
  for (let i = 0; i < m; i++) {
    memo[i] = []
  }

  return countPaths(0, 0, m, n, memo)
}

const countPaths = (i, j, m, n, memo) => {
  if (i === m-1 && j === n-1) {
    return 1
  } else if (i >= m || j >= n) {
    return 0
  } else if (memo[i][j]) {
    return memo[i][j]
  } else {
    memo[i][j] = countPaths(i+1, j, m, n, memo) + countPaths(i, j+1, m, n, memo)
    return memo[i][j]
  }
}


// --------------------------------------------------------
// Iterative Solution With Tabulation (Dynamic Programming)
// --------------------------------------------------------
// Runtime complexity: O(mn)
// Space complexity: O(mn)
const uniquePaths = (m, n) => {
  // Initialize the DP table as a 2D array
  const dp = []
  for (let i = 0; i < m; i++) {
    dp[i] = []
    
    // Note: Initializing values as false is not required and is
    // only done for visualization purposes when printing the table
    for (let j = 0; j < n; j++) {
      dp[i][j] = 0
    }
  }
  
  // Set the values for the base cases:
  // When width is 1, it doesn't matter what the grid's height is, there's only one path
  for (let i = 0; i < n; i++) {
    dp[0][i] = 1
  }
  
  // When height is 1, it doesn't matter what the grid's width is, there's only one path
  for (let i = 0; i < m; i++) {
    dp[i][0] = 1
  }
  
  // At this point, we've filled out our DP table as follows:
  // (Indexes start at 1 for the sake of clarity)
  //
  //     1 | 2 | 3 | 4 | 5 | 6 | 7
  //    ---------------------------
  // 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1
  // 2 | 1 | ? | ? | ? | ? | ? | ? 
  // 3 | 1 | ? | ? | ? | ? | ? | ?
  //
  // Now, here's a question: Given a 2x2 grid, how many unique paths are there?
  // Or, another way to ask that is: for the DP table below, how do we figure
  // out the value of A?
  //
  //     1 | 2 | 3 | 4 | 5 | 6 | 7
  //    ---------------------------
  // 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1
  // 2 | 1 | A | B | C | ? | ? | ? 
  // 3 | 1 | ? | ? | ? | ? | ? | X
  //
  // Well, key intuition here comes from working backwards. If I want to get to A,
  // I have to come from the cell above it or from the cell to the left of it. We
  // know that there's only one unique path that leads to the cell above A, and we
  // know that there's only one uniqe path that leads to the cell to the left of A,
  // so there are two unique paths that lead to A.
  //
  //     1 | 2 | 3 | 4 | 5 | 6 | 7
  //    ---------------------------
  // 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1
  // 2 | 1 | 2 | B | C | ? | ? | ? 
  // 3 | 1 | ? | ? | ? | ? | ? | X
  //
  // Now, what's the value of B? C? And then finally, what's the value of X?
  
  // So now let's fill out the DP table using the logic above
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i][j-1] + dp[i-1][j]
    }
  }
  
  return dp[m-1][n-1]
}
