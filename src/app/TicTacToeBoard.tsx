"use client";

import React, { useState, useEffect } from 'react';

const initialBoard = Array(9).fill(null);

const TicTacToeBoard: React.FC = () => {
  const [board, setBoard] = useState<(string | null)[]>(initialBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [draws, setDraws] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const winner = calculateWinner(board);

  useEffect(() => {
    if (winner && !gameOver) {
      if (winner === 'X') setXWins((w) => w + 1);
      if (winner === 'O') setOWins((w) => w + 1);
      setGameOver(true);
    } else if (!winner && board.every(cell => cell) && !gameOver) {
      setDraws((d) => d + 1);
      setGameOver(true);
    }
  }, [winner, board, gameOver]);

  const handleClick = (index: number) => {
    if (board[index] || winner || gameOver) return;
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleRestart = () => {
    setBoard(initialBoard);
    setXIsNext(true);
    setGameOver(false);
  };

  const renderCell = (index: number) => {
    const value = board[index];
    let cellClass = 'ttt-cell';
    if (value === 'X') cellClass += ' x';
    if (value === 'O') cellClass += ' o';
    return (
      <button
        key={index}
        className={cellClass}
        onClick={() => handleClick(index)}
        disabled={!!value || !!winner || gameOver}
      >
        {value}
      </button>
    );
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(cell => cell)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
    <div className="ttt-chalkboard">
      <div className="ttt-scores">
        <span>X: {xWins}</span>
        <span>O: {oWins}</span>
        <span>Draws: {draws}</span>
      </div>
      <div className="ttt-status">{status}</div>
      <div className="ttt-board">
        {board.map((_, idx) => renderCell(idx))}
      </div>
      <button className="ttt-restart" onClick={handleRestart}>
        Restart Game
      </button>
    </div>
  );
};

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToeBoard; 