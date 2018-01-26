// TODO: DONE

import SnakeNode from './snake-node'
import Point from './utilities/point'
import { NORTH, EAST, SOUTH, WEST } from './utilities/directions'

export default class Snake {
  constructor(startPoint, snakeLength = 20) {
    this.nodes = [new SnakeNode({position: startPoint})]
    this.velocity = 4 // pixels per tick
    this.direction = EAST

    for (let i = 0; i < snakeLength - 1; i++) {
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
    //       [b][a]->
    // [e][d][c]
    //
    // We can move one 'step' forward by simply moving
    // the last node to the front.
    //       [b][a][e]->
    //    [d][c]
    const nextPosition = this.nextPosition()

    this.nodes.unshift(this.nodes.pop())
    this.head().setPosition(nextPosition)
  }

  grow() {
    const nextPoint = this.nextPosition()
    const newNode = new SnakeNode({position: nextPoint})

    this.nodes.unshift(newNode)
  }

  // Based on the snake's velocity, determine where the head will go next
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
