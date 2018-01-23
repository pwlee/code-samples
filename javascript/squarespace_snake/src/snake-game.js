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
    const millisecondsPerFrame = 16 // Approximately 60 frames per second
    const center = new Point(200, 200)

    this.snake = new Snake(center)
    this.intervalId = setInterval(this.onTick.bind(this), millisecondsPerFrame)

    document.onkeydown = this.onKeyDown.bind(this)
  }

  end() {
    clearInterval(this.intervalId)
  }

  hasCollisions() {
    for (let node of this.snake.nodes) {
      if (node === this.snake.head) {
        continue
      }

      if (Collision.aabb(this.snake.head, node)) {
        console.log(node);
        console.log(this.snake.head);
        this.end()
      }
    }

    return false
  }

  onTick() {
    this.snake.forward()

    // if (this.hasCollisions()) {
    //   this.end()
    // }
  }

  onKeyDown(e){
    const newDirection = KEYCODES[e.keyCode]
    const isSameDirection = (newDirection === OPPOSITE_DIRECTIONS[this.snake.direction])

    if (isSameDirection) {
      return
    }

    if (newDirection) {
      this.snake.direction = newDirection
    }
  }
}
