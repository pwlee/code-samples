import SnakeNode from './snake-node'

// TODO temporary include
import Point from './utilities/point'

import { NORTH, EAST, SOUTH, WEST } from './directions'

export default class Snake {
  constructor(point) {
    this.nodes = [new SnakeNode(point)]
    this.velocity = 4 // pixels per tick
    this.direction = EAST

    // TODO temporary
    for (let i = 1; i < 50; i++) {
      const newPoint = new Point(this.head().position.x - (10 * i), 200)
      const newNode = new SnakeNode(newPoint)

      this.nodes.push(newNode)
    }
  }

  head() {
    return this.nodes[0]
  }

  tail() {
    return this.nodes[this.nodes.length - 1]
  }

  // addNode() {
  //   const nextPoint = this.nextPoint()
  //   const newNode = new SnakeNode(nextPoint)
  //
  //   this.tail().add(newNode)
  // }

  // Given a snake with nodes which are positioned like:
  //       [2][1]->
  //       [3]
  // [6][5][4]
  //
  // We can move one 'step' forward by simply moving the
  // last node in front like:
  //       [2][1][6]->
  //       [3]
  //    [5][4]
  forward() {
    const newHead = this.tail()

    newHead.setPosition(this.nextPosition())
    this.nodes.pop()
    this.nodes.unshift(newHead)
  }

  nextPosition() {
    const newPosition = Object.assign(new Point(), this.head().position)

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
