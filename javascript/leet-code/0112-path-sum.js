// https://leetcode.com/problems/path-sum/
// 
// Given a binary tree and a sum, determine if the tree has a root-to-leaf path such
// that adding up all the values along the path equals the given sum.
// 
// Note: A leaf is a node with no children.
// 
// Example:
// 
// Given the below binary tree and sum = 22,
// 
//       5
//      / \
//     4   8
//    /   / \
//   11  13  4
//  /  \      \
// 7    2      1
// return true, as there exist a root-to-leaf path 5->4->11->2 which sum is 22.

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
const hasPathSum = (root, sum) => {
  return hasPathSumRecursive(root, 0, sum)
}

const hasPathSumRecursive = (node, currentSum, targetSum) => {
  if (node === null) {
    return false
  }

  const updatedSum = currentSum + node.val

  if (node.left === null && node.right === null) {
    return updatedSum === targetSum
  } else {
    return hasPathSumRecursive(node.left, updatedSum, targetSum) ||
           hasPathSumRecursive(node.right, updatedSum, targetSum) 
  }
}
