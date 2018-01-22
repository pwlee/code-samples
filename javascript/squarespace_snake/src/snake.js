import { NORTH, EAST, SOUTH, WEST } from './directions'
import SnakeNode from './snake-node'

export default class Snake {
  constructor(point) {
    this._head = new SnakeNode(point)
    this._velocity = 3 // pixels per tick
    this._direction = EAST
  }

  get head() {
    return this._head
  }

  set head(head) {
    this._head = head
  }

  get velocity() {
    return this._velocity
  }

  forward() {
    let currentNode = this.head
    let newPosition = this.head.position

    switch (this._direction) {
      case NORTH:
        newPosition.y -= this.velocity
        break;
      case EAST:
        newPosition.x += this.velocity
        break;
      case SOUTH:
        newPosition.y += this.velocity
        break;
      case WEST:
        newPosition.x -= this.velocity
        break;
    }

    this.head.position = newPosition

    // while(currentNode) {
    //
    //   currentNode = currentNode.next
    // }
  }
}
