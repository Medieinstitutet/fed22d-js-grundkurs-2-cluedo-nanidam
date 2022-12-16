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
const accuseMade = { name: false, weapon: false, room: false };

const introBox = document.querySelector('.intro-text');
const playerInput = document.querySelector('#input-name');
const playerName = document.querySelector('.player-name');
const errorMsgName = document.querySelector('.error-name');
const startGameBtn: HTMLButtonElement | null = document.querySelector('.start-btn');
const bgBlock = document.querySelector('.bg-block');
const allRooms: NodeListOf<Element> = document.querySelectorAll('.room-btn');
const playAgainBtn = document.querySelectorAll('.restart-game-btn');
const gameOverLoseBox = document.querySelector('.game-over-lose');
const gameOverWinBox = document.querySelector('.game-over-win');

// player you
const playerYou:HTMLElement = createPlayerPieces('player-piece', 'public/animal-ape-apes-svgrepo-com.svg', 'An orange ape representing your board piece');
const guessNameBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.guess-name-btn');
const guessWeaponBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.guess-weapon-btn');
const guessRoomBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.guess-room-btn');
const guessBox = document.querySelector('.guess-box');

const accuseNameBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.accuse-name-btn');
const accuseWeaponBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.accuse-weapon-btn');
const accuseRoomBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.accuse-room-btn');
const accuseBox = document.querySelector('.accuse-box');

// player 1
const player1 = createPlayerPieces('player1-piece', 'public/animal-cachorro-dog-svgrepo-com.svg', 'A brown dog representing player 2 board piece');
const playerOneCards: NodeListOf<Element> = document.querySelectorAll('.player1-card');
const player1GuessBox = document.querySelector('.player1-guess');
const player1GuessName = document.querySelector('.pl1-guess-name');
const player1GuessWeapon = document.querySelector('.pl1-guess-weapon');
const player1GuessRoom = document.querySelector('.pl1-guess-room');

// player 2
const player2 = createPlayerPieces('player2-piece', 'public/animal-elefante-elephant-svgrepo-com.svg', 'A grey elephant representing player 2 board piece');
const playerTwoCards: NodeListOf<Element> = document.querySelectorAll('.player2-card');
const player2GuessBox = document.querySelector('.player2-guess');
const player2GuessName = document.querySelector('.pl2-guess-name');
const player2GuessWeapon = document.querySelector('.pl2-guess-weapon');
const player2GuessRoom = document.querySelector('.pl2-guess-room');

// dice
const dice = document.getElementsByClassName('dice')[0];

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
const accuseDeck:string[][] = [];

// draw a card from each categories and put it accuse deck
accuseDeck.push(drawCharAccuse);
accuseDeck.push(drawWeaponAccuse);
accuseDeck.push(drawRoomAccuse);

// players hands
const playerOneHand: string[] = [];
const playerTwoHand: string[] = [];
const playerYouHand: string[] = [];

const mergeWeapon: string[] = charDeck.concat(weaponDeck);
const mergedDeck: string[] = mergeWeapon.concat(roomDeck);

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

if (startGameBtn !== null) {
  startGameBtn.addEventListener('click', () => {
    defaultDice();
    enableDice();

    accuseNameBtns.forEach((name: HTMLButtonElement) => {
      name.style.backgroundColor = 'grey';
    });
    accuseWeaponBtns.forEach((weapon: HTMLButtonElement) => {
      weapon.style.backgroundColor = 'grey';
    }); accuseRoomBtns.forEach((room: HTMLButtonElement) => {
      room.style.backgroundColor = 'grey';
    });

    if (playerName !== null && playerInput !== null) {
      playerName.innerHTML = playerInput.value;
      validatePlayerInput();
      resetTimer();
      setTimer = setInterval(timer, 1000);
      if (commentatorText !== null) {
        commentatorText.innerHTML = 'Roll the dice!';
      }
    }
  });
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
  allRooms.forEach((button) => {
    button.disabled = true;
  });
};
const enableRoomBtns = ():void => {
  allRooms.forEach((button) => {
    button.disabled = false;
  });
};

