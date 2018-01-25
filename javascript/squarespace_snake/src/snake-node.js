import GameObject from './game-object'

export default class SnakeNode extends GameObject {
  constructor(point) {
    const nodeWidth = 4
    const nodeHeight = 4
    const backgroundColor = "black"

    super(point, nodeWidth, nodeHeight)
  }
}
