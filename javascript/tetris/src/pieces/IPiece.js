class IPiece extends Piece{
  constructor(x, y, board) {
    super(x, y, board);

    this.offsetData = [
      [[0,0], [-1,0], [2,0], [-1,0], [2,0]],
      [[-1,0], [0,0], [0,0], [0,1], [0,-2]],
      [[-1,1], [1,1], [-2,1], [1,0], [-2,0]],
      [[0,1], [0,1], [0,1], [0,-1], [0,2]]
    ];

    this.tiles.push(new Tile(this.x, this.y, BLOCK_SIZE, BLOCK_SIZE, this.board, "teal"));
    this.tiles.push(new Tile(this.x + 1, this.y, BLOCK_SIZE, BLOCK_SIZE, this.board, "teal"));
    this.tiles.push(new Tile(this.x + 2, this.y, BLOCK_SIZE, BLOCK_SIZE, this.board, "teal"));
    this.tiles.push(new Tile(this.x + 3, this.y, BLOCK_SIZE, BLOCK_SIZE, this.board, "teal"));

    this.centerTile = this.tiles[1];
  }
}
