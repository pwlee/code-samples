import Snake from './snake'
import Point from './point'
import { KEYCODES } from './directions'

export default class SnakeGame {
  constructor() {
    this.loopHandle = null
    this.snake = null
  }

  start() {
    let center = new Point(200, 200)

    this.snake = new Snake(center)
    this.loopHandle = setInterval(this.onTick, 16) // 60 frames per second is approximately one frame every 16.666667 milliseconds

    document.onkeydown = this.onKeyDown
  }

  end() {
    clearInterval(this.loopHandle)
  }

  onTick = () => {
    this.snake.forward()
    // render
    // game over?
  }

  onKeyDown = (e) => {
    let newDirection = KEYCODES[e.keyCode]

    if (newDirection) {
      this.snake.direction = newDirection
    }
  }
}
