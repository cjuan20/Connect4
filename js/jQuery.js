$(function(){

var playerOne = "red";
var playerTwo = "black";
var player = playerOne; //The player that is currently playing, will be either "red" or "black"
var player1Name = "";
var player2Name = "";
var player1WinTotal = 0;
var player2WinTotal = 0;


// Creating the gameboard
$col = $('.col');
$gameboard = $('.gameboard');

for (var i = 1; i < 7; i++) {
	$createCol = $col.clone().appendTo($gameboard); //create new col
	$createCol.attr('id', 'col' + (i+1)); //add col id to each new col
	}

//Display playerName & score
$submitButton = $('#submitButton').click(function(){
	player1Name = $('#player1').val();
	player2Name = $('#player2').val();

	var player1NameTag = $("#player1NameTag");
	var player2NameTag = $("#player2NameTag");

	player1WinTotal = 0;
	player2WinTotal = 0;

	player1NameTag.html('<img src="style/img/p1.png">' + player1Name + ': <span id="score1">' + player1WinTotal + '</span>');
	player2NameTag.html('<img src="style/img/p2.png">' + player2Name + ': <span id="score2">' + player2WinTotal + '</span>');
});

//append message tail after all col 

$messagebottom = $('#messagebottom').appendTo($gameboard); 

//---------------------------------------------------------------------
//Start a new game 
var newGame = $('#newGame');
newGame.click(function(){
	clearBoard();
});


// Adding click function to each dropbutton
$newCol = $('.col'); //selecting all the new col

$dropClick = $('.dropbutton').children(); //Select each drop button

for (var i = 0; i < $dropClick.length; i++) {
	$dropClick.eq(i).click(function(){ //when clicking every dropbutton
	// console.log('clicked'); 
	// console.log(this.id);
	if (this.id == "drop1") {
		$colChildren = $('#col1').children(); //select children of col #1
			dropPiece($colChildren, 0); //calling dropPiece function with the columns children(slots) and the column number
		} //--> ends dropPiece in col #1

	if (this.id == "drop2") {
			$colChildren = $('#col2').children(); 
				dropPiece($colChildren, 1); 
			} 
	if (this.id == "drop3") {
			$colChildren = $('#col3').children(); 
				dropPiece($colChildren, 2); 
			} 
	if (this.id == "drop4") {
			$colChildren = $('#col4').children(); 
				dropPiece($colChildren, 3); 
			} 
	if (this.id == "drop5") {
			$colChildren = $('#col5').children(); 
				dropPiece($colChildren, 4); 
			} 
	if (this.id == "drop6") {
			$colChildren = $('#col6').children(); 
				dropPiece($colChildren, 5); 
			} 
	if (this.id == "drop7") {
			$colChildren = $('#col7').children(); 
				dropPiece($colChildren, 6); 
			} 
	}) //--> ends click function
} //--> ends for loop


//function to change color of each slot
var dropPiece = function(colChildren, colIndex) {
	for (var j = $colChildren.length-1; j >= 0; j--) { //start from the last eq(j)
		if (colChildren.eq(j).css('background-color') === 'rgb(255, 255, 255)') { //Check if each slot is white = rgb(255, 255, 255) 
			if (player == playerOne) {
			  
			 	colChildren.eq(j).addClass('red'); //add classname 'red' to each row
				//style each piece
			 	$red = $('.red');
			 	$red.css("background-image", "url(style/img/red.png)");
			 	$red.css("background-size", "100%");

				var winner = checkWinner([j, colIndex]); //check for a winner, pass in an array of [row, col]
				console.log(winner);
				if (winner.winner != 0){
					alert("The winner is " + player1Name);
					player1WinTotal += 1; //add player1 score if player1 won

					var scoreSpan = $("#score1");
					scoreSpan.html(player1WinTotal); //Display player 1 score
					clearBoard(); //clear board after player 1 wins
					return; //stop the game when one player wins
				}
				player = playerTwo; //change to playerTwo

			} else {
				// colChildren.eq(j).css('background-color', 'black'); //if playerOne color slot in black (styling in css)
				colChildren.eq(j).addClass('black'); //add classname 'black' to each row
				//style each piece
				$black = $('.black');
			 	$black.css("background-image", "url(style/img/black.png)");
			 	$black.css("background-size", "100%");
				
				var winner = checkWinner([j, colIndex]); //check for a winner, pass in an array of [row, col]
				console.log(winner);
				if (winner.winner != 0){
					alert("The winner is " + player2Name);
					player2WinTotal += 1; //add player2 score if player2 won

					var scoreSpan = $("#score2");
					scoreSpan.html(player2WinTotal); //Display player 1 score
					clearBoard(); //clear board after player 1 wins
				}
				player = playerOne; //change to playerOne
			}
			break; //break after color in one slot
		} //--> ends check if color = white
	} //--> ends for looping thru col 
} //--> ends dropPiece function

//---------------------------------------------------------------------


//Winning Logic

//This is a function that returns a string value of 'red', 'black' or 'none'
var getColorForRowInCol = function(rowColArray) { 
//Parameter rowColArray is an array = [row#, col#]

	var row = rowColArray[0];
	var col = rowColArray[1];

	col += 1; //Index # of the column + 1 = ID# of the column
	
	var getColumn = $('#col' + col).children(); //Get the children of the column from the array with the id of column (#col1, #col2, etc.)
	var getRow = getColumn.eq(row); //Get the row using eq(row)
	var backgroundColor = getRow.css('background-color'); //Get the background color of the row and check for what color it is

	if (backgroundColor === 'rgb(255, 0, 0)') {
		return 'red';
	} else if (backgroundColor === 'rgb(0, 0, 0)') {
		return 'black';
	} else {
		return 'none';
	}
}

//Winning combinations, vertical/horizontal/diagonal
var checkWinner = function(rowColArray) { //rowColArray = [row, col]
	var numOfCols = 7; //the total number of columns 
	var numOfRows = 6; //the total number of rows 

	var color; //The color that will be checked

	var row = rowColArray[0]; //Get the row index
	var col = rowColArray[1]; //Get the col index

  // check ROWS using the row index we get from the rowColArray parameter
  for (var c = 0; c < numOfCols - 3; c++) { //c = column index
  //Loop #1 - using (numOfCols - 3) to check a maximum of 4 cols for a winner
    color = getColorForRowInCol([row, c]); 
    //Will give either red or black

    if (color === player) { //Make sure the player is the same as the color of the class name
			var nextCol1 = getColorForRowInCol([row, c+1]); //Get the color for the slot in the column directly after the current c being used
			var nextCol2 = getColorForRowInCol([row, c+2]); //Get 2nd after current c
			var nextCol3 = getColorForRowInCol([row, c+3]); //Get 3rd after current c
      if (nextCol1 === color && nextCol2 === color && nextCol3 === color) { //Check if 3 slots have the same color as the first one 
          return { //If the if statement is true, it means that the color has 4 slots in a column, return the winner
          winner: color,
          squares: [[row, c], [row, c+1], [row, c+2], [row, c+3]]
        	}; //-> Ends creation of object being sent
        } //--> Ends if slots are same color
      } //--> Ends if color = player
  	} //-->Ends For Loop #1
    
    // check COLUMNS using the col index we get from the rowColArray parameters
  for (r = 0; r < numOfRows - 3; r++) { //r = row index
  //Loop #2 - we are using (numOfRows - 3) to check a maximum of 4 rows for a winner
      color = getColorForRowInCol([r, col]); 

      if (color === player) { 
	 			var nextRow1 = getColorForRowInCol([r+1, col]); //Get the color for the slot in the column directly after the current r being used
				var nextRow2 = getColorForRowInCol([r+2, col]); //Get 2nd after current r
	 			var nextRow3 = getColorForRowInCol([r+3, col]); //Get 3rd after current r
      if (nextRow1 === color && nextRow2 === color && nextRow3 === color) { //Check if 3 slots have the same color as the first one
          return {//If the if statement is true, it means that the color has 4 slots in a row, return the winner
            winner: color,
            squares: [[r, col], [r+1, col], [r+2, col], [r+3, col]]
          }; //-> Ends creation of object being sent
        } //--> Ends if slots are same color
      } //--> Ends if color = player
  } //-->Ends For Loop #2

    // check NW-SE diagonals
    for(c = 0; c < numOfCols - 3; c++) { 
    //Loop #3 - Diagnol checks, c = col index
      for (r = 0; r < numOfRows - 3; r++) {  //r is the row index
        color = getColorForRowInCol([r, c]);
        if (color === player) {
		 			var nextSlot1 = getColorForRowInCol([r+1, c+1]); //Get color of slot in column directly diagnol to the current r & current c 
					var nextSlot2 = getColorForRowInCol([r+2, c+2]); //Get 2nd after current r & current c
		 			var nextSlot3 = getColorForRowInCol([r+3, c+3]); //Get 3rd after current r & current c

          if (getColorForRowInCol([r+1, c+1]) === color && getColorForRowInCol([r+2, c+2]) === color && getColorForRowInCol([r+3, c+3]) === color) { //Check if 3 slots have the same color as the first one 
            return { //If the if statement is true, it means that the color has 4 slots going diagonaly, return the winner
              winner: color,
              squares: [[r, c], [r+1, c+1], [r+2, c+2], [r+3, c+3]]
            }; //-> Ends creation of object being sent
          } //--> Ends if slots are same color
        } //--> Ends if color = player
      } //--> Ends For Loop #3 - r index
    } //-->Ends For Loop #3 - c index

    // check SW-NE diagonals
    for(c = 0; c < numOfCols - 3; c++) { //Begin For Loop #4 - Diagnol checks, c is the col index
      for (r = 3; r < numOfRows; r++) { //r is the row index
        color = getColorForRowInCol([r, c]);
        if (color === player) { 
		 			var nextSlot1 = getColorForRowInCol([r-1, c+1]); //Get color of slot in column to the bottom diagnol to the current r & directly diagnol to the current c being used
					var nextSlot2 = getColorForRowInCol([r-2, c+2]); //Get 2nd before current r and after current c
		 			var nextSlot3 = getColorForRowInCol([r-3, c+3]); //Get 3rd before current r and after current c

          if (nextSlot1 === color && nextSlot2 === color && nextSlot3 === color) { //Check if 3 slots have the same color as the first one we got
            return { //If the if statement is true, it means that the color has 4 slots going diagonaly, return the winner
              winner: color,
              squares: [[r, c], [r-1, c+1], [r-2, c+2], [r-3, c+3]]
            }; //-> Ends creation of object being sent
          } //--> Ends if slots are same color
        } //--> Ends if color = player
      } //--> Ends For Loop #4 - r index
    } //-->Ends For Loop #4 - c index

    return {winner: 0}; //--> returns no winner if no one won
} //--> ends checkWinner


// Clear board
var clearBoard = function() {
	$('.red').removeClass("red").removeAttr('style'); //Get all element w/ class .red
	$('.black').removeClass("black").removeAttr('style'); //Get all element w/ class .black

} //--> ends clearBoard function





})//--> ends $(function(){})

