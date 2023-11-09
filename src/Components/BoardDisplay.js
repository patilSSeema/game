import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  incrementGamesWon,
  incrementGamesLost,
  incrementScore,
} from "../StateManagment/action";
import { colorArray } from "./ImageArray";
import blank from "../Img/blank.jpg";
import DisplayCandy from "./DisplayCandy";
import Header from "./Header";
const width = 10;

const BoardDisplay = () => {
  const [allColorArray, setAllColorArray] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [moves, setMoves] = useState(10);
  const score = useSelector((state) => state.game.score);
  const dispatch = useDispatch();

  const moveBelowSquare = () => {
    for (let i = 0; i <= 100 - width; i++) {
      if (allColorArray[i] === blank) {
        // If the current cell is empty, generate a random color for it
        let randomNumberForColor = Math.floor(
          Math.random() * colorArray.length
        );
        allColorArray[i] = colorArray[randomNumberForColor];
      }

      if (allColorArray[i + width] === blank) {
        // If the cell below is empty, generate a random color for it
        let randomNumberForColor = Math.floor(
          Math.random() * colorArray.length
        );
        allColorArray[i + width] = colorArray[randomNumberForColor];
      }
    }
    setAllColorArray([...allColorArray]);
  };

  //this function will create array with random color of 100;
  const createBoard = () => {
    const CurrentRandomArray = [];
    for (let i = 0; i < width * width; i++) {
      const randomColor =
        colorArray[Math.floor(Math.random() * colorArray.length)];
      CurrentRandomArray.push(randomColor);
    }
    setAllColorArray(CurrentRandomArray);
  };

  useEffect(() => {
    createBoard();
  }, []);

  useEffect(() => {
    const timeId = setInterval(() => {
      moveBelowSquare();
      setAllColorArray([...allColorArray]);
    }, 1000);

    return () => clearInterval(timeId);
  }, [moveBelowSquare, allColorArray]);

  const checkGameResult = () => {
    if (moves === 0) {
      if (score >= 60) {
        dispatch(incrementGamesWon());
        alert("Congratulations!!🎉 You win the game! 🏆");
      } else {
        dispatch(incrementGamesLost());
        alert("😢 You lose the game. Try again! 💪");
      }
    }
  };

  const burstConnectedCandies = (clickedIndex, selectedColor) => {
    if (moves === 0) {
      dispatch(incrementScore(-score));
      setMoves(10);
      checkGameResult(); // Move the checkGameResult call inside the condition
      return;
    }

    const stack = [clickedIndex];
    const visited = new Set();
    const connectedCandies = [];
    const endOfRowIndices = [];

    // Define the indices at the end of each row
    for (let i = width - 1; i < width * width; i += width) {
      endOfRowIndices.push(i);
    }

    while (stack.length > 0) {
      const currentIndex = stack.pop();
      if (
        visited.has(currentIndex) ||
        allColorArray[currentIndex] !== selectedColor
      ) {
        continue;
      }

      visited.add(currentIndex);
      connectedCandies.push(currentIndex);

      // Add adjacent candies to the stack, avoiding boundary and end-of-row cases
      const neighbors = [];
      if (currentIndex % width !== 0) {
        // Left neighbor
        neighbors.push(currentIndex - 1);
      }
      if (currentIndex % width !== width - 1) {
        // Right neighbor
        neighbors.push(currentIndex + 1);
      }
      if (currentIndex >= width) {
        // Up neighbor
        neighbors.push(currentIndex - width);
      }
      if (!endOfRowIndices.includes(currentIndex + 1)) {
        // Right neighbor (next row) if not at the end of the row
        neighbors.push(currentIndex + width + 1);
      }

      neighbors.forEach((neighbor) => {
        if (neighbor >= 0 && neighbor < width * width) {
          stack.push(neighbor);
        }
      });
    }

    if (connectedCandies.length >= 3) {
      const candiesRemoved = connectedCandies.length;
      dispatch(incrementScore(candiesRemoved));
      connectedCandies.forEach((index) => {
        allColorArray[index] = blank; // Burst the candy at the current index
      });

      setClickCount(clickCount + 1);
      setMoves(moves - 1);
      checkGameResult();
    }

    setAllColorArray([...allColorArray]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const clickedIndex = parseInt(e.target.getAttribute("data-id"), 10);
    const selectedColor = allColorArray[clickedIndex];

    if (selectedColor) {
      burstConnectedCandies(clickedIndex, selectedColor);
    }
  };

  return (
    <>
      <Header moves={moves} />
      <div className="app">
        <div className="board">
          {allColorArray.map((colorBox, index) => {
            return (
              <DisplayCandy
                key={index}
                colorBox={colorBox}
                index={index}
                handleClick={handleClick}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BoardDisplay;
