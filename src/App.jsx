import {useState} from 'react';

import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from './Components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from './Components/GameOver.jsx';


const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//determines active player
function deriveActivePlayer(gameTurns){
  let currentPlayer='X';

  if(gameTurns.length>0 && gameTurns[0].player==='X'){
        currentPlayer='O';
  }

  return currentPlayer;
}

//to derive gameBoard after player clicks on some square
function deriveGameBoard(gameTurns){
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for(const turn of gameTurns){
    const {square,player}=turn;
    const {row,col}=square;

    gameBoard[row][col]=player;
  }
  return gameBoard;
}

//logic to derive the winner according to the combinations present in winning-combination file
function deriveWinner(gameBoard,players){
  let winner;
    for(const combinations of WINNING_COMBINATIONS){
      const firstSquareSymbol=gameBoard[combinations[0].row][combinations[0].column];
      const secondSquareSymbol=gameBoard[combinations[1].row][combinations[1].column];
      const thirdSquareSymbol=gameBoard[combinations[2].row][combinations[2].column];

      if(firstSquareSymbol && firstSquareSymbol===secondSquareSymbol && firstSquareSymbol===thirdSquareSymbol){
          winner=players[firstSquareSymbol];
      }
    }
    return winner;
}


//main App component
function App() {

  const[players,setPlayerName]=useState({
    X: 'Player 1',
    O: 'Player 2'
  });

  const [gameTurns,setGameTurns]=useState([]);  


  //lifting the state to the parent omponent as player and gameBoard are having state on which we have to work simultaneously
  //const[activePlayer, setActivePlayer]=useState('X');
  const activePlayer= deriveActivePlayer(gameTurns);
  const gameBoard=deriveGameBoard(gameTurns);
    
  const winner=deriveWinner(gameBoard,players);
  const hasDraw=gameTurns.length ===9 && !winner;

  function handleSelectSquare(rowIndex,colIndex){

    setGameTurns((prevTurns)=>{

      const currentPlayer=deriveActivePlayer(prevTurns);

      const updatedTurns=[
        {square:{row:rowIndex, col:colIndex},player: currentPlayer},
        ...prevTurns
      ];

      console.log(updatedTurns);
      return updatedTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
    setPlayerName(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]:newName
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName="Player 2" symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange}/>
        </ol>
        {(winner || hasDraw)&& <GameOver winner={winner} onResart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} 
        board={gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App;
