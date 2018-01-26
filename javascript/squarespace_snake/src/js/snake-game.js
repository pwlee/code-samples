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
    this.walls = this.spawnWalls()
    this.introElement = document.getElementById('intro')
    this.gameOverElement = document.getElementById('game-over')

    document.onkeydown = this.onKeyDown.bind(this)
    window.onresize = this.onResize.bind(this)
  }

  start() {
    this.cleanup()
    this.hideModals()

    this.snake = new Snake(new Point(200, 200))
    this.food = this.spawnFood()

    if (this.intervalId == null) {
      this.intervalId = setInterval(this.onTick.bind(this), 20)
    }
  }

  end() {
    this.showModal(this.gameOverElement)
    clearInterval(this.intervalId)
    this.intervalId = null
  }

  cleanup() {
    if (!this.snake) {
      return
    }

    this.snake.nodes.concat(this.food).forEach((gameObject) => {
      gameObject.destroy()
    })
  }

  spawnWalls() {
    return [NORTH, EAST, SOUTH, WEST].map((direction) => {
      return new Wall(direction)
    })
  }

  spawnFood() {
    const randX = Math.floor(Math.random() * (window.innerWidth - 30))
    const randY = Math.floor(Math.random() * (window.innerHeight - 30))
    const randomPoint = new Point(randX + 10, randY + 10)

    return new Food({position: randomPoint})
  }

  eatFood() {
    this.food.destroy()
    this.food = this.spawnFood()
    this.snake.grow()
  }

  checkForCollision() {
    if (this.collidedWithDeath()) {
      this.end()
    }

    if (this.ateFood()) {
      this.eatFood()
    }
  }

  collidedWithDeath() {
    const collidables = this.snake.body().concat(this.walls)

    return collidables.some((collidable) => {
      return Collision.aabb(this.snake.head(), collidable)
    })
  }

  ateFood() {
    return Collision.aabb(this.snake.head(), this.food)
  }

  showModal(element) {
    element.classList.remove('hide')
  }

  hideModals(element) {
    this.introElement.classList.add('hide')
    this.gameOverElement.classList.add('hide')
  }

  // Event Handlers
  onTick() {
    this.snake.forward()
    this.checkForCollision()
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
    this.walls.forEach((wall) => {
      wall.destroy()
    })

    this.walls = this.spawnWalls()
  }
}
