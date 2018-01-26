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
    this.intervalId = null
    this.walls = this.createWalls()
    this.canvas = this.setupCanvas()

    document.onkeydown = this.onKeyDown.bind(this)
    window.onresize = this.onResize.bind(this)
  }

  start() {
    this.hideModals()
    this.snake = new Snake(new Point(200, 200))
    this.food = this.createFood()

    if (this.intervalId == null) {
      this.intervalId = setInterval(this.onTick.bind(this), 20)
    }
  }

  end() {
    document.getElementById('game-over').classList.remove('hide')
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  createWalls() {
    return [NORTH, EAST, SOUTH, WEST].map((direction) => {
      return new Wall(direction)
    })
  }

  createFood() {
    const randX = Math.floor(Math.random() * (window.innerWidth - 30))
    const randY = Math.floor(Math.random() * (window.innerHeight - 30))
    const randomPoint = new Point(randX + 10, randY + 10)

    return new Food({position: randomPoint})
  }

  handleCollisions() {
    if (this.collidedWithDeath()) {
      this.end()
    }

    const collidedWithfood = Collision.aabb(this.snake.head(), this.food)
    if (collidedWithfood) {
      this.food = this.createFood()
      this.snake.grow()
    }
  }

  collidedWithDeath() {
    const collidables = this.snake.body().concat(this.walls)

    return collidables.some((collidable) => {
      return Collision.aabb(this.snake.head(), collidable)
    })
  }

  hideModals(element) {
    document.getElementById('intro').classList.add('hide')
    document.getElementById('game-over').classList.add('hide')
  }

  setupCanvas() {
    const canvas = document.getElementById('game-frame')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    return canvas
  }

  render() {
    const ctx = this.canvas.getContext('2d')
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    const renderables = this.walls.concat([this.snake, this.food])
    renderables.forEach((gameObject) => {
      gameObject.render(this.canvas)
    })
  }

  // Event Handlers
  onTick() {
    this.snake.forward()
    this.render()
    this.handleCollisions()
  }

  onKeyDown(e) {
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

  onResize() {
    this.walls = this.createWalls()
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
    this.render()
  }
}
