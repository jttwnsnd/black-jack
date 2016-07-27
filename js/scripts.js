
// There is no "deck" to draw from

//Build the deck of cards
var theDeck = [];
//Keep track of scores in-game
var totalPlayer = document.getElementsByClassName('dealer-total-number')[0];
var totalDealer = document.getElementsByClassName('player-total-number')[0];
//Overall Scores
var overallPlayer = document.getElementsByClassName('player-overall-number')[0];
var overallDealer = document.getElementsByClassName('dealer-overall-number')[0];
var overallDealerNumber = 0;
var overallPlayerNumber = 0;
//gold collector for placing bets
var betTally = document.getElementsByClassName('bet-tally')[0];
var earningTally = document.getElementsByClassName('earning-tally')[0];
//Keep track of what is in the hands
var playersHand = [];
var dealersHand = [];
//What card is next
var topOfTheDeck = 4;
//Game is over, reset
var gameOver = 0;

$(document).ready(function(){
	$('.gold-five').click(function(){
		placeBet(5);
	})
	$('.gold-twenty').click(function(){
		placeBet(20);
	})
	$('.gold-hundred').click(function(){
		placeBet(100);
	})
	$('.deal-button').click(function(){
		createDeck();
		shuffleDeck();

		//pushes cards onto the respective array, the new card. then place it in the DOM
		playersHand.push(theDeck[0]);
		// places cards onto table
		placeCard('player', 'one', theDeck[0]);

		dealersHand.push(theDeck[1]);
		placeCard('dealer', 'one', theDeck[1]);

		playersHand.push(theDeck[2]);
		placeCard('player', 'two', theDeck[2]);

		dealersHand.push(theDeck[3]);
		placeCard('dealer', 'two', theDeck[3]);

		calculateTotal(playersHand, 'player');
		calculateTotal(dealersHand, 'dealer');
	})
	$('.hit-button').click(function(){
		var slotForNewCard = '';
		if(playersHand.length == 2){slotForNewCard = "three";}
		else if(playersHand.length == 3){slotForNewCard = "four";}
		else if(playersHand.length == 4){slotForNewCard = "five";}
		else if(playersHand.length == 5){slotForNewCard = "six";}
		placeCard('player', slotForNewCard, theDeck[topOfTheDeck]);
		playersHand.push(theDeck[topOfTheDeck]);
		calculateTotal(playersHand, 'player');
		topOfTheDeck++;
		checkWin();
		
	})
	$('.stand-button').click(function(){
		// player clicked stans. what happens to player? nothing.
		var slotForNewCard = '';
		var dealerTotal = calculateTotal(dealersHand, 'dealer');
		console.log(dealerTotal);
		while(dealerTotal < 17){
			// dealer has less than 17. hit away
			if(dealersHand.length == 2){slotForNewCard = 'three';}
			else if(dealersHand.length == 3){slotForNewCard = 'four';}
			else if(dealersHand.length == 4){slotForNewCard = 'five';}
			else if(dealersHand.length == 5){slotForNewCard = 'six';}
			placeCard('dealer', slotForNewCard, theDeck[topOfTheDeck]);
			dealersHand.push(theDeck[topOfTheDeck]);
			dealerTotal = calculateTotal(dealersHand, 'dealer');
			topOfTheDeck++;
		}
		// dealer has at least 17. check to see who won
		checkWin();
	})
	$('.reset').click(function(){
		reset();
	})
})
$(document).ready(function(){
	$('.deal-button').hover(function(){
		$('.deck-cover').css({
			'box-shadow':'0px 2px 5px 1px rgba(0, 0, 0, 0.5)',
			'transform':'translateY(-5px)',
			'transition':'all 0.3s linear'
		})
	} , function(){
		$('.deck-cover').css({
			'box-shadow':'0px 0px 0px 0px rgba(0, 0, 0, 0.0)',
			'transform':'translateY(0px)'
		})
	})
})

// matched up what was similar into a function, and placed in the differences as the argurments
function placeCard(who, where, cardToPlace){
	//sets up location info for imgToPlace
	var location = cardToPlace;
	var classSelector = '.' + who + '-cards .card-' + where;
	var imgToPlace = 'url("css/images/' + location + '.png")';
	// $(classSelector).css({
	// 	'backgroundImage': imgToPlace
	// })
	if((who === 'player') || ((who === 'dealer') && (where === 'one'))){
	$(classSelector).delay(200).fadeOut(500, function(){
		$(this).css({'backgroundImage':imgToPlace}).fadeIn(500);
	})
	}else if(where !== 'one'){
		$(classSelector).css({'backgroundImage':'url("css/images/card-back-new.jpg")'});
	}
}

