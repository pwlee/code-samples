import Snake from './snake'
import Point from './utilities/point'
import Collision from './utilities/collisions'
import { KEYCODES, OPPOSITE_DIRECTIONS } from './directions'

export default class SnakeGame {
  constructor() {
    this.snake = null
    this.walls = null
    this.food  = null
    this.intervalId = null
  }

  start() {
    const center = new Point(200, 200)

    this.snake = new Snake(center)
    this.intervalId = setInterval(this.onTick.bind(this), 20)

    document.onkeydown = this.onKeyDown.bind(this)
  }

  end() {
    clearInterval(this.intervalId)
  }

  checkForCollision() {
    for (let i = 1; i < this.snake.nodes.length; i++) {
      const currentNode = this.snake.nodes[i]
      const hasCollision = Collision.aabb(this.snake.head(), currentNode)

      if (hasCollision) {
        return true
      }
    }

    return false
  }

  onTick() {
    this.snake.forward()
    this.checkForCollision()
  }

  onKeyDown(e){
    const direction = KEYCODES[e.keyCode]
    const isSameDirection = (direction === OPPOSITE_DIRECTIONS[this.snake.direction])

    if (isSameDirection) {
      return
    }

    if (direction) {
      this.snake.direction = direction
    }
  }
}
