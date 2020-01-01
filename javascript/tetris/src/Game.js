class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");

    this.board = new Board(10, 24);
    this.activePiece = this.generateNewPiece();
    this.renderables = [this.board, this.activePiece];

    document.addEventListener("keypress", (e) => {
      if (!this.activePiece) return;

      switch(e.key) {
        case "a":
          if (this.activePiece.canMoveLeft()) {
            this.activePiece.moveLeft();
          }
          break;

        case "s":
          this.moveActivePieceDown();
          break;

        case "d":
          if (this.activePiece.canMoveRight()) {
            this.activePiece.moveRight();
          }
          break;

        case "w":
          this.activePiece.rotate();
          break;

        case "e":
          this.activePiece.rotate(true);
          break;

        case "q":
          this.activePiece.rotate(false);
          break;

        case " ":
          while (this.activePiece.canMoveDown()) {
            this.moveActivePieceDown();
          }
          this.moveActivePieceDown();
          break;
      }
    });

    // Main Render Loop
    setInterval(() => {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.renderables.forEach((renderable) => {
        renderable.draw(this.context);
      });
    }, DRAW_INTERVAL_MS);

    setInterval(() => {
      this.moveActivePieceDown();
    }, DROP_INTERVAL_MS);
  }

  moveActivePieceDown() {
    if (!this.activePiece) return;

    if (this.activePiece.canMoveDown()) {
      this.activePiece.moveDown();
    } else {
      this.board.commit(this.activePiece);
      this.board.clearLines();
      this.renderables.pop();
      this.activePiece = this.generateNewPiece()
      this.renderables.push(this.activePiece);
    }
  }

  // TODO: Update random generation
  // Tetris pieces aren't selected fully at random. They are randomly sequenced
  // in batches of seven (one for each piece).
  generateNewPiece() {
    const pieceTypes = [IPiece, OPiece, TPiece, SPiece, ZPiece, JPiece, LPiece];
    const pieceType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];

    // TODO: Make each piece start in the middle of the board, not in the top-left corner
    return new pieceType(0, 0, this.board);
  }

  // TODO: Add check for game loss
  // TODO: Add ability to "stash" a piece
  // TODO: Add preview for upcoming pieces
}
