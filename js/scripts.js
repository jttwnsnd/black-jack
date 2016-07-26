// 1. when the user clicks deal, deal
var theDeck = [];
var totalPlayer = 0;
var totalDealer = 0;
var playersHand = [];
var dealersHand = [];
var topOfTheDeck = 4;

$(document).ready(function(){
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
})
function checkWin(){
	alert('Game over');
}


// matched up what was similar into a function, and placed in the differences as the argurments
function placeCard(who, where, cardToPlace){
	var classSelector = '.' + who + '-cards .card-' + where;
	$(classSelector).html(cardToPlace);
	// if(who == 'player'){
	// 	totalPlayer += parseInt(cardToPlace);
	// 	$('.player-total-number').text(totalPlayer);
	// }else if(who == 'dealer'){
	// 	totalDealer += parseInt(cardToPlace);
	// 	$('.dealer-total-number').text(totalDealer);
	// }
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
		total += cardValue;
	}
	// Update the html with the new total
	var elementToUpdate = '.' + whosTurn + '-total-number';
	$(elementToUpdate).text(total);

	return total;
}