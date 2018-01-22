import Snake from './snake'
import Point from './point'
import { KEYCODES } from './directions'

export default class SnakeGame {
  constructor() {
    this._loopHandle = null
    this._snake = null
  }

  get snake() {
    return this._snake
  }

  set snake(snake) {
    this._snake = snake
  }

  start() {
    // Sixty frames per second is approximately
    // one frame every 16.666667 milliseconds
    const secondsPerFrame = 16
    const center = new Point(200, 200)

    this.snake = new Snake(center)
    this.loopHandle = setInterval(this.onTick, secondsPerFrame)

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
