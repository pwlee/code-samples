// https://leetcode.com/problems/student-attendance-record-ii/
// 
// Given a positive integer n, return the number of all possible attendance records
// with length n, which will be regarded as rewardable. The answer may be very large,
// return it after mod 109 + 7.
// 
// A student attendance record is a string that only contains the following three
// characters:
// 
// 'A' : Absent.
// 'L' : Late.
// 'P' : Present.
// A record is regarded as rewardable if it doesn't contain more than one 'A' (absent)
// or more than two continuous 'L' (late).
// 
// Example 1:
// Input: n = 2
// Output: 8 
// Explanation:
// There are 8 records with length 2 will be regarded as rewardable:
// "PP" , "AP", "PA", "LP", "PL", "AL", "LA", "LL"
// Only "AA" won't be regarded as rewardable owing to more than one absent times. 
// 
// Note: The value of n won't exceed 100,000.

const MOD = 1000000007
// Note about modulo:
// As N increases, the number of possible attendance records gets REAL big.
// So big, in fact, that it goes past the max int value for 64-bit ints.
// Doing the modulo calculation at the very end of the algorithm results in
// rounding/trunctation errors since the actual number doesn't fit into an int.
// However, the modulo operator is distributable over addition, subtraction, and
// multiplication. E.G: (a+b+c) % x == (a%x) + (b%x) + (c%x). So instead of
// performing the modulo operation at the end, we can perform it before sticking
// in the memo hash.
// 
// For reference, see: https://www.geeksforgeeks.org/modulo-1097-1000000007/

/**
 * @param {number} n
 * @return {number}
 */
const checkRecord = (n) => {
  return checkRecordRecur(0, n, 0, 0, {})
}

const checkRecordRecur = (recordLength, n, absences, contLates, memo) => {
  if (absences > 1 || contLates > 2) {
    return 0
  } else if (recordLength === n) {
    return 1
  }
  
  const memoKey = toMemoKey(recordLength, absences, contLates)
  if (memo[memoKey]) {
    return memo[memoKey]
  } else {
    memo[memoKey] = (
      checkRecordRecur(recordLength + 1, n, absences + 1, 0, memo) +
      checkRecordRecur(recordLength + 1, n, absences, contLates + 1, memo) +
      checkRecordRecur(recordLength + 1, n, absences, 0, memo)
    ) % 1000000007
    
    return memo[memoKey]
  }
}

const toMemoKey = (recordLength, absences, contLates) => {
  return `${recordLength}-${absences}-${contLates}`
}
