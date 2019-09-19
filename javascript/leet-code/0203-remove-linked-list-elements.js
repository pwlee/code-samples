// https://leetcode.com/problems/remove-linked-list-elements/
//
// Remove all elements from a linked list of integers that have value val.
// 
// Example:
// 
// Input:  1->2->6->3->4->5->6, val = 6
// Output: 1->2->3->4->5

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
const removeElements = (head, val) => {
  let current = head
  let previous = null
  
  while (current) {
    if (current.val === val) {
      if (current === head) {
        head = head.next
      } else {
        previous.next = current.next
      }
    } else {
      previous = current
    }
    
    current = current.next
  }
  
  return head
}
