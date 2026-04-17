import { useState } from 'react';

function Square({ value, onSquareClick, isWinSquare }) {
  
  return (
    <button className="square" onClick={onSquareClick} style={isWinSquare ? {border: '2px solid red'} : {}}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, currentMove }) {
  
  const winner = calculateWinner(squares);

  function handleClick(i) {

    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares, i);
  }

  let status;
  if (winner) {
    status = 'Ganador: ' + squares[winner[0]];
  } else if (currentMove === 9){
    status = 'Empate';
  } else {
    status = 'Siguiente jugador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>

      {[0, 1, 2].map((i) => (
        <div key={i} className="board-row">
          {[0, 1, 2].map((j) => {
            const index = i * 3 + j;
            return (<Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} isWinSquare={winner?.includes(index)}/>);
          })}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isInverted, setIsInverted] = useState(false);
  const [movesHistory, setMovesHistory] = useState([]);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares, moveIndex) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    const nextMovesHistory = [...movesHistory.slice(0, currentMove + 1), moveIndex];
    setMovesHistory(nextMovesHistory);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  
  const orderedHistory = isInverted ? [...history].reverse() : history;
  
  const moves = orderedHistory.map((squares, move) => {
    const actualMove = isInverted
    ? history.length - 1 - move
    : move;
    
    const row = Math.floor(movesHistory[move] / 3) + 1;
    const col = (movesHistory[move] % 3) + 1;

    let description;
    if (actualMove > 0) {
      description = `Ir hacia la jugada #${actualMove} (${col}, ${row})`;
    } else {
      description = 'Ir al inicio del juego';
    }
    
    return (
      <li key={actualMove}>
        {actualMove === (currentMove) ? `Estás en el movimiento #${actualMove}` : <button onClick={() => jumpTo(actualMove)}>{description}</button>}
      </li>
    );
  });
  
  function cambiaOrden(){
    setIsInverted(!isInverted);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} currentMove={currentMove} />
      </div>
      <div className="game-info">
        <button onClick={cambiaOrden}>
          Ordenar movimientos
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [a, b, c];
    }
  }
  return null;
}
