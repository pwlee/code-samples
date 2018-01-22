import Snake from './snake'
import Point from './point'
import { KEYCODES } from './directions'

export default class SnakeGame {
  constructor() {
    this._snake = null
    this._walls = null
    this._food  = null
    this._loopHandle = null
  }

  get snake() {
    return this._snake
  }

  set snake(snake) {
    this._snake = snake
  }

  get loopHandle() {
    return this._loopHandle
  }

  set loopHandle(loopHandle) {
    this._loopHandle = loopHandle
  }

  start() {
    // Sixty frames per second is approximately
    // one frame every 16.66666667 milliseconds
    const secondsPerFrame = 16
    const center = new Point(200, 200)

    this.snake = new Snake(center)
    this.loopHandle = setInterval(this.onTick.bind(this), secondsPerFrame)

    document.onkeydown = this.onKeyDown.bind(this)
  }

  end() {
    clearInterval(this.loopHandle)
  }

  hasCollisions() {

  }

  onTick() {
    this.snake.forward()

    // if (this.hasCollisions()) {
    //   this.end()
    // }
  }

  onKeyDown(e){
    let newDirection = KEYCODES[e.keyCode]

    if (newDirection) {
      this.snake.direction = newDirection
    }
  }
}
