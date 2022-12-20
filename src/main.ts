import './style/style.scss';

// import {
//   createDropdownSection, appendToMain, main,
// } from './render';
// import {} from './help-funcs';

// import {
//   appendDropdownToMain,
// } from './render';

function createPlayerPieces(className: string, source: string, altText: string): HTMLElement {
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
const charDeck: string[] = [
  'Miss Scarlett', 'Mr. Green', 'Colonel Mustard', 'Professor Plum', 'Mrs. Peacock', 'Mrs. White',
];

const weaponDeck: string[] = [
  'Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench',
];

const roomDeck: string[] = [
  'Kitchen', 'Ballroom', 'Conservatory', 'Dining Room', 'Billiard Room', 'Library', 'Lounge', 'Hall', 'Study',
];

// get random nr 0-5
const randomNum0to5 = ():number => Math.floor(Math.random() * charDeck.length);
const randomNum0to8 = ():number => Math.floor(Math.random() * roomDeck.length);

// guess accuse btn
const guessBtn: HTMLButtonElement | null = document.querySelector('.guess-btn');
const submitGuessBtn: HTMLButtonElement | null = document.querySelector('.submit-guess-btn');
const accuseBtn: HTMLButtonElement | null = document.querySelector('.accuse-btn');
const submitAccuseBtn: HTMLButtonElement | null = document.querySelector('.submit-accuse-btn');
const guessMade = { name: false, weapon: false, room: false };
const accuseMade = { name: false, weapon: false, room: false };

const introBox = document.querySelector('.intro-text');
const playerInput = document.querySelector<HTMLInputElement>('#input-name');

const playerName = document.querySelector('.player-name');
const errorMsgName = document.querySelector('.error-name');
const startGameBtn: HTMLButtonElement | null = document.querySelector('.start-btn');
const bgBlock = document.querySelector('.bg-block');
const allRooms: NodeListOf<HTMLButtonElement> | null = document.querySelectorAll('.room-btn');
const playAgainBtn = document.querySelectorAll('.restart-game-btn');
const gameOverLoseBox = document.querySelector('.game-over-lose');
const gameOverWinBox: Element | null = document.querySelector('.game-over-win');

// player you
const playerYou:HTMLElement = createPlayerPieces('player-piece', 'public/animal-ape-apes-svgrepo-com.svg', 'An orange ape representing your board piece');
const playerYouCards:NodeListOf<Element> | HTMLCollectionOf<HTMLElement> = document.querySelectorAll('.your-card');
const guessNameBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.guess-name-btn'));
const guessWeaponBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.guess-weapon-btn'));
const guessRoomBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.guess-room-btn'));
const guessBox: HTMLElement | null = document.querySelector('.guess-box');

const accuseNameBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.accuse-name-btn'));
const accuseWeaponBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.accuse-weapon-btn'));
const accuseRoomBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.accuse-room-btn'));
const accuseBox: HTMLElement | null = document.querySelector('.accuse-box');

// player 1
const player1 = createPlayerPieces('player1-piece', 'public/animal-cachorro-dog-svgrepo-com.svg', 'A brown dog representing player 2 board piece');
const playerOneCards: NodeListOf<Element> = document.querySelectorAll('.player1-card');
const player1GuessBox = document.querySelector('.player1-guess');
const player1GuessName = document.querySelector('.pl1-guess-name');
const player1GuessWeapon = document.querySelector('.pl1-guess-weapon');
const player1GuessRoom = document.querySelector('.pl1-guess-room');

// player 2
const player2 = createPlayerPieces('player2-piece', 'public/animal-elefante-elephant-svgrepo-com.svg', 'A grey elephant representing player 2 board piece');
const playerTwoCards: HTMLCollectionOf<Element> = document.querySelectorAll('.player2-card');
const player2GuessBox = document.querySelector('.player2-guess');
const player2GuessName: Element | null = document.querySelector('.pl2-guess-name');
const player2GuessWeapon = document.querySelector('.pl2-guess-weapon');
const player2GuessRoom = document.querySelector('.pl2-guess-room');

// dice
const dice = document.getElementsByClassName('dice')[0] as HTMLButtonElement;

// counter
let minutes: number;
let seconds: number;
minutes = 0;
seconds = 0;

// timer
const currentTimer: Element | null = document.querySelector('.current-timer');

// comentator
const commentatorText: Element | null = document.querySelector('.commentator-text');

// highscore
const highscoreBtns = document.querySelectorAll('.highscore-btn');
const highscoreBox = document.querySelector('.highscore');
const winnersTable: Element | null = document.querySelector('.winners');
type Highscore = { name: string, score: number, time: string };

let highscores: Highscore[] = [
  { name: 'Peter Pan', score: 2, time: '03:10' },
  { name: 'Wednesday', score: 37, time: '27:39' },
  { name: 'Mr. Bean', score: 74, time: '93:23' },
];

// game over
const rightName = document.querySelector('.right-answer-name');
const rightWeapon = document.querySelector('.right-answer-weapon');
const rightRoom = document.querySelector('.right-answer-room');
const sumDraws = document.querySelector('.game-over-draws');
const sumTime = document.querySelector('.game-over-time');

// draw 1 card from each deck and put then in "accuseDeck"
const drawCharAccuse: string[] = [...charDeck].splice(randomNum0to5(), 1);
const drawWeaponAccuse: string[] = [...weaponDeck].splice(randomNum0to5(), 1);
const drawRoomAccuse: string[] = [...roomDeck].splice(randomNum0to8(), 1);
const accuseDeck:string[][] = [drawCharAccuse, drawWeaponAccuse, drawRoomAccuse];

// draw a card from each categories and put it accuse deck
accuseDeck.push(drawCharAccuse);
accuseDeck.push(drawWeaponAccuse);
accuseDeck.push(drawRoomAccuse);

// players hands
const playerOneHand: string[] = [];
const playerTwoHand: string[] = [];
const playerYouHand: string[] = [];

const mergedDeck: string[] = charDeck.concat(weaponDeck, roomDeck);
// const mergeWeapon: string[] = charDeck.concat(weaponDeck);
// const mergedDeck: string[] = mergeWeapon.concat(roomDeck);

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

while (playerYouHand.length < 3 && shuffledCard.length) {
  playerOneHand.push(shuffledCard.shift() as string);
  playerTwoHand.push(shuffledCard.shift() as string);
  playerYouHand.push(shuffledCard.shift() as string);
}

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------timer/counter--------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

const timer = () => {
  seconds += 1;

  // If the number of seconds has reached 60,
  // increment the number of minutes and reset
  // the number of seconds to 0
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }

  // Display the current time
  if (currentTimer !== null) {
    currentTimer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
};

const resetTimer = () => {
  minutes = 0;
  seconds = 0;

  if (currentTimer !== null) {
    currentTimer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
};

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------when game starts:----------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
let setTimer: number;

const movePlayer1 = () => {
  allRooms[randomNum0to8()].appendChild(player1);
  if (commentatorText !== null) {
    commentatorText.innerHTML = 'The dog is on the loose!';
  }
};

const movePlayer2 = () => {
  allRooms[randomNum0to8()].appendChild(player2);
  if (commentatorText !== null) {
    commentatorText.innerHTML = 'The Elephant is sprinting!';
  }
};

const disableDice = ():void => {
  dice.disabled = true;
};
const enableDice = ():void => {
  dice.disabled = false;
};

const defaultDice = (): void => {
  dice.innerHTML = 'Dice';
};

// validate player-input field.
// If inputfield is left empty ->
// show error msg until something is entered in inputfield
// close box when inputfield is valid
const validatePlayerInput = (): void => {
  if (playerInput !== null) {
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
  }
};

const startGame = () => {
  defaultDice();
  enableDice();

  // sets the background color of the button to grey
  const setButtonColor = (btn: HTMLButtonElement) => {
    btn.classList.remove('marked-option');
  };

  // Set the background color of all the buttons in the  array to grey
  accuseNameBtns.forEach(setButtonColor);
  accuseWeaponBtns.forEach(setButtonColor);
  accuseRoomBtns.forEach(setButtonColor);

  if (playerName !== null && playerInput !== null) {
    playerName.innerHTML = playerInput.value;
    validatePlayerInput();
    resetTimer();
    // Start a new timer
    setTimer = setInterval(timer, 1000);

    if (commentatorText !== null) {
      commentatorText.innerHTML = 'Roll the dice!';
    }
  }
};

if (startGameBtn !== null) {
  startGameBtn.addEventListener('click', startGame);
}

const enableGuessAccuseBtns = () => {
  if (guessBtn !== null) {
    guessBtn.disabled = false;
  }
  if (accuseBtn !== null) {
    accuseBtn.disabled = false;
  }
};

const disableGuessAccuseBtns = () => {
  if (guessBtn !== null) {
    guessBtn.disabled = true;
  }
  if (accuseBtn !== null) {
    accuseBtn.disabled = true;
  }
};
const disableRoomBtns = ():void => {
  allRooms.forEach((button: HTMLButtonElement) => {
    button.setAttribute('disabled', 'true');
  });
};
const enableRoomBtns = ():void => {
  allRooms.forEach((button: HTMLButtonElement) => {
    button.removeAttribute('disabled');
  });
};

// move player you to different rooms
const movePlayer = (e: Event) => {
  const target: EventTarget | null = e.currentTarget;
  if (target !== null && commentatorText !== null && target instanceof HTMLElement) {
    if (!target.contains(playerYou)) {
      target.appendChild(playerYou);
      disableRoomBtns();
      enableGuessAccuseBtns();
      commentatorText.innerHTML = 'Cowards guess. Idiots accuse. Which one are you?';
    }
  } else if (commentatorText !== null) {
    commentatorText.innerHTML = "Can't choose the same room! Choose another room.";
  }
};

// for (const btn of allRooms) {
//   btn.addEventListener('click', movePlayer);
// }
allRooms.forEach((btn: HTMLButtonElement) => {
  btn.addEventListener('click', movePlayer);
});

playerYouCards.forEach((card: Element, i) => {
  const tempCard = card;
  tempCard.innerHTML = playerYouHand[i];
});

// when dice is clicked on -> add +1 on count
let count: number;
count = 0;

const updateCount = ():void => {
  count += 1;
};

const rollDice = (e: Event) => {
  const diceText = e.target as HTMLElement;
  const diceNr = randomNum0to5() + 1;

  if (diceNr > 3) {
    enableRoomBtns();
    disableDice();
    if (commentatorText !== null) {
      commentatorText.innerHTML = 'Move to a room.';
    }
  } else {
    disableRoomBtns();
    if (commentatorText !== null) {
      commentatorText.innerHTML = 'Roll the dice again.';
    }
  }

  updateCount();
  if (diceText !== null) {
    diceText.innerHTML = String(diceNr);
  }
};

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------guess & accuse btns--------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

accuseBtn?.addEventListener('click', () => {
  bgBlock?.classList.remove('hidden');
  accuseBox?.classList.remove('hidden');
});

const guess = () => {
  guessBox?.classList.remove('hidden');
  bgBlock?.classList.remove('hidden');
};

const checkGuessMade = () => {
  if (guessMade.name === true && guessMade.weapon === true && guessMade.room === true) {
    if (submitGuessBtn !== null) {
      submitGuessBtn.disabled = false;
    }
  }
};

const checkAccuseMade = () => {
  if (accuseMade.name === true && accuseMade.weapon === true && accuseMade.room === true) {
    if (submitAccuseBtn !== null) {
      submitAccuseBtn.disabled = false;
    }
  }
};

// mark one answer with backgroundcolor red in each categories
const handleClick = (btns: HTMLButtonElement[], property: 'name' | 'weapon' | 'room', checkFn: () => void) => {
  const handleButtonClick = (e: MouseEvent) => {
    const button = e.target as HTMLButtonElement;
    button.classList.add('marked-option');
    guessMade[property] = true;
    accuseMade[property] = true;
    checkFn();
    btns.forEach((btn2) => {
      if (btn2 !== button) {
        btn2.classList.remove('marked-option');
      }
    });
  };

  btns.forEach((btn) => {
    btn.addEventListener('click', handleButtonClick);
  });
};

handleClick(guessNameBtns, 'name', checkGuessMade);
handleClick(guessWeaponBtns, 'weapon', checkGuessMade);
handleClick(guessRoomBtns, 'room', checkGuessMade);
handleClick(accuseNameBtns, 'name', checkAccuseMade);
handleClick(accuseWeaponBtns, 'weapon', checkAccuseMade);
handleClick(accuseRoomBtns, 'room', checkAccuseMade);

// Function to update the highscore board
const updateHighscoreBoard = () => {
  if (winnersTable !== null) {
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
};

// add a new highscore
const addHighscore = (name: string, score: number, time: string): void => {
  const highscore: { name: string, score: number, time: string } = { name, score, time };
  highscores.push(highscore);
  highscores.sort((a: { score: number }, b: { score: number }) => a.score - b.score); // Sort the highscores by score in descending order
  highscores = highscores.slice(0, 3); // Keep only the top 3 highscores
  updateHighscoreBoard();
};

// Initialize the highscore board
updateHighscoreBoard();

const handlingSubmitAccuse = () => {
  // Stop the timer
  clearInterval(setTimer);

  // Get players accusations: name, weapon, and room
  const accusedName = String(document.querySelector('.accuse-name-btn[style*="background-color: red"]')?.innerHTML);
  const accusedWeapon = String(document.querySelector('.accuse-weapon-btn[style*="background-color: red"]')?.innerHTML);
  const accusedRoom = String(document.querySelector('.accuse-room-btn[style*="background-color: red"]')?.innerHTML);
  const accusedNameMatch = accusedName === accuseDeck[0][0];
  const accusedWeaponMatch = accusedWeapon === accuseDeck[1][0];
  const accusedRoomMatch = accusedRoom === accuseDeck[2][0];
  const checkAllAccuse = accusedNameMatch && accusedWeaponMatch && accusedRoomMatch;

  const checkGameOverWinBox = gameOverWinBox !== null;
  const checkSumDraws = sumDraws !== null;
  const checkSumtime = sumTime !== null;
  const checkCommentatorText = commentatorText !== null;
  const checkCurrentTimer = currentTimer !== null;
  const checkPlayerInput = playerInput !== null;
  const checkNull = checkGameOverWinBox && checkSumDraws && checkSumtime && checkCommentatorText && checkCurrentTimer && checkPlayerInput;

  // If the user's accusation is correct, show the win screen and add the score to the high scores
  if (checkAllAccuse && checkNull) {
    accuseBox?.classList.add('hidden');
    gameOverWinBox.classList.remove('hidden');
    sumDraws.innerHTML = String(count);
    clearInterval(setTimer);
    sumTime.innerHTML = currentTimer.innerHTML;
    addHighscore(playerInput.value, count, sumTime.innerHTML);
    commentatorText.innerHTML = 'You are the next Sherlock Holmes.';
    // If the user's accusation is incorrect, show the lose screen and reveal the correct answers
  } else if (rightName !== null && rightWeapon !== null && rightRoom !== null && gameOverLoseBox !== null && commentatorText !== null) {
    const [[name], [weapon], [room]] = accuseDeck;
    rightName.innerHTML = name;
    rightWeapon.innerHTML = weapon;
    rightRoom.innerHTML = room;
    accuseBox?.classList.add('hidden');
    gameOverLoseBox.classList.remove('hidden');
    commentatorText.innerHTML = 'You thought you were clever, huh?';
  }
};

submitAccuseBtn?.addEventListener('click', handlingSubmitAccuse);

const defaultPl1Hand = () => {
  for (let i = 0; i < playerOneHand.length; i++) {
    playerOneCards[i].innerHTML = `Card ${i + 1}`;
    playerOneCards[i].classList.remove('guess-match', 'player1-match', 'player2-match');

    // playerOneCards[i].style.backgroundColor = 'grey';
  }
};

const defaultPl2Hand = () => {
  for (let i = 0; i < playerTwoHand.length; i++) {
    playerTwoCards[i].innerHTML = `Card ${i + 1}`;
    playerTwoCards[i].classList.remove('guess-match', 'player1-match', 'player2-match');

    // playerTwoCards[i].style.backgroundColor = 'grey';
  }
};

const defaultYouHand = () => {
  for (let i = 0; i < playerYouHand.length; i++) {
    playerYouCards[i].classList.remove('guess-match', 'player1-match', 'player2-match');
    // playerYouCards[i].style.backgroundColor = 'orange';
  }
};

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------auto bot 1 & 2 ------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

// player 1 action after you make a guess
const player1Actions = () => {
  defaultPl1Hand();
  defaultPl2Hand();
  const diceNr:number = randomNum0to5() + 1;
  dice.innerHTML = String(diceNr);
  if (diceNr > 3 && player1GuessName !== null && player1GuessWeapon !== null && player1GuessRoom !== null && player1GuessBox !== null && commentatorText !== null) {
    movePlayer1();
    const guessedName:string = charDeck[randomNum0to5()];
    const guessedWeapon:string = weaponDeck[randomNum0to5()];
    const guessedRoom:string = roomDeck[randomNum0to8()];

    player1GuessName.innerHTML = guessedName;
    player1GuessWeapon.innerHTML = guessedWeapon;
    player1GuessRoom.innerHTML = guessedRoom;

    setTimeout(() => {
      player1GuessBox.classList.remove('hidden');
      commentatorText.innerHTML = 'The Dog is making a guess';
    }, 1000 * 6);

    const setBlue = (hand: string[], cards: HTMLCollectionOf<HTMLElement>, tempGuess: string) => {
      const index: number = hand.indexOf(tempGuess);
      if (index > -1) {
        const tempCards = cards;
        tempCards[index].classList.add('player1-match');
      }
    };

    setTimeout(() => {
      setBlue(playerTwoHand, playerTwoCards, guessedName);
      setBlue(playerTwoHand, playerTwoCards, guessedWeapon);
      setBlue(playerTwoHand, playerTwoCards, guessedRoom);
    }, 1000 * 6);

    setTimeout(() => {
      setBlue(playerYouHand, playerYouCards, guessedName);
      setBlue(playerYouHand, playerYouCards, guessedWeapon);
      setBlue(playerYouHand, playerYouCards, guessedRoom);
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
  const diceNr:number = randomNum0to5() + 1;
  dice.innerHTML = String(diceNr);
  if (diceNr > 3 && player2GuessName !== null && player2GuessWeapon !== null && player2GuessRoom !== null && commentatorText !== null) {
    movePlayer2();
    const guessedName: string = charDeck[randomNum0to5()];
    const guessedWeapon: string = weaponDeck[randomNum0to5()];
    const guessedRoom: string = roomDeck[randomNum0to8()];

    player2GuessName.innerHTML = guessedName;
    player2GuessWeapon.innerHTML = guessedWeapon;
    player2GuessRoom.innerHTML = guessedRoom;

    setTimeout(() => {
      player2GuessBox?.classList.remove('hidden');
      commentatorText.innerHTML = 'The Elephant is making a guess';
    }, 1000 * 6);

    const setGreen = (hand: HTMLCollectionOf<HTMLElement>, index: number) => {
      if (index > -1) {
        const tempHand = hand;
        tempHand[index].classList.add('player2-match');

        // tempHand[index].style.backgroundColor = 'green';
      }
    };

    setTimeout(() => {
      setGreen(playerOneCards, playerOneHand.indexOf(guessedName));
      setGreen(playerOneCards, playerOneHand.indexOf(guessedWeapon));
      setGreen(playerOneCards, playerOneHand.indexOf(guessedRoom));
    }, 1000 * 6);

    setTimeout(() => {
      setGreen(playerYouCards, playerYouHand.indexOf(guessedName));
      setGreen(playerYouCards, playerYouHand.indexOf(guessedWeapon));
      setGreen(playerYouCards, playerYouHand.indexOf(guessedRoom));
    }, 1000 * 6);

    setTimeout(() => {
      player2GuessBox?.classList.add('hidden');
      defaultPl1Hand();
      defaultYouHand();
      enableDice();
      defaultDice();
      if (commentatorText !== null) {
        commentatorText.innerHTML = 'Guess you were too scared to accuse... Coward! Now, roll the dice.';
      }
    }, 1000 * 10);
  } else {
    player2Actions();
  }
};

const handlingSubmitGuess = () => {
  bgBlock?.classList.add('hidden');

  const guessedName:string = document.querySelectorAll('.guess-name-btn.marked-option')[0].innerHTML;
  const guessedWeapon:string = document.querySelectorAll('.guess-weapon-btn.marked-option')[0].innerHTML;
  const guessedRoom:string = document.querySelectorAll('.guess-room-btn.marked-option')[0].innerHTML;

  playerOneHand.forEach((card: string, i: number) => {
    if (card === guessedName || card === guessedWeapon || card === guessedRoom) {
      playerOneCards[i].innerHTML = playerOneHand[i];
      playerOneCards[i].classList.add('guess-match');

      // playerOneCards[i].style.backgroundColor = 'orange';
    }
  });
  playerTwoHand.forEach((card: string, i: number) => {
    if (card === guessedName || card === guessedWeapon || card === guessedRoom) {
      playerTwoCards[i].innerHTML = playerTwoHand[i];
      playerTwoCards[i].classList.add('guess-match');
    }
  });
  guessNameBtns.forEach((name: HTMLButtonElement) => {
    name.classList.remove('marked-option');
    // name.style.backgroundColor = 'grey';
  });

  guessWeaponBtns.forEach((weapon: HTMLButtonElement) => {
    weapon.classList.remove('marked-option');
  });

  guessRoomBtns.forEach((room: HTMLButtonElement) => {
    room.classList.remove('marked-option');
  });

  disableGuessAccuseBtns();
  guessBox?.classList.add('hidden');
  defaultYouHand();
  defaultDice();
  setTimeout(player1Actions, 1000 * 3);
  setTimeout(player2Actions, 1000 * 12);
};

submitGuessBtn?.addEventListener('click', handlingSubmitGuess);

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------highscore btn--------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

const showHighscore = () => {
  highscoreBox?.classList.remove('hidden');
  gameOverLoseBox?.classList.add('hidden');
  gameOverWinBox?.classList.add('hidden');
};

highscoreBtns.forEach((btn) => {
  btn.addEventListener('click', showHighscore);
});

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------Play aghain----------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
const restartGame = (e: Event) => {
  const target = e.target as HTMLElement;

  if (target !== null && target.parentElement !== null) {
    target.parentElement.classList.add('hidden');
    count = 0;
    introBox?.classList.remove('hidden');
  }
};

playAgainBtn.forEach((btn) => {
  btn.addEventListener('click', restartGame);
});

// flip function
const cardElement = document.querySelector('.player-card');

function flipCard(card: HTMLElement) {
  card.classList.toggle('flip');
}

dice.addEventListener('click', rollDice);

if (guessBtn !== null) {
  guessBtn.addEventListener('click', guess);
}

// // Blanda kortleken
// const myShuffledCardDeck = shuffle(exampleCardDeck);

// /**
//  * Vänder upp/ner på det klickade kortet genom att toggla en CSS-klass.
//  * @param this - Det HTML-element som har klickats på
//  * @return {void}
//  */
// function flipCard(this: HTMLElement): void {
//   if (this !== undefined) {
//     this.classList.toggle('visible');
//   }
// }

// Printa kortleken
// let cardString = '';
// myShuffledCardDeck.forEach((card) => {
//   cardString += `
//     <button class="card">
//       <span class="front">♠</span>
//       <span class="back">${card}</span>
//     </button>`;
// });

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = cardString;

// document.querySelectorAll('.card').forEach((card) => {
//   card.addEventListener('click', flipCard);
// });

console.table(playerOneHand);
console.log('player1 hand');
console.table(playerTwoHand);
console.log('player2 hand');
console.table(accuseDeck);
console.log('accused deck');
