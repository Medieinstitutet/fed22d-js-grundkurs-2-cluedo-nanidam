export function createPlayerPieces(className:string, source:string, altText:string): HTMLElement {
  // Create a div element with the "player-piece" class
  const div: HTMLDivElement = document.createElement('div');
  div.classList.add(className);

  // Create an img element with the specified src and alt attributes
  const img: HTMLImageElement = document.createElement('img');
  img.src = source;
  img.alt = altText;

  // Append the img element to the div element
  div.appendChild(img);

  // Return the div element
  return div;
}
// character deck
export const charDeck: string[] = [
  'Miss Scarlett', 'Mr. Green', 'Colonel Mustard', 'Professor Plum', 'Mrs. Peacock', 'Mrs. White',
];

export const weaponDeck: string[] = [
  'Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench',
];

export const roomDeck: string[] = [
  'Kitchen', 'Ballroom', 'Conservatory', 'Dining Room', 'Billiard Room', 'Library', 'Lounge', 'Hall', 'Study',
];

// get random nr 0-5
export const randomNum0to5 = ():number => Math.floor(Math.random() * charDeck.length);
export const randomNum0to8 = ():number => Math.floor(Math.random() * roomDeck.length);

// TODO: guess/accuse box instead for alert
export const guess = () => {
  alert('POP UP GUESS BOX SOMEWHERE');
};

// draw 1 card from each deck and put then in "accuseDeck"
const drawCharAccuse: string[] = charDeck.splice(randomNum0to5(), 1);
const drawWeaponAccuse: string[] = weaponDeck.splice(randomNum0to5(), 1);
const drawRoomAccuse: string[] = roomDeck.splice(randomNum0to8(), 1);
export const accuseDeck:string[][] = [];

// draw a card from each categories and put it accuse deck
accuseDeck.push(drawCharAccuse);
accuseDeck.push(drawWeaponAccuse);
accuseDeck.push(drawRoomAccuse);

// players

export const playerOneHand = [];
export const playerTwoHand = [];
export const playerYouHand = [];

export const mergeWeapon: string[] = charDeck.concat(weaponDeck);
export const mergedDeck: string[] = mergeWeapon.concat(roomDeck);

const shuffle = (array: string[]):string[] => {
  const tempArray:string[] = [...array];
  let currentIndex:number = array.length;
  let randomIndex:number;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [tempArray[currentIndex], tempArray[randomIndex]] = [
      tempArray[randomIndex], tempArray[currentIndex]];
  }

  return array;
};

const shuffledCard: string[] = shuffle(mergedDeck);
// FIXME: dealt all cards. What happens to the rest of the deck if only 3 each? How to play this game?

while (playerYouHand.length < 3) {
  playerOneHand.push(shuffledCard.shift());
  playerTwoHand.push(shuffledCard.shift());
  // if shuffledCard is not empty -> push
  if (shuffledCard.length !== 0) {
    playerYouHand.push(shuffledCard.shift());
  }
}

// timer
export const currentTimer = document.querySelector('.current-timer');
// Set the initial number of minutes and seconds
export let minutes = 0;
export let seconds = 0;

// FIXME: snygga till currentTimer som presenteras
export function timer() {
  seconds += 1;

  // If the number of seconds has reached 60,
  // increment the number of minutes and reset
  // the number of seconds to 0
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }

  // Display the current time
  currentTimer.innerHTML = `${minutes}:${seconds}`;
}

export const errorMsgName = document.querySelector('.error-name');
export const allRooms = document.querySelectorAll('.room-btn');
export const playerInput = document.querySelector('#input-name');
export const startGameBtn = document.querySelector('.start-btn');
export const introBox = document.querySelector('.intro-text');
export const playerName = document.querySelector('.player-name');

// players
export const playerYou:HTMLElement = createPlayerPieces('player-piece', 'public/animal-ape-apes-svgrepo-com.svg', 'An orange ape representing your board piece');
export const player1 = createPlayerPieces('player1-piece', 'public/animal-cachorro-dog-svgrepo-com.svg', 'A brown dog representing player 2 board piece');
export const player2 = createPlayerPieces('player2-piece', 'public/animal-elefante-elephant-svgrepo-com.svg', 'A grey elephant representing player 2 board piece');

// validate player-input field.
// If inputfield is left empty ->
// show error msg until something is entered in inputfield
// close box when inputfield is valid
export const validatePlayerInput = () => {
  if (playerInput.value === '') {
    errorMsgName?.classList.remove('hidden');
    return;
  }
  introBox?.classList.add('hidden');
  const intervalId: number = setInterval(timer, 1000);
  timer();

  allRooms[randomNum0to8()].appendChild(playerYou);
  allRooms[randomNum0to8()].appendChild(player1);
  allRooms[randomNum0to8()].appendChild(player2);
};

// move player you to different rooms
const movePlayer = (e: Event) => {
  if (!e.target.contains(playerYou)) { e.target.appendChild(playerYou); } else {
    alert('Must choose another room');
  }
};

for (const btn of allRooms) {
  btn.addEventListener('click', movePlayer);
}

const playerYouCards = document.querySelectorAll('.your-card');

playerYouCards.forEach((card, i) => {
  card.innerHTML = playerYouHand[i];
});

// dice & counter
export const dice = document.getElementsByClassName('dice')[0];

// when dice is clicked on -> add +1 on count
export let count: number;
count = 0;

export const updateCount = ():void => {
  count += 1;
};

function disableButtons() {
  allRooms.forEach((button) => {
    button.disabled = true;
  });
}
function enableButtons() {
  allRooms.forEach((button) => {
    button.disabled = false;
  });
}

const rollDice = (e: Event) => {
  const frudd = randomNum0to5() + 1;
  if (frudd > 3) {
    console.log('move');
    enableButtons();
  } else {
    console.log('reroll');
    disableButtons();
  }

  updateCount();
  e.target.innerHTML = frudd;
};
dice.addEventListener('click', rollDice);
