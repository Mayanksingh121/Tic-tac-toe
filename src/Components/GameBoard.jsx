export default function GameBoard({onSelectSquare,board}) {

  //one way of generating game board;
    // const [gameBoard, setGameBoard]=useState(initialGameBoard);

    // function handleSelectSquare(rowIndex,colIndex){
    //     setGameBoard((previousGameBoard)=>{
    //         const updatedBoard =[...previousGameBoard.map(innerArray=>[...innerArray])];
    //         updatedBoard[rowIndex][colIndex]= activePlayerNow;
    //         return updatedBoard;
    //     });
    //     onSelectSquare();
    // }

    //deriving state from gameTurn

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={()=>onSelectSquare(rowIndex,colIndex)} disabled={playerSymbol!==null}>
                  {playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
