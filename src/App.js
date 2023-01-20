import "./styles.css";
import { useState, useMemo } from "react";

const checkWinConditions = (a, b, c) => {
  if (a === null) return false;
  if (b !== a) return false;
  if (c !== b) return false;
  return a;
};

export default function App() {
  const [cellsArr, setCellsArr] = useState(Array(9).fill(null));
  const [turnContent, setTurnContent] = useState("X");
  const [gameEnded, setGameEnded] = useState(false);
  const updatedCells = [...cellsArr];
  let whosTurn = `${turnContent}'s turn`;

  const isWinner = useMemo(() => {
    const possibleWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < possibleWins.length; i++) {
      const [a, b, c] = possibleWins[i];
      const isMatch = checkWinConditions(cellsArr[a], cellsArr[b], cellsArr[c]);

      if (isMatch || !cellsArr.includes(null)) {
        setGameEnded(true);
        return isMatch;
      }
    }
  }, [cellsArr]);

  const handleMarkCell = (index) => {
    updatedCells[index] = turnContent;
    setCellsArr(updatedCells);
    turnContent === "X" ? setTurnContent("O") : setTurnContent("X");
  };

  const handleReset = () => {
    setGameEnded(false);
    setCellsArr(Array(9).fill(null));
  };

  const renderCells = cellsArr.map((cell, index) => {
    return (
      <button
        disabled={!!cell || isWinner === "X" || isWinner === "O"}
        className="cell"
        key={index}
        onClick={() => handleMarkCell(index)}
      >
        {cell}
      </button>
    );
  });

  const renderResultMessage = () => {
    if (isWinner === "X") {
      return "X takes it!";
    } else if (isWinner === "O") {
      return "O is so smart";
    } else {
      return "Cat's game";
    }
  };

  return (
    <>
      <div className="App">{renderCells}</div>
      <button onClick={handleReset}>Reset</button>
      <h2>{gameEnded ? renderResultMessage() : whosTurn}</h2>
    </>
  );
}
