// https://leetcode.com/problems/merge-k-sorted-lists/
//
// Merge k sorted linked lists and return it as one sorted list. Analyze and
// describe its complexity.
// 
// Example:
// 
// Input:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// Output: 1->1->2->3->4->4->5->6
class MinHeap {
  constructor() {
    this.data = []
  }

  // Index helpers
  leftChildIndex(index)  { return index * 2 + 1 }
  rightChildIndex(index) { return index * 2 + 2 }
  parentIndex(index)     { return Math.floor((index - 1) / 2) }
  
  // Existence helpers
  hasLeftChild(index)  { return this.leftChildIndex(index) < this.data.length }
  hasRightChild(index) { return this.rightChildIndex(index) < this.data.length }
  hasParent(index)     { return this.parentIndex(index) >= 0 }

  // Access helpers
  leftChild(index)  { return this.data[this.leftChildIndex(index)] }
  rightChild(index) { return this.data[this.rightChildIndex(index)] }
  parent(index)     { return this.data[this.parentIndex(index)] }

  insert(node) {
    this.data.push(node)
    this.heapifyUp()
  }

  extractMin() {
    const min = this.data[0] || null
    const lastItem = this.data.pop()
    
    if (this.data.length > 0) {
      this.data[0] = lastItem
      this.heapifyDown()
    }

    return min
  }

  heapifyUp() {
    let index = this.data.length - 1
    
    while (this.hasParent(index)) {
      if (this.data[index].val < this.parent(index).val) {
        this.swap(index, this.parentIndex(index))
        index = this.parentIndex(index)
      } else {
        return
      }
    }
  }
  
  heapifyDown() {
    let index = 0

    while (this.hasLeftChild(index)) {
      let smallerChildIndex = this.leftChildIndex(index)
      if (this.hasRightChild(index) && this.rightChild(index).val < this.leftChild(index).val) {
        smallerChildIndex = this.rightChildIndex(index)
      }

      if (this.data[index].val >= this.data[smallerChildIndex].val) {
        this.swap(index, smallerChildIndex)
        index = smallerChildIndex
      } else {
        return
      }
    }
  }
  
  swap(index1, index2) {
    const temp = this.data[index1]

    this.data[index1] = this.data[index2]
    this.data[index2] = temp
  }
}

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
const mergeKLists = (lists) => {
  if (lists.length === 0) {
    return null
  }

  // A MinHeap preserves the minimum value at the root, so we can insert every
  // node into a MinHeap and then continually extract the min value (root) to
  // build the new sorted list
  const minHeap = new MinHeap()
  
  // Add each node in each list to the MinHeap
  for (let i = 0; i < lists.length; i++) {
    let listNode = lists[i]
    
    while (listNode) {
      minHeap.insert(listNode)
      listNode = listNode.next
    }
  }

  // Store a reference to the head of the list so that we can return it
  const sortedHead = minHeap.extractMin()

  // Now continually extract the min from the MinHeap and build the list
  let currentNode = sortedHead
  while (currentNode) {
    const nextNode = minHeap.extractMin()
    
    currentNode.next = nextNode
    currentNode = nextNode
  }
  
  return sortedHead
}
