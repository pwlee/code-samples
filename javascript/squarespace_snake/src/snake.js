import SnakeNode from './snake-node'

// TODO temporary include
import Point from './point'

import { NORTH, EAST, SOUTH, WEST } from './directions'

export default class Snake {
  constructor(point) {
    this._nodes = [new SnakeNode(point)]
    this._velocity = 5 // pixels per tick
    this._direction = EAST

    // temporary
    for (let i = 1; i < 8; i++) {
      const newPoint = new Point(this.head.position.x - (10 * i), 200)

      this.nodes.push(newPoint)
    }
  }

  get nodes() {
    return this._nodes
  }

  get velocity() {
    return this._velocity
  }

  get head() {
    return this.nodes[0]
  }

  get tail() {
    return this.nodes[this.nodes.length - 1]
  }

  get direction() {
    return this._direction
  }

  set direction(direction) {
    this._direction = direction
  }

  addNode() {
    // const nextX = this.tail.position.x -
    const nextPoint = this.nextPoint()
    const newNode = new SnakeNode(nextPoint)

    this.tail.add(newNode)
  }

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
    const newPosition = this.head.position
    const newHead = this.tail

    switch (this._direction) {
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

    this.tail.position = newPosition
    this.nodes.pop()
    this.nodes.unshift(newHead)
  }
}
