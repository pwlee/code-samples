export default class GameObject {
  constructor(point, width, height) {
    this.width = width
    this.height = height
    this.backgroundColor = "black"
    this.id = Math.random() * 10000000
    this.domElement = this.createDomElement()
    this.setPosition(point)
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
