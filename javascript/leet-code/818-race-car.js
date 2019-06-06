// https://leetcode.com/problems/race-car/
// 
// Your car starts at position 0 and speed +1 on an infinite number line.  (Your car
// can go into negative positions.)
// 
// Your car drives automatically according to a sequence of instructions A (accelerate)
// and R (reverse).
// 
// When you get an instruction "A", your car does the following:
// position += speed, speed *= 2.
// 
// When you get an instruction "R", your car does the following: if your speed is
// positive then speed = -1 , otherwise speed = 1.  (Your position stays the same.)
// 
// For example, after commands "AAR", your car goes to positions 0->1->3->3, and
// your speed goes to 1->2->4->-1.
// 
// Now for some target position, say the length of the shortest sequence of
// instructions to get there.
// 
// Example 1:
// Input: 
// target = 3
// Output: 2
// Explanation: 
// The shortest instruction sequence is "AA".
// Your position goes from 0->1->3.
// Example 2:
// Input: 
// target = 6
// Output: 5
// Explanation: 
// The shortest instruction sequence is "AAARA".
// Your position goes from 0->1->3->7->7->6.
// 
// 
// Note:
// 
// 1 <= target <= 10000.

/**
 * @param {number} target
 * @return {number}
 */

class Node {
  constructor(position, speed) {
    this.position = position
    this.speed = speed
  }
  
  toKey() {
    return `${this.position}-${this.speed}`
  }
}

const accelerate = (node) => {
  return new Node(node.position + node.speed, node.speed * 2)
}

const reverse = (node) => {
  return new Node(node.position, node.speed > 0 ? -1 : 1)
}

// Use BFS. For a current position and speed, we can generate its
// "neighbors" by applying the "accelerate" and "reverse" ruleset.
const racecar = (target) => {
  const neighbors = [new Node(0, 1)]
  const visited = {}
  
  let pathLength = 0
  
  while (neighbors.length > 0) {
    const numNeighbors = neighbors.length

    for (let i = 0; i < numNeighbors; i++) {
      const currentNode = neighbors.shift()

      if (currentNode.position === target) {
        return pathLength
      }
      
      const accelerateNode = accelerate(currentNode)
      if (!visited[accelerateNode.toKey()]) {
        neighbors.push(accelerateNode)
        visited[accelerateNode.toKey()] = true
      }
      
      const reverseNode = reverse(currentNode)
      if (!visited[reverseNode.toKey()]) {
        neighbors.push(reverseNode)
        visited[reverseNode.toKey()] = true
      }
    }

    pathLength++
  }
}