// move player you to different rooms
const movePlayer = (e?: Event) => {
  if (!e?.currentTarget.contains(playerYou)) {
    e?.currentTarget.appendChild(playerYou);
    disableRoomBtns();
    enableGuessAccuseBtns();
    if (commentatorText !== null) {
      commentatorText.innerHTML = 'Cowards guess. Idiot accuse. Which one are you?';
    }
  } else if (commentatorText !== null) {
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

// when dice is clicked on -> add +1 on count
let count: number;
count = 0;

const updateCount = ():void => {
  count += 1;
};

const rollDice = (e: Event) => {
  const diceText = e.target;
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
    diceText.innerHTML = diceNr;
  }
};

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------guess & accuse btns--------------------
// ------------------------------------------------------------
// ------------------------------------------------------------

const guess = () => {
  guessBox?.classList.remove('hidden');
  bgBlock?.classList.remove('hidden');
};

const guessMade = { name: false, weapon: false, room: false };
const checkGuessMade = () => {
  if (guessMade.name === true && guessMade.weapon === true && guessMade.room === true) {
    if (submitGuessBtn !== null) {
      submitGuessBtn.disabled = false;
    }
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
  if (commentatorText !== null) {
    commentatorText.innerHTML = 'Are you sure you know the answer? There is no turning back now...';
  }
});

const checkAccuseMade = () => {
  if (accuseMade.name === true && accuseMade.weapon === true && accuseMade.room === true) {
    if (submitAccuseBtn !== null) {
      submitAccuseBtn.disabled = false;
    }
  }
};
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

const markPlayersAccuseWeapon = (e: MouseEvent) => {
  const markedWeapon = e.target;
  const defaultOptions = (btn2: HTMLButtonElement) => {
    if (btn2 !== markedWeapon) {
      btn2.style.backgroundColor = 'grey';
    }
  };
  markedWeapon.style.backgroundColor = 'red';
  accuseMade.weapon = true;
  checkAccuseMade();
  // Loop through the buttons again and set the background color to grey
  // for all buttons that are not the clicked button
  accuseWeaponBtns.forEach(defaultOptions);
};

const playersAccuseWeapon = (btn: HTMLButtonElement) => {
  btn.addEventListener('click', markPlayersAccuseWeapon);
};

accuseWeaponBtns.forEach(playersAccuseWeapon);

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

submitAccuseBtn?.addEventListener('click', () => {
  clearInterval(setTimer);

  const accusedName = String(document.querySelectorAll('.accuse-name-btn[style*="background-color: red"]')[0].innerHTML);
  const accusedWeapon = String(document.querySelectorAll('.accuse-weapon-btn[style*="background-color: red"]')[0].innerHTML);
  const accusedRoom = String(document.querySelectorAll('.accuse-room-btn[style*="background-color: red"]')[0].innerHTML);

  if (accusedName === accuseDeck[0][0] && accusedWeapon === accuseDeck[1][0] && accusedRoom === accuseDeck[2][0]) {
    accuseBox?.classList.add('hidden');
    gameOverWinBox?.classList.remove('hidden');
    sumDraws.innerHTML = String(count);
    clearInterval(setTimer);
    sumTime.innerHTML = currentTimer.innerHTML;
    addHighscore(playerInput.value, count, sumTime?.innerHTML);
    commentatorText.innerHTML = 'You are the next Sherlock Holmes.';
  } else if (rightName !== null && rightWeapon !== null && rightRoom !== null && gameOverLoseBox !== null && commentatorText !== null) {
    const [[name], [weapon], [room]] = accuseDeck;
    // change to the correct answers. shown in lost-box
    rightName.innerHTML = name;
    rightWeapon.innerHTML = weapon;
    rightRoom.innerHTML = room;
    accuseBox?.classList.add('hidden');
    gameOverLoseBox.classList.remove('hidden');
    commentatorText.innerHTML = 'You thought you were clever, huh?';
  }
});

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
  defaultPl1Hand();
  defaultPl2Hand();
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
    setTimeout(() => {
      player1GuessBox?.classList.remove('hidden');
      commentatorText.innerHTML = 'The Dog is making a guess';
    }, 1000 * 6);

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
        playerOneCards[indexOfNameMatchPl1].style.backgroundColor = 'green';
      }
      if (indexOfWeaponMatchPl1 > -1) {
        playerOneCards[indexOfWeaponMatchPl1].style.backgroundColor = 'green';
      }
      if (indexOfRoomMatchPl1 > -1) {
        playerOneCards[indexOfRoomMatchPl1].style.backgroundColor = 'green';
      }
    }, 1000 * 6);

    setTimeout(() => {
      if (indexOfNameMatchPlU > -1) {
        playerYouCards[indexOfNameMatchPlU].style.backgroundColor = 'green';
      }
      if (indexOfWeaponMatchPlU > -1) {
        playerYouCards[indexOfWeaponMatchPlU].style.backgroundColor = 'green';
      }
      if (indexOfRoomMatchPlU > -1) {
        playerYouCards[indexOfRoomMatchPlU].style.backgroundColor = 'green';
      }
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

// TODO: add CORRECT timer AND  animation
submitGuessBtn?.addEventListener('click', () => {
  bgBlock?.classList.add('hidden');

  const guessedName = document.querySelectorAll('.guess-name-btn[style*="background-color: red"]')[0].innerHTML;
  const guessedWeapon = document.querySelectorAll('.guess-weapon-btn[style*="background-color: red"]')[0].innerHTML;
  const guessedRoom = document.querySelectorAll('.guess-room-btn[style*="background-color: red"]')[0].innerHTML;

  playerOneHand.forEach((card: string, i: number) => {
    if (card === guessedName || card === guessedWeapon || card === guessedRoom) {
      console.log(card);
      console.log(guessedName);

      playerOneCards[i].innerHTML = playerOneHand[i];
      playerOneCards[i].style.backgroundColor = 'orange';
    }
  });
  playerTwoHand.forEach((card: string, i: number) => {
    if (card === guessedName || card === guessedWeapon || card === guessedRoom) {
      playerTwoCards[i].innerHTML = playerTwoHand[i];
      playerTwoCards[i].style.backgroundColor = 'orange';
    }
  });
  guessNameBtns.forEach((name: HTMLButtonElement) => {
    name.style.backgroundColor = 'grey';
  });

  guessWeaponBtns.forEach((weapon: HTMLButtonElement) => {
    weapon.style.backgroundColor = 'grey';
  });

  guessRoomBtns.forEach((room: HTMLButtonElement) => {
    room.style.backgroundColor = 'grey';
  });

  disableGuessAccuseBtns();
  guessBox?.classList.add('hidden');
  // defaultPl1Hand();
  // defaultPl2Hand();
  defaultYouHand();
  defaultDice();
  setTimeout(player1Actions, 1000 * 3);
  setTimeout(player2Actions, 1000 * 12);
});

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

// Function to update the highscore board
function updateHighscoreBoard() {
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
}

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

// ------------------------------------------------------------
// ------------------------------------------------------------
// ---------------------Play aghain----------------------------
// ------------------------------------------------------------
// ------------------------------------------------------------
const restartGame = (e:Event) => {
  if (e.target !== null) {
    e.target.parentElement.classList.add('hidden');
    count = 0;
    introBox?.classList.remove('hidden');
  }
};

// const clickRestartGame = (btn:HTMLButtonElement):void => {
//   btn.addEventListener('click', restartGame);
// };

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
