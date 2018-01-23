export default class SnakeNode {
  constructor(point) {
    this.domElement = document.createElement('div')
    this.width = 4
    this.height = 4
    this.setPosition(point)

    document.body.appendChild(this.domElement)

    // TODO: move this into a css rule
    // and add the appropriate class here
    this.domElement.style.width = this.width + 'px'
    this.domElement.style.height = this.height + 'px'
    this.domElement.style.position = 'absolute'
    this.domElement.style.backgroundColor = 'red'
  }

  setPosition(point) {
    this.position = point
    this.domElement.style.top = this.position.y + 'px'
    this.domElement.style.left = this.position.x + 'px'
  }
}