function createDeck(){
	// fill with:
	// - 52 cards
	// -4 suits
	// -h, s, d, c
	var suits = ['H', 'S', 'D', 'C'];
	for(var s = 0; s < suits.length; s++){
		for(var c = 1; c <= 13; c++){
			if(c == 11){

			}
			theDeck.push(c+suits[s]);
		}
	}
}

function shuffleDeck(){
	for(var i = 1; i < 156; i++){
		var card1 = Math.floor(Math.random() * theDeck.length);
		var card2 = Math.floor(Math.random() * theDeck.length);
		var temp = theDeck[card1];
		theDeck[card1] = theDeck[card2];
		theDeck[card2] = temp;
	}
}

function calculateTotal(hand, whosTurn){
	var total = 0;
	var cardValue = 0;
	for(var i = 0; i < hand.length; i++){
		cardValue = Number(hand[i].slice(0,-1));
		if (cardValue > 10){
			cardValue = 10;
		}
		if(cardValue === 1){
			cardValue = 11;
		}
		total += cardValue;
		if((cardValue === 11) && (total > 21)){
			total -= 10;
		}
	}
	// Update the html with the new total
	var elementToUpdate = '.' + whosTurn + '-total-number';
	$(elementToUpdate).text(total);

	return total;
}

//Game winning conditions
function checkWin(){
	var playerTotal = calculateTotal(playersHand, 'player');
	//get player total
	var dealerTotal = calculateTotal(dealersHand, 'dealer');
	if(playerTotal > 21){
		//If player busts
		var message = 'Player has exceed limit with ' + playerTotal + '. House wins.';
		$('.game-alerts').html(message);
		$('.hit-button, .stand-button, .deal-button').attr('disabled', 'disabled');
		gameOver++;
		overallDealerNumber++;
		overallDealer.innerHTML++;
		overallDealerNumber--;
	}else if(dealerTotal > 21){
		//If house busts
		var message = 'House has exceed limit with ' + dealerTotal + '. Player wins.';
		$('.game-alerts').html(message);
		$('.hit-button, .stand-button, .deal-button').attr('disabled', 'disabled');
		gameOver++;
		overallPlayerNumber++;
		overallPlayer.innerHTML++;
		overallPlayerNumber--;
	}else if (dealerTotal >= 17){
		//No on has exceeded the limit
		if(playerTotal > dealerTotal){
			//Player wins
			var message = 'Player beats House with ' + playerTotal + '. Player wins.';
			$('.game-alerts').html(message);
			$('.hit-button, .stand-button, .deal-button').attr('disabled', 'disabled');
			gameOver++;
			overallPlayerNumber++;
			overallPlayer.innerHTML++;
			overallPlayerNumber--;
		}else if(dealerTotal > playerTotal){
			//House wins
			var message = 'House beats Player with ' + dealerTotal + '. House wins.';
			$('.game-alerts').html(message);
			$('.hit-button, .stand-button, .deal-button').attr('disabled', 'disabled');
			overallDealerNumber++;
			overallDealer.innerHTML++;
			overallDealerNumber--;
			gameOver++;
		}else{
			//Tie
			var message = 'Both House and Player have same score. No loss.';
			$('.game-alerts').html(message);
			$('.hit-button, .stand-button, .deal-button').attr('disabled', 'disabled');
			gameOver++;
		}
	}
	betResults();
	if(gameOver === 1){
		$('.reset').css({
			'display':'inline-block'
		})
	}
}
//resets the game
function reset(){
	gameOver--;
	playersHand = [];
	dealersHand = [];
	$('.card').each(function(){
		$('.card').css({
			'backgroundImage':"url('css/images/card-back-new.jpg')"
		});
	})
	$('.dealer-total-number').html('0');
	$('.player-total-number').html('0');
	$('.hit-button, .stand-button, .deal-button').removeAttr('disabled');
	$('.game-alerts').html('');
	$('.reset').css({
		'display':'none'
	})
	betTally.innerHTML = 0;
}

function placeBet(which){
	var temp = betTally.innerHTML;
	var total = parseInt(temp) + which;
	betTally.innerHTML = total.toString();

}
function betResults(){
	var betTemp = betTally.innerHTML;
	var earningTemp = earningTally.innerHTML;
	if(overallPlayerNumber++){
		var addTotal = parseInt(betTemp + earningTemp);
		earningTally.innerHTML = addTotal;
	}else if(overallDealerNumber++){
		var subTotal = parseInt(earningTemp + betTemp);
		earningTally.innerHTML = subTotal;
	}
}