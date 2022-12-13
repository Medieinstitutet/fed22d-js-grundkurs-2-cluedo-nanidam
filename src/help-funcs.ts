// import {
//   appendDropdownToMain,
// } from './render';

// appendDropdownToMain();

// Lägg alla Appends ovanför .

export function createPlayerPieces(className: string, source: string, altText: string): HTMLElement {
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

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------timer/counter--------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

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
  currentTimer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const resetTimer = () => {
  minutes = 0;
  seconds = 0;
  currentTimer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

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

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------when game starts:----------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
let setTimer: number;

startGameBtn.addEventListener('click', () => {
  defaultDice();
  enableDice();
  accuseNameBtns.forEach((btn: HTMLButtonElement) => {
    btn.style.backgroundColor = 'grey';
  });
  accuseWeaponBtns.forEach((btn1: HTMLButtonElement) => {
    btn1.style.backgroundColor = 'grey';
  }); accuseRoomBtns.forEach((btn2: HTMLButtonElement) => {
    btn2.style.backgroundColor = 'grey';
  });

  playerName.innerHTML = playerInput.value;
  validatePlayerInput();
  resetTimer();
  setTimer = setInterval(timer, 1000);
  commentatorText.innerHTML = 'Roll the dice!';
});

const movePlayer1 = () => {
  allRooms[randomNum0to8()].appendChild(player1);
  commentatorText.innerHTML = 'The dog is on the loose!';
};

const movePlayer2 = () => {
  allRooms[randomNum0to8()].appendChild(player2);
  commentatorText.innerHTML = 'The Elephant is sprinting!';
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
  bgBlock?.classList.add('hidden');

  // assign all players to a random start room
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
const movePlayer = (e?: Event) => {
  if (!e?.currentTarget.contains(playerYou)) {
    e?.currentTarget.appendChild(playerYou);
    disableRoomBtns();
    enableGuessAccuseBtns();
    commentatorText.innerHTML = 'Cowards guess. Idiot accuse. Which one are you?';
  } else {
    commentatorText.innerHTML = "Can't choose the same room! Choose another room.";
  }
};

for (const btn of allRooms) {
  btn.addEventListener('click', movePlayer);
}

const playerYouCards = document.querySelectorAll('.your-card');

playerYouCards.forEach((card, i) => {
  card.innerHTML = playerYouHand[i];
});

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------dice & counter-------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

export const dice = document.getElementsByClassName('dice')[0];

// when dice is clicked on -> add +1 on count
export let count: number;
count = 0;

export const updateCount = ():void => {
  count += 1;
};

function disableDice() {
  dice.disabled = true;
}
function enableDice() {
  dice.disabled = false;
}

const defaultDice = () => {
  dice.innerHTML = 'Dice';
};

export const rollDice = (e: Event) => {
  const diceNr = randomNum0to5() + 1;
  if (diceNr > 3) {
    enableRoomBtns();
    disableDice();
    commentatorText.innerHTML = 'Move to a room.';
  } else {
    disableRoomBtns();
    commentatorText.innerHTML = 'Roll the dice again.';
  }

  updateCount();
  e.target.innerHTML = diceNr;
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

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------guess & accuse btns--------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

// player you's guesses
const guessNameBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.guess-name-btn');
const guessWeaponBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.guess-weapon-btn');
const guessRoomBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.guess-room-btn');
const guessBox = document.querySelector('.guess-box');

// player you's accusation
const accuseNameBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.accuse-name-btn');
const accuseWeaponBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.accuse-weapon-btn');
const accuseRoomBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.accuse-room-btn');
const accuseBox = document.querySelector('.accuse-box');

const submitGuessBtn: HTMLButtonElement = document.querySelector('.submit-guess-btn');
const submitAccuseBtn = document.querySelector('.submit-accuse-btn');

const gameOverLoseBox = document.querySelector('.game-over-lose');
const gameOverWinBox = document.querySelector('.game-over-win');

export const guess = () => {
  guessBox?.classList.remove('hidden');
  bgBlock?.classList.remove('hidden');
};

const guessMade = { name: false, weapon: false, room: false };
const checkGuessMade = () => {
  if (guessMade.name === true && guessMade.weapon === true && guessMade.room === true) {
    submitGuessBtn.disabled = false;
  }
};

guessNameBtns.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (e: MouseEvent) => {
    // Set the clicked button's background color to red
    (e.target as HTMLButtonElement).style.backgroundColor = 'red';
    guessMade.name = true;
    checkGuessMade();
    // Loop through the buttons again and set the background color to grey
    // for all buttons that are not the clicked button
    guessNameBtns.forEach((btn2: HTMLButtonElement) => {
      if (btn2 !== btn) {
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
      if (btn2 !== btn) {
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
      if (btn2 !== btn) {
        btn2.style.backgroundColor = 'grey';
      }
    });
  });
});

// accuse btn

accuseBtn?.addEventListener('click', () => {
  accuseBox?.classList.remove('hidden');
  bgBlock?.classList.remove('hidden');
  commentatorText.innerHTML = 'Are you sure you know the answer? There is no turning back now...';
});

const accuseMade = { name: false, weapon: false, room: false };

accuseNameBtns.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (e: MouseEvent) => {
    // Set the clicked button's background color to red
    (e.target as HTMLButtonElement).style.backgroundColor = 'red';
    accuseMade.name = true;
    checkAccuseMade();
    // Loop through the buttons again and set the background color to grey
    // for all buttons that are not the clicked button
    accuseNameBtns.forEach((btn2: HTMLButtonElement) => {
      if (btn2 !== e.target) {
        btn2.style.backgroundColor = 'grey';
      }
    });
  });
});

