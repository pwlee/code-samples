export default class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  set x(x) {
    this._x = x
  }

  set y(y) {
    this._y = y
  }
}
