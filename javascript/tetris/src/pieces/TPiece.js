class TPiece extends Piece {
  constructor(x, y, board) {
    super(x, y, board);

    this.tiles.push(new Tile(this.x + 1, this.y, BLOCK_SIZE, BLOCK_SIZE, this.board, "purple"));
    this.tiles.push(new Tile(this.x, this.y + 1, BLOCK_SIZE, BLOCK_SIZE, this.board, "purple"));
    this.tiles.push(new Tile(this.x + 1, this.y + 1, BLOCK_SIZE, BLOCK_SIZE, this.board, "purple"));
    this.tiles.push(new Tile(this.x + 2, this.y + 1, BLOCK_SIZE, BLOCK_SIZE, this.board, "purple"));

    this.centerTile = this.tiles[2];
  }
}
