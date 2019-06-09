// https://leetcode.com/problems/binary-tree-paths/
// 
// Given a binary tree, return all root-to-leaf paths.
// 
// Note: A leaf is a node with no children.
// 
// Example:
// 
// Input:
// 
//    1
//  /   \
// 2     3
//  \
//   5
// 
// Output: ["1->2->5", "1->3"]
// 
// Explanation: All root-to-leaf paths are: 1->2->5, 1->3

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
const binaryTreePaths = (root) => {
  const paths = []
  
  if (root) {
    binaryTreePathsRecursive(root, [], paths)
  }

  return paths
}

const binaryTreePathsRecursive = (node, path, paths) => {
  path.push(node.val)

  if (node.left === null && node.right === null) {
    paths.push(path.join("->"))
    return
  }

  if (node.left) {
    binaryTreePathsRecursive(node.left, path.slice(), paths)
  }
  
  if (node.right) {
    binaryTreePathsRecursive(node.right, path.slice(), paths)
  }
}