accuseWeaponBtns.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (e: MouseEvent) => {
    // Set the clicked button's background color to red
    (e.target as HTMLButtonElement).style.backgroundColor = 'red';
    accuseMade.weapon = true;
    checkAccuseMade();
    // Loop through the buttons again and set the background color to grey
    // for all buttons that are not the clicked button
    accuseWeaponBtns.forEach((btn2: HTMLButtonElement) => {
      if (btn2 !== e.target) {
        btn2.style.backgroundColor = 'grey';
      }
    });
  });
});

accuseRoomBtns.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', (e: MouseEvent) => {
    // Set the clicked button's background color to red
    (e.target as HTMLButtonElement).style.backgroundColor = 'red';
    accuseMade.room = true;
    checkAccuseMade();
    // Loop through the buttons again and set the background color to grey
    // for all buttons that are not the clicked button
    accuseRoomBtns.forEach((btn2: HTMLButtonElement) => {
      if (btn2 !== e.target) {
        btn2.style.backgroundColor = 'grey';
      }
    });
  });
});

const checkAccuseMade = () => {
  if (accuseMade.name === true && accuseMade.weapon === true && accuseMade.room === true) {
    submitAccuseBtn.disabled = false;
  }
};

// TODO: change accuseDeck to one array instead of an array with arrays??
submitAccuseBtn?.addEventListener('click', () => {
  clearInterval(setTimer);

  const accusedName = String(document.querySelectorAll('.accuse-name-btn[style*="background-color: red"]')[0].innerHTML);
  const accusedWeapon = String(document.querySelectorAll('.accuse-weapon-btn[style*="background-color: red"]')[0].innerHTML);
  const accusedRoom = String(document.querySelectorAll('.accuse-room-btn[style*="background-color: red"]')[0].innerHTML);
  const rightName = document.querySelector('.right-answer-name');
  const rightWeapon = document.querySelector('.right-answer-weapon');
  const rightRoom = document.querySelector('.right-answer-room');
  const sumDraws = document.querySelector('.game-over-draws');
  const sumTime = document.querySelector('.game-over-time');

  if (accusedName === accuseDeck[0][0] && accusedWeapon === accuseDeck[1][0] && accusedRoom === accuseDeck[2][0]) {
    accuseBox?.classList.add('hidden');
    gameOverWinBox?.classList.remove('hidden');
    sumDraws.innerHTML = String(count);
    clearInterval(setTimer);
    sumTime.innerHTML = currentTimer.innerHTML;
    addHighscore(playerInput.value, count, sumTime?.innerHTML);
    commentatorText.innerHTML = 'You are the next Sherlock Holmes.';
  } else {
    // change to the correct answers. shown in lost-box
    rightName.innerHTML = accuseDeck[0][0];
    rightWeapon.innerHTML = accuseDeck[1][0];
    rightRoom.innerHTML = accuseDeck[2][0];
    accuseBox?.classList.add('hidden');
    gameOverLoseBox.classList.remove('hidden');
    commentatorText.innerHTML = 'You thought you were clever, huh?';
  }
});

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

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------auto bot 1 & 2 ------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

