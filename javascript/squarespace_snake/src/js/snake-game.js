import Snake from './snake'
import Wall from './wall'
import Food from './food'
import Point from './utilities/point'
import Collision from './utilities/collisions'
import { NORTH, EAST, SOUTH, WEST, KEYCODES, OPPOSITE_DIRECTIONS } from './utilities/directions'

export default class SnakeGame {
  constructor() {
    this.snake = null
    this.walls = null
    this.food = null
    this.intervalId = null
    this.introElement = document.getElementById('intro')
    this.gameOverElement = document.getElementById('game-over')

    document.onkeydown = this.onKeyDown.bind(this)
  }

  showModal(element) {
    element.classList.remove('hide')
  }

  hideModals(element) {
    this.introElement.classList.add('hide')
    this.gameOverElement.classList.add('hide')
  }

  start() {
    this.cleanup()
    this.hideModals()

    this.snake = new Snake(new Point(200, 200))
    this.walls = this.spawnWalls()
    this.food = this.spawnFood()

    if (this.intervalId == null) {
      this.intervalId = setInterval(this.onTick.bind(this), 20)
    }

    window.onresize = this.onResize.bind(this)
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

    this.snake.nodes.concat(this.walls).concat(this.food).forEach((gameObject) => {
      gameObject.destroy()
    })
  }

  spawnWalls() {
    return [NORTH, EAST, SOUTH, WEST].map((direction) => {
      return new Wall(direction)
    })
  }

  spawnFood() {
    const randX = Math.random() * window.innerWidth - 20
    const randY = Math.random() * window.innerHeight - 20
    const randomPoint = new Point(randX + 10, randY + 10)

    return new Food({ position: randomPoint })
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

    const newDirection = KEYCODES[e.keyCode]
    const oppositeDirection = OPPOSITE_DIRECTIONS[this.snake.direction]

    if (newDirection === oppositeDirection) {
      return
    }

    if (newDirection) {
      this.snake.direction = newDirection
    }
  }

  onResize() {
    this.walls.forEach((wall) => {
      wall.destroy()
    })

    this.walls = this.spawnWalls()
  }
}
