 // https://leetcode.com/problems/binary-tree-level-order-traversal-ii/
// 
// Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).
// 
// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its bottom-up level order traversal as:
// [
//   [15,7],
//   [9,20],
//   [3]
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
const levelOrderBottom = (root) => {
  const values = []

  levelOrderRecursive(root, values, 0)
  
  return values.reverse()
}

const levelOrderRecursive = (node, values, depth) => {
  if (node === null) {
    return
  }
  
  values[depth] = values[depth] || []
  values[depth].push(node.val)
  
  levelOrderRecursive(node.left, values, depth + 1)
  levelOrderRecursive(node.right, values, depth + 1)
}
