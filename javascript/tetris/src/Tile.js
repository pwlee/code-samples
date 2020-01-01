class Tile {
  constructor(x, y, width, height, board, fillColor) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.board = board;
    this.fillColor = fillColor;
  }

  draw(context) {
    context.beginPath();
    context.fillStyle = this.fillColor;
    context.fillRect(this.x * this.width, this.y * this.height, this.width, this.height);
    context.stroke();
  }

  moveDown() {
    this.y++;
  }

  moveLeft() {
    this.x--;
  }

  moveRight() {
    this.x++;
  }

  rotate(originX, originY, clockwise) {
    const relativeX = this.x - originX;
    const relativeY = this.y - originY;

    const rotationMatrix = clockwise ? [[0, 1], [-1, 0]]
                                     : [[0, -1], [1, 0]]

    const newX = (rotationMatrix[0][0] * relativeX) + (rotationMatrix[1][0] * relativeY);
    const newY = (rotationMatrix[0][1] * relativeX) + (rotationMatrix[1][1] * relativeY);

    this.x = newX + originX;
    this.y = newY + originY;
  }

  canMoveDown() {
    if (this.board.slots[this.x][this.y + 1]) {
      return false;
    } else if (this.y + 1 >= this.board.height) {
      return false;
    } else {
      return true;
    }
  }

  canMoveLeft() {
    if (this.x - 1 < 0) {
      return false;
    } else if (this.board.slots[this.x - 1][this.y]) {
      return false;
    } else {
      return true;
    }
  }

  canMoveRight() {
    if (this.x + 1 > this.board.width - 1) {
      return false;
    } else if (this.board.slots[this.x + 1][this.y]) {
      return false;
    } else {
      return true;
    }
  }

  canOffset(x, y) {
    if (this.x + x > this.board.width - 1) {
      return false;
    } else if (this.x + x < 0) {
      return false;
    }
    else if (this.y + y >= this.board.height) {
      return false;
    } else if (this.board.slots[this.x + x][this.y + y]) {
      return false;
    } else {
      return true;
    }
  }

  offset(x, y) {
    this.x += x;
    this.y += y;
  }
}
