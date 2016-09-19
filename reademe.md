#Black Jack Using jQuery/Javascript, HTML, and CSS

##The Javascript features:
Three set of buttons (Bet, reset, & player) respond to clicks. 
Player buttons (deal, hit, and stand) act when called upon through jQuery.
Bet options increment and will be added to earnings. Bets can be stacked.
Reset button only appears when game is over.
Cards fade in to what they are, with House hand having only one card revealed.

![Screenshot of the game](/css/images/Black-jack-screenshot.png)
##Styling features:
Bootstrap set up the grid and overall layout.
The alchemy color palette from color-hex.com was used.

##Challenges And My Solutions:

Correct Image with Cards: I set a universal background image for the cards, and created a forumla to call the specific card. instead of placing the value of the specific card in HTML, I used its value as the call for the image. I saved all the corresponding images with the call that is in this program. This allowed me to directly call it without jumping through hoops of what I called each.

Correctly Adding up the Card values: Ace can be 1 or 11, depending on whether your value exceeds 21. I put an if state in the card calculating function to make sure it was handled properly.

Making the cards transition in from "no where": I used CSS transition and called them using jQuery. Each card got a class that had a transition set, and was given a class that moved it over as well.

##Hopeful Changes:
Biggest is the card flipping. If I can get that to work, then I would like the card to move then flip for us.

###Picture Credits
background image - http://img10.deviantart.net/529d/i/2013/275/0/b/old_paper_texture_large_file_by_karlsquell-d6oxyxn.png

back of card design - https://playingcardcollector.files.wordpress.com/2013/03/alphadesigner-mythos-back-of-card-1.png
back of card design 2 - https://s-media-cache-ak0.pinimg.com/564x/58/17/85/581785ed38d3e41c25a22163c845abec.jpg