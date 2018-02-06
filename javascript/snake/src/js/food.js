import GameObject from './game-object'
import Point from './utilities/point'

export default class Food extends GameObject {
  constructor(options = {}) {
    const defaults = {
      position: new Point(0, 0),
      width: 10,
      height: 10,
      backgroundColor: "rgba(91, 107, 153, 1)"
    }

    super(Object.assign({}, defaults, options))
  }
}
