import "./App.css";

import { useState } from "react";

function App() {
  const [grid, setGrid] = useState([
    [1, 3, 0, 4],
    [5, 2, 1, 5],
    [2, 0, 4, 3],
  ]);

  const [reveleadGrid, setRevealedGrid] = useState(
    new Array(grid.length)
      .fill("")
      .map(() => new Array(grid[0].length).fill(false))
  );

  const [prevClick, setPrevClick] = useState(null);

  const handleCardClicked = (rowIndex, colIndex) => {
    const clickedNumber = grid[rowIndex][colIndex];
    const newRevealedGrid = [...reveleadGrid];
    newRevealedGrid[rowIndex][colIndex] = true;
    setRevealedGrid([...newRevealedGrid]);

    if (prevClick) {
      const prevClickedNumber = grid[prevClick.row][prevClick.col];
      if (prevClickedNumber !== clickedNumber) {
        setTimeout(() => {
          newRevealedGrid[rowIndex][colIndex] = false;
          newRevealedGrid[prevClick.row][prevClick.col] = false;
          setRevealedGrid([...newRevealedGrid]);
        }, 500);
      } else {
        const hasWon = reveleadGrid.flat().every((reVelead) => reVelead);
        if (hasWon) {
          setTimeout(() => {
            alert("YOU WON..!!!");
          });
        }
      }
      setPrevClick(null);
    } else {
      setPrevClick({
        row: rowIndex,
        col: colIndex,
      });
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="flex flex-col gap-2">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2">
            {row.map((number, colIndex) => (
              <div
                onClick={() => handleCardClicked(rowIndex, colIndex)}
                key={colIndex}
                className="w-20 h-20 bg-slate-300 flex justify-center items-center hover:cursor-pointer"
              >
                {reveleadGrid[rowIndex][colIndex] ? number : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
