class Piece {
  constructor(x, y, board) {
    this.x = x;
    this.y = y;
    this.board = board;
    this.tiles = [];
    this.centerTile = null;
    this.offsetData = [
      [[0,0], [0,0], [0,0], [0,0], [0,0]],
      [[0,0], [1,0], [1,-1], [0,2], [1,2]],
      [[0,0], [0,0], [0,0], [0,0], [0,0]],
      [[0,0], [-1,0], [-1,-1], [0,2], [-1,2]]
    ];
    this.rotationIndex = 0;
  }

  draw(context) {
    this.tiles.forEach(tile => tile.draw(context));
  }

  moveDown() {
    this.tiles.forEach(tile => tile.moveDown());
  }

  moveLeft() {
    this.tiles.forEach(tile => tile.moveLeft());
  }

  moveRight() {
    this.tiles.forEach(tile => tile.moveRight());
  }

  rotate(clockwise = true, shouldOffset = true) {
    const oldRotationIndex = this.rotationIndex;
    this.rotationIndex += clockwise ? 1 : -1;
    this.rotationIndex = this.mod(this.rotationIndex, 4);

    this.tiles.forEach(tile => tile.rotate(this.centerTile.x, this.centerTile.y, clockwise));

    if (!shouldOffset) {
      return;
    }

    const canOffset = this.offset(oldRotationIndex, this.rotationIndex);

    if (!canOffset) {
      this.rotate(!clockwise, false);
    }
  }

  offset(oldRotationIndex, newRotationIndex) {
    let movePossible = false;
    let endOffsetX = 0;
    let endOffsetY = 0;

    for (let i = 0; i < 5; i++) {
      const offsetVal1 = this.offsetData[oldRotationIndex][i];
      const offsetVal2 = this.offsetData[newRotationIndex][i];

      endOffsetX = offsetVal1[0] - offsetVal2[0];
      endOffsetY = (offsetVal1[1] - offsetVal2[1]) * -1;

      if (this.canOffsetPiece(endOffsetX, endOffsetY)) {
        movePossible = true;
        break;
      }
    }

    if (movePossible) {
      this.offsetPiece(endOffsetX, endOffsetY);
    }

    return movePossible;
  }

  offsetPiece(x, y) {
    this.tiles.forEach(tile => tile.offset(x, y));
  }

  canOffsetPiece(offsetX, offsetY) {
    return this.tiles.every(tile => tile.canOffset(offsetX, offsetY));
  }

  canMoveDown() {
    return this.tiles.every(tile => tile.canMoveDown());
  }

  canMoveLeft() {
    return this.tiles.every(tile => tile.canMoveLeft());
  }

  canMoveRight() {
    return this.tiles.every(tile => tile.canMoveRight());
  }

  // TODO: Extract into utility
  // True modulo operation which works for positive and negative numbers
  mod(x, m) {
    return (x % m + m) % m;
  }
}
