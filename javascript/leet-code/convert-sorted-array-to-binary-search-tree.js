// https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
//
// Given an array where elements are sorted in ascending order, convert it to a height balanced BST.
// 
// For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.
// 
// Example:
// 
// Given the sorted array: [-10,-3,0,5,9],
// 
// One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:
// 
//       0
//      / \
//    -3   9
//    /   /
//  -10  5

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
const sortedArrayToBST = (nums) => {
  if (nums.length === 0) {
    return null
  }
  
  const rootVal = extractMidVal(nums)
  const rootNode = new TreeNode(rootVal)

  sortedArrayToBSTRecursive(nums, rootNode)
  
  return rootNode
}

const sortedArrayToBSTRecursive = (nums, parentNode) => {
  if (nums === null || nums.length === 0) {
    return
  }
  
  const [leftNums, rightNums] = splitArray(nums)
  const leftMidVal = extractMidVal(leftNums)
  const rightMidVal = extractMidVal(rightNums)
  
  if (typeof leftMidVal !== 'undefined') {
    parentNode.left = new TreeNode(leftMidVal)
    sortedArrayToBSTRecursive(leftNums, parentNode.left)
  }
  
  if (typeof rightMidVal !== 'undefined') {
    parentNode.right = new TreeNode(rightMidVal)
    sortedArrayToBSTRecursive(rightNums, parentNode.right)
  }
}

const extractMidVal = (nums) => {
  const midpoint = Math.floor(nums.length / 2)  
  const removedVals = nums.splice(midpoint, 1)
  
  return removedVals[0]
}

const splitArray = (array) => {
  const midpoint = Math.ceil(array.length / 2)
  const leftVals = array.slice(0, midpoint)
  const rightVals = array.slice(midpoint, array.length)
  
  return [leftVals, rightVals]
}
