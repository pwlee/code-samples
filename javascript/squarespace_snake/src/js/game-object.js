// TODO: DONE

import Point from './utilities/point'

export default class GameObject {
  constructor(options = {}) {
    this.position = options.position || new Point(0, 0)
    this.width = options.width || 10
    this.height = options.height || 10
    this.backgroundColor = options.backgroundColor || '#000'
  }

  render(canvas) {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = this.backgroundColor
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
