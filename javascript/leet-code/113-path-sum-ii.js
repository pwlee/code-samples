// https://leetcode.com/problems/path-sum-ii/
// 
// Given a binary tree and a sum, find all root-to-leaf paths where each path's sum
// equals the given sum.
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
//  /  \    / \
// 7    2  5   1
// Return:
// 
// [
//    [5,4,11,2],
//    [5,8,4,5]
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
 * @param {number} sum
 * @return {number[][]}
 */
const pathSum = (root, sum) => {
  const paths = []

  pathSumRecursive(root, 0, [], paths, sum)

  return paths
}

const pathSumRecursive = (node, currentSum, currentPath, paths, targetSum) => {
  if (node === null) {
    return
  }
  
  currentPath.push(node.val)
  const currentPathSum = currentSum + node.val
  
  if (!node.left && !node.right) {
    if (currentPathSum === targetSum) {
      paths.push(currentPath)
    }
  } else {
    pathSumRecursive(node.left, currentPathSum, currentPath.slice(), paths, targetSum)
    pathSumRecursive(node.right, currentPathSum, currentPath.slice(), paths, targetSum)
  }
}
