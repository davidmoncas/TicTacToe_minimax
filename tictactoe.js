var origBoard;
const huPlayer='O';
const aiPlayer='X';

const winCombos=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
]

const cells=document.querySelectorAll('.cell');
startGame();


function startGame(){

	// quitando el aviso de Game over cada vez que inicie
	document.querySelector(".endGame").style.display="none"

	//el tablero original tiene números, luego se ponen X y O en donde el jugador ponga una casilla
	origBoard=[0,1,2,3,4,5,6,7,8]


	//dejando en blanco todas las casillas y borrando el color
	for (var i=0;i<cells.length;i++){

		cells[i].innerText='';
		cells[i].style.removeProperty('background-color');

		//agregando un event Listener que obtiene el ID de lo que se toque
		cells[i].addEventListener('click',turnClick,false)
	}

}

//evento al que se llama al hacer click en un cuadro
function turnClick(square){

	
	turn(square.target.id,huPlayer)
	
	
	if(!checkTie(origBoard) && !checkWin(origBoard,huPlayer)){

		turn(bestSpot(),aiPlayer)
		
	}


	


}



function turn(squareId,player){

origBoard[squareId]=player;
//se coloca el indicador Player en el cuadro squareID
document.getElementById(squareId).innerText=player;
cells[squareId].removeEventListener('click',turnClick,false)


// gameWon es un objeto que muestra quien ganó y las posiciones
let gameWon=checkWin(origBoard,player);

if (gameWon) gameOver(gameWon)

}

function checkWin(board,player){
	
	//saca un array de las casillas que ha puesto el jugador de turno
	let plays = board.reduce( (a,e,i)=>(e===player)? a.concat(i) :a,[]);
	
	let gameWon=null;

	//compara las casillas que tiene un jugador con las partidas ganadoras
	for (let [index,win] of winCombos.entries()){
		if (win.every(elem=> plays.indexOf(elem)>-1)){

			//si alguna coincide devuelve las casillas ganadoras y el nombre del jugador
			gameWon={index: index, player: player};
			break;
		}
	}
	return gameWon;
}
// le pone el color a las casillas ganadoras
function gameOver(gameWon){
	for (let index of winCombos[gameWon.index]){
		document.getElementById(index).style.backgroundColor=
			gameWon.player==huPlayer? "rgba(30,240,60,0.8)" : "rgba(240,20,20,0.8)";
	}
	// Le quita la posibilidad de seguir hundiendo casillas una vez se gane
	for (var i=0;i<cells.length;i++){
		cells[i].removeEventListener('click',turnClick,false);
	}

	//que aparezca el aviso de Game Over si el jugador AI gana
	(gameWon.player===huPlayer? declareWinner("you win!"):declareWinner("you lose"))
	
}

function emptySquares(Board){
	return Board.filter(s => typeof s=='number');
}

function checkTie(board){
	if (emptySquares(board).length==0 ){
		for(var i=0;i<cells.length;i++){
			cells[i].style.backgroundColor="blue";
			cells[i].removeEventListener('click',turnClick,false);
		
		}
		declareWinner("It's a tie!");
		return true;
	}


	return false;
}

function bestSpot() {
    return minimax(origBoard, aiPlayer).index;
}


function declareWinner(whoWin){
	document.querySelector(".endGame").style.display="inline";
	document.querySelector(".endGame").innerText=whoWin;
}




//function minMax(newboard,player){


//	if(checkWin(newboard,aiPlayer)){return {score:10} }
//	else if(checkWin(newboard,huPlayer)){return {score:-10} }
//	else if(checkTie(newboard)){return {score:0} }

//	posibleMoves=emptySquares(newboard)

//	for (var i=0;i<emptySquares.length;i++){

//        // copiando un nuevo tablero para no mutar el origBoard
//        newboard = newboard.map(a => a);
//        //agregándole al tablero el nuevo movimiento
//        newboard[posibleMoves[i]] = player;

//        if (player == aiPlayer) {
//            minMax(newboard,huPlayer)
//        }
//        else if (player == huPlayer) {
//            minMax(newboard,aiPlayer
//                )
//        }

//	}


//}

function minimax(newBoard, player) {
    var availSpots = emptySquares(newBoard);

    if (checkWin(newBoard, huPlayer)) {
        return { score: -10 };
    } else if (checkWin(newBoard, aiPlayer)) {
        return { score: 10 };
    } else if (availSpots.length === 0) {
        return { score: 0 };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;

        if (player == aiPlayer) {
            var result = minimax(newBoard, huPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiPlayer);
            move.score = result.score;
        }

        newBoard[availSpots[i]] = move.index;

        moves.push(move);

       
        
    }
    console.log(moves);

    var bestMove;
    if (player === aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}


