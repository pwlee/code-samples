// TODO: DONE
import GameObject from './game-object'
import Point from './utilities/point'
import { NORTH, EAST, SOUTH, WEST } from './utilities/directions'

export default class Wall extends GameObject {
  constructor(direction) {
    const wallThickness = 10
    const options = {
      backgroundColor: "rgba(50, 50, 50, 1)"
    }

    switch (direction) {
      case NORTH:
        options.position = new Point(0, 0)
        options.width = window.innerWidth
        options.height = wallThickness
        break
      case EAST:
        options.position = new Point(window.innerWidth - wallThickness, 0)
        options.width = wallThickness
        options.height = window.innerHeight
        break
      case SOUTH:
        options.position = new Point(0, window.innerHeight - wallThickness)
        options.width = window.innerWidth
        options.height = wallThickness
        break
      case WEST:
        options.position = new Point(0, 0)
        options.width = wallThickness
        options.height = window.innerHeight
        break
    }

    super(options)
  }
}
