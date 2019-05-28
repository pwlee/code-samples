// https://leetcode.com/problems/binary-tree-level-order-traversal/
// 
// Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).
// 
// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its level order traversal as:
// [
//   [3],
//   [9,20],
//   [15,7]
// ]

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = (root) => {
  const levels = []
  
  levelOrderRecursive(root, 0, levels)
  
  return levels
}

const levelOrderRecursive = (node, depth, levels) => {
  if (node === null) {
    return
  }
  
  levels[depth] = levels[depth] || []
  levels[depth].push(node.val)
  
  levelOrderRecursive(node.left, depth + 1, levels)
  levelOrderRecursive(node.right, depth + 1, levels)
}
