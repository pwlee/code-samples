// https://leetcode.com/problems/longest-palindromic-substring/

// Given a string s, find the longest palindromic substring in s. You may assume
// that the maximum length of s is 1000.
// 
// Example 1:
// 
// Input: "babad"
// Output: "bab"
// Note: "aba" is also a valid answer.
//
// Example 2:
// 
// Input: "cbbd"
// Output: "bb"

const longestPalindrome = (s) => {
  const n = s.length
  let longestPalindrome = ""
  
  // Initialize the DP table as a 2D array
  // Note: initializing values as false is not required and is
  // only done for visualization purposes when printing the table
  const dp = []
  for (let i = 0; i < n; i++) {
    dp[i] = []

    for (let j = 0; j < n; j++) {
      dp[i][j] = false
    }
  }
  
  // Set the values for the base cases:
  // We know that all substrings of length 1 are palindromes
  for (let i = 0; i < n; i++) {
    dp[i][i] = true
    
    if (longestPalindrome.length < 1) {
      longestPalindrome = s[i]   
    }
  }
  
  // We know that all substrings of length 2 are palindromes if the two letters are equal
  for (let i = 0; i < n-1; i++) {
    if (s[i] == s[i+1]) {
      dp[i][i+1] = true   
      
      if (longestPalindrome.length < 2) {
        longestPalindrome = s.substr(i, 2)
      }
    }
  }
  
  // Now, check all substrings of K length (starting at 3)
  for (let k = 3; k <= n; k++) {
    // Starting from the beginning of the string, and ending when the K length substring
    // hits the end of the string
    for (let i = 0; i < n-k+1; i++) {
      const j = i+k-1

      if (dp[i+1][j-1] && s[i] == s[j]) {
        dp[i][j] = true
        
        if (longestPalindrome.length < k) {
          longestPalindrome = s.substr(i, k)
        }
      }
    }
  }

  return longestPalindrome
}
