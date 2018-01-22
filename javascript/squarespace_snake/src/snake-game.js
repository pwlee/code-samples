import Snake from "./snake"
import Point from "./point"
import { KEYCODES } from "./directions"

export default class SnakeGame {
  constructor() {
    this.loopHandle = null
    this.snake = null
  }

  start() {
    let center = new Point(200, 200)

    this.snake = new Snake(center)
    this.loopHandle = setInterval(this.onTick, 16) // 60 frames per second is approximately one fram every 16.666667 milliseconds
    document.onkeydown = this.onKeyDown
  }

  end() {
    clearInterval(this.loopHandle)
  }

  onTick = () => {
    this.snake.forward()
    // handle input?
    // render
    // game over?
  }

  onKeyDown = (e) => {
    if (KEYCODES[e.keyCode]) {
      this.snake.direction = KEYCODES[e.keyCode]
    }
  }
}
