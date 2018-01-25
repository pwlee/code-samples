import Point from './utilities/point'

export default class GameObject {
  constructor(options = {}) {
    this.position = options.position || new Point(0, 0)
    this.width = options.width || 10
    this.height = options.height || 10
    this.backgroundColor = options.backgroundColor || "#000"
    this.domElement = this.createDomElement()
    this.setPosition(this.position)
  }

  setPosition(point) {
    this.position = point
    this.domElement.style.top = this.position.y + 'px'
    this.domElement.style.left = this.position.x + 'px'
  }

  createDomElement() {
    const domElement = document.createElement('div')

    domElement.style.width = this.width + 'px'
    domElement.style.height = this.height + 'px'
    domElement.style.position = 'absolute'
    domElement.style.backgroundColor = this.backgroundColor

    document.body.appendChild(domElement)

    return domElement
  }

  destroy() {
    this.domElement.parentNode.removeChild(this.domElement)
  }
}
