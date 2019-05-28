// https://leetcode.com/problems/flower-planting-with-no-adjacent/
//
// You have N gardens, labelled 1 to N.  In each garden, you want to plant one of
// 4 types of flowers.
// 
// paths[i] = [x, y] describes the existence of a bidirectional path from garden x
// to garden y.
// 
// Also, there is no garden that has more than 3 paths coming into or leaving it.
// 
// Your task is to choose a flower type for each garden such that, for any two
// gardens connected by a path, they have different types of flowers.
// 
// Return any such a choice as an array answer, where answer[i] is the type of
// flower planted in the (i+1)-th garden.  The flower types are denoted 1, 2, 3,
// or 4.  It is guaranteed an answer exists.
// 
// Example 1:
// 
// Input: N = 3, paths = [[1,2],[2,3],[3,1]]
// Output: [1,2,3]
// Example 2:
// 
// Input: N = 4, paths = [[1,2],[3,4]]
// Output: [1,2,1,2]
// Example 3:
// 
// Input: N = 4, paths = [[1,2],[2,3],[3,4],[4,1],[1,3],[2,4]]
// Output: [1,2,3,4]
// 
// The key piece of information here is that "no garden that has more than 3 paths
// coming into or leaving it." Essentially, that means we can just check each
// gardern's neighbors and take the first available flower type.
// 
// We can work with this graph more easily if we store the data in an adjacency list.
// Given an input of: Input: N = 4, paths = [[1,2],[3,4]], the list would look like:
// (Remember that this is a bidirectional graph)
// 1: [2]
// 2: [1]
// 3: [4]
// 4: [3]
// 
// From here, the algorithm is fairly straightforward:
// - Build the adjacency list
// - For every garden, choose the first available flower type not taken by its
//   neighbors

/**
 * @param {number} N
 * @param {number[][]} paths
 * @return {number[]}
 */

const gardenNoAdj = (N, paths) => {
  const adjacencyList = []
  for (let i = 0; i < N; i++) {
    adjacencyList[i] = []
  }
  
  paths.forEach((path) => {
    const node1Index = path[0] - 1
    const node2Index = path[1] - 1

    adjacencyList[node1Index].push(node2Index)
    adjacencyList[node2Index].push(node1Index)
  })
  
  const flowerTypes = []
  adjacencyList.forEach((garden, i) => {
    flowerTypes[i] = firstAvailableFlowerType(garden, flowerTypes)
  })
  
  return flowerTypes
}

const firstAvailableFlowerType = (garden, flowerTypes) => {
  const possibleFlowerTypes = new Array(4).fill(true)
  
  garden.forEach((neighbor) => {
    const neighborsFlowerType = flowerTypes[neighbor]
    if (neighborsFlowerType) {
      possibleFlowerTypes[neighborsFlowerType - 1] = false
    }
  })
  
  for (let i = 0; i < possibleFlowerTypes.length; i++) {
    if (possibleFlowerTypes[i]) {
      return i+1
    }
  }
  
  throw "No available flowers"
}
