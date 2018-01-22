export default class SnakeNode {
  constructor(point) {
    this._next = null
    this._width = 10
    this._height = 10
    this._position = point
    this._domElement = document.createElement("div")

    // todo: move this into a css rule
    // and add the appropriate class here
    this._domElement.style.width = this._width + "px"
    this._domElement.style.height = this._height + "px"
    this._domElement.style.position = "absolute"
    this._domElement.style.top = this._position.y + "px"
    this._domElement.style.left = this._position.x + "px"
    this._domElement.style.backgroundColor = "red"

    document.body.appendChild(this._domElement)
    // this.direction = EAST
  }

  get next() {
    return this._next
  }

  set next(next) {
    this._next = next
  }

  get position() {
    return this._position
  }

  set position(point) {
    this._position = point
    this._domElement.style.top = this._position.y + "px"
    this._domElement.style.left = this._position.x + "px"
  }

  // get head() {
  //   return this.head
  // }
  //
  // forward() {
  //   let currentNode = this.head
  //   while(currentNode) {
  //
  //     currentNode = currentNode.next()
  //   }
  // }
}
