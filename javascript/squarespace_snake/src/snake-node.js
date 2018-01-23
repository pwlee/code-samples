export default class SnakeNode {
  constructor(point) {
    this.width = 4
    this.height = 4
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
    domElement.style.backgroundColor = 'red'

    document.body.appendChild(domElement)

    return domElement
  }
}
