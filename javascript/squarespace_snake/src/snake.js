import SnakeNode from './snake-node'
import Point from './utilities/point'
import { NORTH, EAST, SOUTH, WEST } from './utilities/directions'

export default class Snake {
  constructor(point) {
    this.nodes = [new SnakeNode(point, 4, 4)]
    this.velocity = 4 // pixels per tick
    this.direction = EAST

    for (let i = 1; i < 5; i++) {
      this.grow()
    }
  }

  head() {
    return this.nodes[0]
  }

  body() {
    return this.nodes.slice(1, this.nodes.length)
  }

  tail() {
    return this.nodes[this.nodes.length - 1]
  }

  forward() {
    // Given a snake with nodes which are positioned like:
    //       [2][1]->
    //       [3]
    // [6][5][4]
    //
    // We can move one 'step' forward by simply moving the
    // last node to the front. Example:
    //       [2][1][6]->
    //       [3]
    //    [5][4]
    const newHead = this.nodes.pop()
    newHead.setPosition(this.nextPosition())
    this.nodes.unshift(newHead)
  }

  grow() {
    const nextPoint = this.nextPosition()
    const newNode = new SnakeNode(nextPoint, 4, 4)

    this.nodes.unshift(newNode)
  }

  // Based on the snake's velocity, determine where the head will go next
  nextPosition() {
    const newPosition = Object.assign(new Point(), this.head().position)

    // TODO: Cane we make this smaller?
    switch (this.direction) {
      case NORTH:
        newPosition.y -= this.velocity
        break
      case EAST:
        newPosition.x += this.velocity
        break
      case SOUTH:
        newPosition.y += this.velocity
        break
      case WEST:
        newPosition.x -= this.velocity
        break
    }

    return newPosition
  }
}
