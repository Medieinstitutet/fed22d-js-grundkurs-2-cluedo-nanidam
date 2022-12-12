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

// guess btn
export const guessBtn = document.querySelector('.guess-btn');
export const accuseBtn = document.querySelector('.accuse-btn');

// draw 1 card from each deck and put then in "accuseDeck"
const drawCharAccuse: string[] = [...charDeck].splice(randomNum0to5(), 1);
const drawWeaponAccuse: string[] = [...weaponDeck].splice(randomNum0to5(), 1);
const drawRoomAccuse: string[] = [...roomDeck].splice(randomNum0to8(), 1);
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

  return tempArray;
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
export const bgBlock = document.querySelector('.bg-block');

// players
export const playerYou:HTMLElement = createPlayerPieces('player-piece', 'public/animal-ape-apes-svgrepo-com.svg', 'An orange ape representing your board piece');
export const player1 = createPlayerPieces('player1-piece', 'public/animal-cachorro-dog-svgrepo-com.svg', 'A brown dog representing player 2 board piece');
export const player2 = createPlayerPieces('player2-piece', 'public/animal-elefante-elephant-svgrepo-com.svg', 'A grey elephant representing player 2 board piece');

startGameBtn.addEventListener('click', () => {
  playerName.innerHTML = playerInput.value;
  validatePlayerInput();
  bgBlock?.classList.add('hidden');
});

const movePlayer1 = () => {
  allRooms[randomNum0to8()].appendChild(player1);
};

const movePlayer2 = () => {
  allRooms[randomNum0to8()].appendChild(player2);
};
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
  movePlayer1();
  movePlayer2();
};

const enableGuessAccuseBtns = () => {
  guessBtn.disabled = false;
  accuseBtn.disabled = false;
};

const disableGuessAccuseBtns = () => {
  guessBtn.disabled = true;
  accuseBtn.disabled = true;
};

// move player you to different rooms
const movePlayer = (e: Event) => {
  disableRoomBtns();
  if (!e.target.contains(playerYou)) {
    e.target.appendChild(playerYou);
    // TODO: enabled accuse and guess btn

    enableGuessAccuseBtns();
  } else {
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

function disableRoomBtns() {
  allRooms.forEach((button) => {
    button.disabled = true;
  });
}
function enableRoomBtns() {
  allRooms.forEach((button) => {
    button.disabled = false;
  });
}
function disableDice() {
  dice.disabled = true;
}
function enableDice() {
  dice.disabled = false;
}

export const rollDice = (e: Event) => {
  const diceNr = randomNum0to5() + 1;
  if (diceNr > 3) {
    enableRoomBtns();
    disableDice();
  } else {
    disableRoomBtns();
  }

  updateCount();
  e.target.innerHTML = diceNr;
};

const defaultDice = () => {
  dice.innerHTML = 'Dice';
};

const guessBox = document.querySelector('.dropdown');
const guessNameBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.guess-name-btn');
const guessWeaponBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.guess-weapon-btn');
const guessRoomBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.guess-room-btn');

export const guess = () => {
  guessBox?.classList.remove('hidden');
};

const guessMade = { name: false, weapon: false, room: false };

guessNameBtns.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (e: MouseEvent) => {
    // Set the clicked button's background color to red
    (e.target as HTMLButtonElement).style.backgroundColor = 'red';
    guessMade.name = true;
    checkGuessMade();
    // Loop through the buttons again and set the background color to grey
    // for all buttons that are not the clicked button
    guessNameBtns.forEach((btn2: HTMLButtonElement) => {
      if (btn2 !== e.target) {
        btn2.style.backgroundColor = 'grey';
      }
    });
  });
});

guessWeaponBtns.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (e: MouseEvent) => {
    // Set the clicked button's background color to red
    (e.target as HTMLButtonElement).style.backgroundColor = 'red';
    guessMade.weapon = true;
    checkGuessMade();
    // Loop through the buttons again and set the background color to grey
    // for all buttons that are not the clicked button
    guessWeaponBtns.forEach((btn2: HTMLButtonElement) => {
      if (btn2 !== e.target) {
        btn2.style.backgroundColor = 'grey';
      }
    });
  });
});

