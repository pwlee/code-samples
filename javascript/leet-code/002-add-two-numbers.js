// https://leetcode.com/problems/add-two-numbers/

// You are given two non-empty linked lists representing two non-negative integers.
// The digits are stored in reverse order and each of their nodes contain a single
// digit. Add the two numbers and return it as a linked list.
// 
// You may assume the two numbers do not contain any leading zero, except the
// number 0 itself.
// 
// Example:
// 
// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8
// Explanation: 342 + 465 = 807.

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *   this.val = val;
 *   this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let leftNode = l1
  let rightNode = l2
  let previousOverflow = 0
  let sumList = null
  let sumListTail = null

  while(leftNode || rightNode) {
    let sum
    if (!leftNode) {
      sum = rightNode.val
    } else if (!rightNode) {
      sum = leftNode.val
    } else {
      sum = leftNode.val + rightNode.val
    }
    
    sum += previousOverflow
    previousOverflow = Math.floor(sum / 10)
    
    if (!sumList) {
      sumList = new ListNode(sum % 10)
      sumListTail = sumList
    } else {
      const newTail = new ListNode(sum % 10)
      sumListTail.next = newTail
      sumListTail = newTail
    }
    
    if (leftNode) { leftNode = leftNode.next }
    if (rightNode) { rightNode = rightNode.next }
  }
  
  if (previousOverflow >  0) {
    const newTail = new ListNode(previousOverflow)
    sumListTail.next = newTail
  }

  return sumList
}
