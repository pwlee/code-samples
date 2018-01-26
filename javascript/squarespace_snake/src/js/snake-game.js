import Snake from './snake'
import Wall from './wall'
import Food from './food'
import Point from './utilities/point'
import Collision from './utilities/collisions'
import { NORTH, EAST, SOUTH, WEST, KEYCODES, OPPOSITE_DIRECTIONS } from './utilities/directions'

export default class SnakeGame {
  constructor() {
    this.snake = null
    this.food = null
    this.walls = null
    this.intervalId = null
    this.canvas = this._setupCanvas()

    document.onkeydown = this._onKeyDown.bind(this)
    window.onresize = this._onResize.bind(this)
  }

  // ----------------------------------------------------------
  // -----------------------  Public  -------------------------
  // ----------------------------------------------------------
  start() {
    const center = new Point(this.canvas.width / 2, this.canvas.height / 2)

    this._hideModals()
    this.snake = new Snake(center)
    this.food = this._createFood()
    this.walls = this._createWalls()

    if (this.intervalId == null) {
      this.intervalId = setInterval(this._onTick.bind(this), 20)
    }
  }

  // ----------------------------------------------------------
  // -----------------------  Private  ------------------------
  // ----------------------------------------------------------
  _end() {
    document.getElementById('game-over').classList.remove('hide')
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  _createWalls() {
    return [NORTH, EAST, SOUTH, WEST].map((direction) => {
      return new Wall(direction)
    })
  }

  _createFood() {
    const randX = Math.floor(Math.random() * (this.canvas.width - 30))
    const randY = Math.floor(Math.random() * (this.canvas.height - 30))
    const randomPoint = new Point(randX + 10, randY + 10)

    return new Food({position: randomPoint})
  }

  _handleCollisions() {
    if (this._collidedWithDeath()) {
      this._end()
    }

    const collidedWithfood = Collision.aabb(this.snake.head(), this.food)
    if (collidedWithfood) {
      this.food = this._createFood()
      this.snake.grow()
    }
  }

  _collidedWithDeath() {
    const collidables = this.snake.body().concat(this.walls)

    return collidables.some((collidable) => {
      return Collision.aabb(this.snake.head(), collidable)
    })
  }

  _hideModals(element) {
    document.getElementById('intro').classList.add('hide')
    document.getElementById('game-over').classList.add('hide')
  }

  _setupCanvas() {
    const canvas = document.getElementById('game-frame')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    return canvas
  }

  _render() {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const renderables = this.walls.concat([this.snake, this.food])
    renderables.forEach((gameObject) => {
      gameObject.render(this.canvas)
    })
  }

  // Event Handlers
  _onTick() {
    this.snake.forward()
    this._render()
    this._handleCollisions()
  }

  _onKeyDown(e) {
    if (e.keyCode == 32) {
      return this.start()
    }

    if (this.snake == null) {
      return
    }

    const direction = KEYCODES[e.keyCode]
    const opposite = OPPOSITE_DIRECTIONS[this.snake.direction]

    if (direction && direction !== opposite) {
      this.snake.direction = direction
    }
  }

  _onResize() {
    this.walls = this._createWalls()
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this._render()
  }
}