// player 1 action after you make a guess
const player1Actions = () => {
  const diceNr = randomNum0to5() + 1;
  dice.innerHTML = diceNr;
  if (diceNr > 3) {
    movePlayer1();
    const guessedName = charDeck[randomNum0to5()];
    const guessedWeapon = weaponDeck[randomNum0to5()];
    const guessedRoom = roomDeck[randomNum0to8()];
    player1GuessName.innerHTML = guessedName;
    player1GuessWeapon.innerHTML = guessedWeapon;
    player1GuessRoom.innerHTML = guessedRoom;
    setTimeout(() => { player1GuessBox?.classList.remove('hidden'); commentatorText.innerHTML = 'The Dog is making a guess'; }, 1000 * 6);

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
    }, 1000 * 6);

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
    }, 1000 * 6);
    setTimeout(() => {
      player1GuessBox?.classList.add('hidden');
      defaultPl2Hand();
      defaultYouHand();
    }, 1000 * 10);
  } else {
    player1Actions();
  }
};

const player2Actions = () => {
  const diceNr = randomNum0to5() + 1;
  dice.innerHTML = diceNr;
  if (diceNr > 3) {
    movePlayer2();
    const guessedName = charDeck[randomNum0to5()];
    const guessedWeapon = weaponDeck[randomNum0to5()];
    const guessedRoom = roomDeck[randomNum0to8()];
    player2GuessName.innerHTML = guessedName;
    player2GuessWeapon.innerHTML = guessedWeapon;
    player2GuessRoom.innerHTML = guessedRoom;
    setTimeout(() => { player2GuessBox?.classList.remove('hidden'); commentatorText.innerHTML = 'The Elephant is making a guess'; }, 1000 * 6);
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
    }, 1000 * 6);

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
    }, 1000 * 6);
    setTimeout(() => {
      player2GuessBox?.classList.add('hidden');
      defaultPl1Hand();
      defaultYouHand();
      enableDice();
      defaultDice();
      commentatorText.innerHTML = 'Guess you were too scared to accuse... Coward';
    }, 1000 * 10);
  } else {
    player2Actions();
  }
};

// TODO: add CORRECT timer AND  animation
submitGuessBtn?.addEventListener('click', () => {
  bgBlock?.classList.add('hidden');

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
  defaultPl1Hand();
  defaultPl2Hand();
  defaultYouHand();
  defaultDice();
  setTimeout(player1Actions, 1000 * 3);
  setTimeout(player2Actions, 1000 * 12);
});

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------Game over win--------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------highscore btn--------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

const highscoreBtns = document.querySelectorAll('.highscore-btn');
const highscore = document.querySelector('.highscore');

highscoreBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    highscore?.classList.remove('hidden');
    gameOverLoseBox?.classList.add('hidden');
    gameOverWinBox?.classList.add('hidden');
  });
});

const winnersTable = document.querySelector('.winners');

// An array of objects that store the highscores
let highscores = [
  { name: 'Peter Pan', score: 2, time: '03:10' },
  { name: 'Wednesday', score: 37, time: '27:39' },
  { name: 'Mr. Bean', score: 74, time: '93:23' },
];

// Function to update the highscore board
function updateHighscoreBoard() {
  winnersTable.innerHTML = ''; // Clear the current highscore board

  // Add the updated highscores to the table
  for (let i = 0; i < highscores.length; i++) {
    const highscore = highscores[i];
    winnersTable.innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${highscore.name}</td>
        <td>${highscore.score}</td>
        <td>${highscore.time} min</td>
      </tr>
    `;
  }
}

// Example code to add a new highscore
function addHighscore(name, score, time) {
  highscores.push({ name, score, time });
  highscores.sort((a, b) => a.score - b.score); // Sort the highscores by score in descending order
  highscores = highscores.slice(0, 3); // Keep only the top 3 highscores
  updateHighscoreBoard();
}

// Initialize the highscore board
updateHighscoreBoard();

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------Play aghain----------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

const playAgainBtn = document.querySelectorAll('.restart-game-btn');

playAgainBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.target.parentElement.classList.add('hidden');
    console.log(e.target.parentElement);
    count = 0;
    introBox?.classList.remove('hidden');
  });
});

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------Commentator----------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

const commentatorText = document.querySelector('.commentator-text');
