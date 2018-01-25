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
  }

  start() {
    const center = new Point(200, 200)

    this.snake = new Snake(center)
    this.walls = this.spawnWalls()
    this.food = this.spawnFood()

    this.intervalId = setInterval(this.onTick.bind(this), 20)
    document.onkeydown = this.onKeyDown.bind(this)
    window.onresize = this.onResize.bind(this)
  }

  end() {
    clearInterval(this.intervalId)
  }

  spawnWalls() {
    return [NORTH, EAST, SOUTH, WEST].map((direction) => {
      return new Wall(direction)
    })
  }

  spawnFood() {
    const randX = Math.random() * window.innerWidth
    const randY = Math.random() * window.innerHeight
    const randomPoint = new Point(randX, randY)

    return new Food({position: randomPoint})
  }

  eatFood() {
    this.food.destroy()
    this.food = this.spawnFood()
    this.snake.grow()
  }

  checkForCollision() {
    // const collidables = this.snake.body().concat(this.walls)
    // const hasCollision = collidables.some((collidable) => {
    //   return Collision.aabb(this.snake.head(), collidable)
    // })
    //
    // if (hasCollision) {
    //   this.end()
    // }
    for (let i = 1; i < this.snake.nodes.length; i++) {
      const currentNode = this.snake.nodes[i]
      const hasCollision = Collision.aabb(this.snake.head(), currentNode)

      if (hasCollision) {
        this.end()
      }
    }

    for (let i = 0; i < this.walls.length; i++) {
      const currentWall = this.walls[i]
      const hasCollision = Collision.aabb(this.snake.head(), currentWall)

      if (hasCollision) {
        this.end()
      }
    }

    const ateFood = Collision.aabb(this.snake.head(), this.food)
    if (ateFood) {
      this.eatFood()
    }
  }

  onTick() {
    this.snake.forward()
    this.checkForCollision()
  }

  onKeyDown(e) {
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
