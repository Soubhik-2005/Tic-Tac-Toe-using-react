import {useState} from 'react';
const App =() =>{
  const [board, setBoard]=useState(Array(9).fill(null));
  const[isXTurn, setIsXTurn]=useState(true);
  const winningCombinations=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,7],
    [0,4,8],
    [2,4,6]
  ]
  function checkWinner(board){
    for(let combination of winningCombinations){
      const [a,b,c]=combination;
      if(board[a] &&
        board[a]===board[b] &&
        board[a]===board[c]){
          return board[a];
        }
      
    }
    return null;
  }
  function handleClick(index){
    if((board[index]!==null) || checkWinner(board)) return;

    const newBoard=[...board];
    newBoard[index]=isXTurn? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }
  function getGameStatus(){
    const winner=checkWinner(board);
    if(winner){
      return `Player ${winner} wins`;
      }
    if(board.every((square)=>square!==null)){
      return "It's a draw";
      }
    return  `Next Turn: ${isXTurn? "X" :"O"}`;
    }
    function resetGame(){
      setBoard(Array(9).fill(null));  
      setIsXTurn(true);
    }


  return (
    <div className="flex flex-col justify-center w-full items-center bg-gray-900 h-screen overflow-hidden relative">

    <h1 className="text-white text-6xl font-bold"> Tic-Tac-Toe</h1>
    <div  className={ `${checkWinner(board)?" text-green-400 drop-shadow-lg text-2xl my-[20px] animate-bounce":"text-white text-2xl my-[20px]"}`}>{getGameStatus()}</div>
    <div className="grid grid-cols-3 gap-2">
       {board.map((square,index)=>{
         return(
      <button
       index={index} 
       onClick={()=>handleClick(index)}
      className="w-[170px] h-[170px] bg-blue-300  border-black shadow-blue-200 rounded-md text-5xl font-bold hover:bg-blue-200 hover:border-white transition-colors duration-500 ease-in-out" >{square} </button>)

    })}
      </div>
    <div className="text-white bg-blue-400 px-52 rounded-md py-4 my-4 text-2xl">
      <button onClick={()=>resetGame()}>New Game</button>
      </div>
    </div>
  )
}
export default App;