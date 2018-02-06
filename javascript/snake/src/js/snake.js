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

  // ----------------------------------------------------------
  // -----------------------  Public  -------------------------
  // ----------------------------------------------------------
  head() {
    return this.nodes[0]
  }

  body() {
    return this.nodes.slice(1, this.nodes.length)
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
    const nextPosition = this._nextPosition()

    this.nodes.unshift(this.nodes.pop())
    this.head().position = nextPosition
  }

  grow() {
    const nextPoint = this._nextPosition()
    const newNode = new SnakeNode({position: nextPoint})

    this.nodes.unshift(newNode)
  }

  // ----------------------------------------------------------
  // -----------------------  Private  ------------------------
  // ----------------------------------------------------------
  // Based on the velocity, determine where the head will go next
  _nextPosition() {
    const position = Object.assign(new Point(), this.head().position)

    switch (this.direction) {
      case NORTH:
        position.y -= this.velocity
        break
      case EAST:
        position.x += this.velocity
        break
      case SOUTH:
        position.y += this.velocity
        break
      case WEST:
        position.x -= this.velocity
        break
    }

    return position
  }
}
