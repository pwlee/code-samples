import GameObject from './game-object'
import Point from './utilities/point'
import { NORTH, EAST, SOUTH, WEST } from './utilities/directions'

export default class Wall extends GameObject {
  constructor(direction) {
    const wallThickness = 10
    const styles = {
      backgroundColor: "red"
    }

    // TODO: Make this smaller
    let point = null
    let width = null
    let height = null

    switch (direction) {
      case NORTH:
        point = new Point(0, 0)
        width = window.innerWidth
        height = wallThickness
        break;
      case EAST:
        point = new Point(window.innerWidth - wallThickness, 0)
        width = wallThickness
        height = window.innerHeight
        break;
      case SOUTH:
        point = new Point(0, window.innerHeight - wallThickness)
        width = window.innerWidth
        height = wallThickness
        break;
      case WEST:
        point = new Point(0, 0)
        width = wallThickness
        height = window.innerHeight
        break;
    }

    super(point, width, height)
  }
}
