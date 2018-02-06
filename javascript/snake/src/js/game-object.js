import Point from './utilities/point'

export default class GameObject {
  constructor(options = {}) {
    this.position = options.position || new Point(0, 0)
    this.width = options.width || 10
    this.height = options.height || 10
    this.backgroundColor = options.backgroundColor || 'rgba(0, 0, 0, 1)'
  }

  // ----------------------------------------------------------
  // -----------------------  Public  -------------------------
  // ----------------------------------------------------------
  render(canvas) {
    const context = canvas.getContext('2d')

    context.fillStyle = this.backgroundColor
    context.fillRect(this.position.x, this.position.y, this.width, this.height)
  }
}