guessRoomBtns.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (e: MouseEvent) => {
    // Set the clicked button's background color to red
    (e.target as HTMLButtonElement).style.backgroundColor = 'red';
    guessMade.room = true;
    checkGuessMade();
    // Loop through the buttons again and set the background color to grey
    // for all buttons that are not the clicked button
    guessRoomBtns.forEach((btn2: HTMLButtonElement) => {
      if (btn2 !== e.target) {
        btn2.style.backgroundColor = 'grey';
      }
    });
  });
});

const checkGuessMade = () => {
  if (guessMade.name === true && guessMade.weapon === true && guessMade.room === true) {
    submitBtn.disabled = false;
  }
};

const submitBtn: Element | null = document.querySelector('.submit-btn');

const playerOneCards: NodeListOf<Element> = document.querySelectorAll('.player1-card');
const playerTwoCards: NodeListOf<Element> = document.querySelectorAll('.player2-card');

// player 1 guesses
const player1GuessBox = document.querySelector('.player1-guess');
const player1GuessName = document.querySelector('.pl1-guess-name');
const player1GuessWeapon = document.querySelector('.pl1-guess-weapon');
const player1GuessRoom = document.querySelector('.pl1-guess-room');

// player 2 guesses
const player2GuessBox = document.querySelector('.player2-guess');
const player2GuessName = document.querySelector('.pl2-guess-name');
const player2GuessWeapon = document.querySelector('.pl2-guess-weapon');
const player2GuessRoom = document.querySelector('.pl2-guess-room');

// default player 1 hand after each turn
const defaultPl1Hand = () => {
  playerOneHand.forEach((card: string, i: number) => {
    playerOneCards[i].innerHTML = `Card ${i + 1}`;
    playerOneCards[i].style.backgroundColor = 'grey';
  });
};

// default player 2 hand after each turn
const defaultPl2Hand = () => {
  playerTwoHand.forEach((card: string, i: number) => {
    playerTwoCards[i].innerHTML = `Card ${i + 1}`;
    playerTwoCards[i].style.backgroundColor = 'grey';
  });
};

const defaultYouHand = () => {
  playerYouHand.forEach((card: string, i: number) => {
    playerYouCards[i].style.backgroundColor = 'orange';
  });
};

// player 1 action after you make a guess
const player1Actions = () => {
  defaultPl1Hand();
  defaultPl2Hand();
  const diceNr = randomNum0to5() + 1;
  dice.innerHTML = diceNr;
  if (diceNr > 3) {
    setTimeout(movePlayer1, 1000 * 1);

    const guessedName = charDeck[randomNum0to5()];
    const guessedWeapon = weaponDeck[randomNum0to5()];
    const guessedRoom = roomDeck[randomNum0to8()];
    player1GuessName.innerHTML = guessedName;
    player1GuessWeapon.innerHTML = guessedWeapon;
    player1GuessRoom.innerHTML = guessedRoom;
    setTimeout(() => { player1GuessBox?.classList.remove('hidden'); }, 1000 * 1);
    const indexOfNameMatchPl2 = playerTwoHand.indexOf(guessedName);
    const indexOfWeaponMatchPl2 = playerTwoHand.indexOf(guessedWeapon);
    const indexOfRoomMatchPl2 = playerTwoHand.indexOf(guessedRoom);

    const indexOfNameMatchPlU = playerYouHand.indexOf(guessedName);
    const indexOfWeaponMatchPlU = playerYouHand.indexOf(guessedWeapon);
    const indexOfRoomMatchPlU = playerYouHand.indexOf(guessedRoom);

    setTimeout(() => {
      if (indexOfNameMatchPl2 > -1) {
        playerTwoCards[indexOfNameMatchPl2].style.backgroundColor = 'blue';
      }
      if (indexOfWeaponMatchPl2 > -1) {
        playerTwoCards[indexOfWeaponMatchPl2].style.backgroundColor = 'blue';
      }
      if (indexOfRoomMatchPl2 > -1) {
        playerTwoCards[indexOfRoomMatchPl2].style.backgroundColor = 'blue';
      }
    }, 1000 * 1);

    setTimeout(() => {
      if (indexOfNameMatchPlU > -1) {
        playerYouCards[indexOfNameMatchPlU].style.backgroundColor = 'blue';
      }
      if (indexOfWeaponMatchPlU > -1) {
        playerYouCards[indexOfWeaponMatchPlU].style.backgroundColor = 'blue';
      }
      if (indexOfRoomMatchPlU > -1) {
        playerYouCards[indexOfRoomMatchPlU].style.backgroundColor = 'blue';
      }
    }, 1000 * 1);
    setTimeout(() => {
      player1GuessBox?.classList.add('hidden');
    }, 1000 * 2);
  } else {
    player1Actions();
  }
};

