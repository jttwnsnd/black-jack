// 1. when the user clicks deal, deal
var theDeck = [];
var totalPlayer = 0;
var totalDealer = 0;

$(document).ready(function(){
	$('.deal-button').click(function(){
		createDeck();
		shuffleDeck();
		placeCard('player', 'one', theDeck[0]);
		placeCard('dealer', 'one', theDeck[1]);
		placeCard('player', 'two', theDeck[2]);
		placeCard('dealer', 'two', theDeck[3]);

		
	})
	$('.hit-button').click(function(){
		placeCard('player', 'three', theDeck[4]);
		
	})
	$('.stand-button').click(function(){
		
	})
})

// matched up what was similar into a function, and placed in the differences as the argurments
function placeCard(who, where, cardToPlace){
	var classSelector = '.' + who + '-cards .card-' + where;
	$(classSelector).html(cardToPlace);
	if(who == 'player'){
		totalPlayer += parseInt(cardToPlace);
		$('.player-total-number').text(totalPlayer);
	}else if(who == 'dealer'){
		totalDealer += parseInt(cardToPlace);
		$('.dealer-total-number').text(totalDealer);
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