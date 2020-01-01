class OPiece extends Piece{
  constructor(x, y, board) {
    super(x, y, board);

    this.offsetData = [
      [[0,0]],
      [[0,-1]],
      [[-1,-1]],
      [[-1,0]]
    ];

    this.tiles.push(new Tile(this.x, this.y, BLOCK_SIZE, BLOCK_SIZE, this.board, "yellow"));
    this.tiles.push(new Tile(this.x + 1, this.y, BLOCK_SIZE, BLOCK_SIZE, this.board, "yellow"));
    this.tiles.push(new Tile(this.x, this.y + 1, BLOCK_SIZE, BLOCK_SIZE, this.board, "yellow"));
    this.tiles.push(new Tile(this.x + 1, this.y + 1, BLOCK_SIZE, BLOCK_SIZE, this.board, "yellow"));

    this.centerTile = this.tiles[2];
  }
}
