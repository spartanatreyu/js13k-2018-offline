//This represents difficulty and level, increments when 
let day = 1;
//When this reaches 0, the game is over. When this reaches day*2, the day is over.
let satisfaction = 1;
//increments when a new tile pair is made, so that only the right tiles are paired together
let nextTilePairToAdd = 0;
//represents the state of the boards tiles, and which ones are paired
let board = [];

function setupBoard()
{
	board = [];
	
	//alters board based on day
	for (let boardRows = 0; boardRows < day; boardRows++)
	{
		let boardRow = [];
		
		for (let boardColumns = 0; boardColumns < day+1; boardColumns++)
		{
			let boardTile = Math.floor(Math.random()*10);
			boardRow.push(boardTile);
		}

		board.push(boardRow);
	}

	window.console.log(board);

}

function drawBoard()
{
	// window.console.log('drawing board');
	for (let boardColumns = 0; boardColumns < board.length; boardColumns++)
	{
		const boardColumn = board[boardColumns];
		
		for (let boardRows = 0; boardRows < boardColumn.length; boardRows++)
		{
			const boardRow = boardColumn[boardRows];
			// window.console.log(boardTile);
			/*
			ctx.beginPath();
			ctx.moveTo(boardRows * 100 + 100, 0);
			ctx.lineTo(boardRows * 100 + 100, boardColumns * 100 + 100);
			ctx.stroke();
			ctx.closePath();
			*/
			ctx.strokeRect(boardRows*100 + 50, boardColumns*100 + 50, 100, 100);
		}
	}
}

function nextLevel()
{
	day++;
	satisfaction = 1;
	setupBoard();
}