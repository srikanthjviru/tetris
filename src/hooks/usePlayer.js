import { useState, useCallback } from "react";
import { randomTetromino, TETROMINOS } from "../tetrominos";
import { STAGE_WIDTH, checkCollision } from "../gameHelpers";

export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false
  });
  console.log("PLAYERRRR", player);

  const rotate = (matrix, dir) => {
    //Make the rows to become the cols (transpose of a matrix)
    const rotatedTetro = matrix.map((_, index) =>
      matrix.map(col => col[index])
    );

    // Reverse each row to get the rotated matrix
    // console.log("rotaReve", rotatedTetro.reverse());
    // console.log("mapReverse", rotatedTetro.map(row => row.reverse()));
    if (dir > 0) {
      return rotatedTetro.map(row => row.reverse());
    }
    return rotatedTetro.reverse();
  };

  const playerRotate = (stage, dir) => {
    // console.log("stage---------", stage);
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    // const clonedPlayer = player;
    clonedPlayer.tetromino = rotate(clonedPlayer.tetromino, dir);

    const pos = clonedPlayer.pos.x;
    // console.log("pos", clonedPlayer);
    let offset = 1;

    while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        rotate(clonedPlayer.tetromino, -dir);
        clonedPlayer.pos.x = pos;
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  // const playerRotate = (stage, dir) => {};
  const updatePlayerPos = ({ x, y, collided }) => {
    // console.log("collided", collided);
    setPlayer(prev => {
      // console.log("PpPPPP", prev.pos);
      console.log("player coordiates updated");
      return {
        ...prev,
        pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
        collided
      };
    });
  };
  const resetPlayer = useCallback(() => {
    setPlayer({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: randomTetromino().shape,
      collided: false
    });
  }, []);
  return [player, updatePlayerPos, resetPlayer, playerRotate];
};
