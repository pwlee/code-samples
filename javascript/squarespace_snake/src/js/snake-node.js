import GameObject from './game-object'
import Point from './utilities/point'

export default class SnakeNode extends GameObject {
  constructor(options) {
    const defaults = {
      width: 4,
      height: 4,
      backgroundColor: "black"
    }

    super(Object.assign({}, defaults, options))
  }
}
