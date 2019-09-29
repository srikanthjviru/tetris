export const STAGE_WIDTH = 12;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, "clear"])
  );

export const checkCollision = (player, stage, { x: moveX, y: moveY }) => {
  for (let y = 0; y < player.tetromino.length; y++) {
    for (let x = 0; x < player.tetromino[y].length; x++) {
      // 1. check that we are actually on the tetrimino cell

      if (player.tetromino[y][x] !== 0) {
        if (
          // 2. Check that our move is inside the game areas height (y)
          // We should not go through the bottom of the play area

          !stage[y + player.pos.y + moveY] ||
          // 3.Check that our move is inside the game areas width (x)

          !stage[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
          //4. Check that the cell we are moving to is not set to clear

          stage[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !==
            "clear"
        ) {
          console.log("checking collision and it is TRUE");
          return true;
        }
      }
    }
  }
};
