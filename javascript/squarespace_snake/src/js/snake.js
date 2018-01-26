// TODO: DONE

import SnakeNode from './snake-node'
import Point from './utilities/point'
import { NORTH, EAST, SOUTH, WEST } from './utilities/directions'

export default class Snake {
  constructor(startPoint, startSize = 20) {
    this.nodes = [new SnakeNode({position: startPoint})]
    this.velocity = 4 // pixels per tick
    this.direction = EAST

    Array(startSize).fill(0).forEach((i) => { this.grow() })
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

  render(canvas) {
    this.nodes.forEach((node) => {
      node.render(canvas)
    })
  }

  forward() {
    // We can move one 'step' forward by simply
    // moving the last node to the front. Ex:
    //       [b][a]->  ||     [b][a][e]->
    // [e][d][c]       ||  [d][c]
    const nextPosition = this.nextPosition()

    this.nodes.unshift(this.nodes.pop())
    this.head().position = nextPosition
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