const player2Actions = () => {
  defaultPl1Hand();
  defaultPl2Hand();
  const diceNr = randomNum0to5() + 1;
  dice.innerHTML = diceNr;
  if (diceNr > 3) {
    setTimeout(movePlayer2, 1000 * 1);

    const guessedName = charDeck[randomNum0to5()];
    const guessedWeapon = weaponDeck[randomNum0to5()];
    const guessedRoom = roomDeck[randomNum0to8()];
    player2GuessName.innerHTML = guessedName;
    player2GuessWeapon.innerHTML = guessedWeapon;
    player2GuessRoom.innerHTML = guessedRoom;
    setTimeout(() => { player2GuessBox?.classList.remove('hidden'); }, 1000 * 1);
    const indexOfNameMatchPl1 = playerOneHand.indexOf(guessedName);
    const indexOfWeaponMatchPl1 = playerOneHand.indexOf(guessedWeapon);
    const indexOfRoomMatchPl1 = playerOneHand.indexOf(guessedRoom);

    const indexOfNameMatchPlU = playerYouHand.indexOf(guessedName);
    const indexOfWeaponMatchPlU = playerYouHand.indexOf(guessedWeapon);
    const indexOfRoomMatchPlU = playerYouHand.indexOf(guessedRoom);

    setTimeout(() => {
      if (indexOfNameMatchPl1 > -1) {
        playerOneCards[indexOfNameMatchPl1].style.backgroundColor = 'pink';
      }
      if (indexOfWeaponMatchPl1 > -1) {
        playerOneCards[indexOfWeaponMatchPl1].style.backgroundColor = 'pink';
      }
      if (indexOfRoomMatchPl1 > -1) {
        playerOneCards[indexOfRoomMatchPl1].style.backgroundColor = 'pink';
      }
    }, 1000 * 1);

    setTimeout(() => {
      if (indexOfNameMatchPlU > -1) {
        playerYouCards[indexOfNameMatchPlU].style.backgroundColor = 'pink';
      }
      if (indexOfWeaponMatchPlU > -1) {
        playerYouCards[indexOfWeaponMatchPlU].style.backgroundColor = 'pink';
      }
      if (indexOfRoomMatchPlU > -1) {
        playerYouCards[indexOfRoomMatchPlU].style.backgroundColor = 'pink';
      }
    }, 1000 * 1);
    setTimeout(() => {
      player2GuessBox?.classList.add('hidden');
    }, 1000 * 5);
  } else {
    player2Actions();
  }
};
console.table(playerOneHand);
console.table(playerTwoHand);
console.table(playerYouHand);

// TODO: add timer for animation
submitBtn?.addEventListener('click', () => {
  const guessedName = document.querySelectorAll('.guess-name-btn[style*="background-color: red"]')[0].innerHTML;
  const guessedWeapon = document.querySelectorAll('.guess-weapon-btn[style*="background-color: red"]')[0].innerHTML;
  const guessedRoom = document.querySelectorAll('.guess-room-btn[style*="background-color: red"]')[0].innerHTML;

  playerOneHand.forEach((card: string, i: number) => {
    if (card === guessedName || card === guessedWeapon || card === guessedRoom) {
      playerOneCards[i].innerHTML = playerOneHand[i];
      playerOneCards[i].style.backgroundColor = 'green';
    }
  });
  playerTwoHand.forEach((card: string, i: number) => {
    if (card === guessedName || card === guessedWeapon || card === guessedRoom) {
      playerTwoCards[i].innerHTML = playerTwoHand[i];
      playerTwoCards[i].style.backgroundColor = 'green';
    }
  });
  guessNameBtns.forEach((btn: HTMLButtonElement) => {
    btn.style.backgroundColor = 'grey';
  });
  guessWeaponBtns.forEach((btn1: HTMLButtonElement) => {
    btn1.style.backgroundColor = 'grey';
  }); guessRoomBtns.forEach((btn2: HTMLButtonElement) => {
    btn2.style.backgroundColor = 'grey';
  });
  disableGuessAccuseBtns();
  guessBox?.classList.add('hidden');
  defaultDice();

  setTimeout(player1Actions, 1000 * 3);
  setTimeout(player2Actions, 1000 * 10);
});
