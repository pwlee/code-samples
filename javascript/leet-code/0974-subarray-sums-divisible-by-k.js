// https://leetcode.com/problems/subarray-sums-divisible-by-k/
// 
// Given an array A of integers, return the number of (contiguous, non-empty)
// subarrays that have a sum divisible by K.
// 
// Example 1:
// 
// Input: A = [4,5,0,-2,-3,1], K = 5
// Output: 7
// Explanation: There are 7 subarrays with a sum divisible by K = 5:
// [4, 5, 0, -2, -3, 1], [5], [5, 0], [5, 0, -2, -3], [0], [0, -2, -3], [-2, -3]
// 
// 
// Note:
// 
// 1 <= A.length <= 30000
// -10000 <= A[i] <= 10000
// 2 <= K <= 10000

/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */

// Use DP to calculate total sum of elements between i, j.
// For instance, DP[2][5] holds the total sum of the elements
// between index 2 and 5. We can fill this table in O(n^2)
// time and we can scan the table for evenly divisible sums
// in O(n^2) time.
const subarraysDivByK = (A, K) => {
  const dp = new Array(A.length)
  for (let i = 0; i < A.length; i++) {
    dp[i] = new Array(A.length)
  }
  
  // Fill in the base cases: Sub arrays of one element
  for (let i = 0; i < A.length; i++) {
    dp[i][i] = A[i]
  }

  // Fill in the rest of the DP table using previous values
  for (let i = 0; i < A.length; i++) {
    for (let j = i+1; j < A.length; j++) {
      dp[i][j] = dp[i][j-1] + A[j]
    }
  }

  // Search the DP table for evenly divisible sums
  let count = 0
  for (let i = 0; i < A.length; i++) {
    for (let j = i; j < A.length; j++) {
      if (dp[i][j] % K === 0) {
        count++
      }
    }
  }
  
  return count
}
