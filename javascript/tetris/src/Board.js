class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.slots = new Array(width);
    for (let i = 0; i < this.slots.length; i++) {
      this.slots[i] = new Array(height);
    }
  }

  // TODO: Address this:
  // This idea behind "committing" a piece seems a bit weird to me. It seems like
  // we're keeping track of a tile's position in two places right now: once in the
  // tile's X/Y position, and once in the indices of this slots 2D array. We can
  // see the redundancy in the "clearRow" function. We're essentially "moving a
  // tile down" twice, once by calling "moveDown" and again when we futz around
  // with the array indices. Ideally, we'd only manage the tile's position in one
  // place.
  commit(piece) {
    piece.tiles.forEach((tile) => {
      this.slots[tile.x][tile.y] = tile;
    });
  }

  clearLines() {
    for (let i = 0; i < this.height; i++) {
      if (this.checkFullRow(i)) {
        this.clearRow(i);
        i--;
      }
    }
  }

  checkFullRow(row) {
    for (let i = 0; i < this.width; i++) {
      if (!this.slots[i][row]) {
        return false;
      }
    }

    return true;
  }

  clearRow(row) {
    for (let i = 0; i < this.width; i++) {
      this.slots[i][row] = undefined;
    }

    for (let i = row - 1; i >= 0; i--) {
      for (let j = 0; j < this.width; j++) {
        if (this.slots[j][i]) {
          this.slots[j][i].moveDown();
          this.slots[j][i + 1] = this.slots[j][i];
          this.slots[j][i] = undefined;
        }
      }
    }
  }

  draw(context) {
    for (let i = 0; i < this.slots.length; i++) {
      for (let j = 0; j < this.slots[i].length; j++) {
        if (this.slots[i][j]) {
          this.slots[i][j].draw(context);
        }
      }
    }
  }
}
