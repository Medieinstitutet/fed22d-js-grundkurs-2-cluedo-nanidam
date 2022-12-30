import './style/style.scss';
import createGuessAccuseBoxes from './renderHTML';

// must be created first, otherwise guessBtn doesnt work
createGuessAccuseBoxes();

// character deck
const charDeck: string[] = [
  'Miss Scarlett', 'Mr. Green', 'Colonel Mustard', 'Professor Plum', 'Mrs. Peacock', 'Mrs. White',
];
// weapon deck
const weaponDeck: string[] = [
  'Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench',
];
// room deck
const roomDeck: string[] = [
  'Kitchen', 'Ballroom', 'Conservatory', 'Dining Room', 'Billiard Room', 'Library', 'Lounge', 'Hall', 'Study',
];

let setTimer: number;

// get random nr 0-5 and random nr 0-8
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

// needs to come before "const player you"
const createPlayerPieces = (className: string, source: string, altText: string): HTMLElement => {
  // Create a div element with the "player-piece" class
  const div: HTMLDivElement = document.createElement('div');
  div.classList.add(className);

  // Create an img element with the specified src and alt attributes
  const img: HTMLImageElement = document.createElement('img');
  img.src = source;
  img.alt = altText;

  div.appendChild(img);

  return div;
};

// player you
const playerYou:HTMLElement = createPlayerPieces('player-piece', 'animal-ape-apes-svgrepo-com.svg', 'An orange ape representing your board piece');

const playerYouCards:NodeListOf<Element> = document.querySelectorAll('.your-card');
const guessNameBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.guess-name-btn'));
const guessWeaponBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.guess-weapon-btn'));
const guessRoomBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.guess-room-btn'));
const guessBox: HTMLElement | null = document.querySelector('.guess-box');

const accuseNameBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.accuse-name-btn'));
const accuseWeaponBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.accuse-weapon-btn'));
const accuseRoomBtns: HTMLButtonElement[] = Array.from(document.querySelectorAll('.accuse-room-btn'));
const accuseBox: HTMLElement | null = document.querySelector('.accuse-box');

// player 1
const player1 = createPlayerPieces('player1-piece', 'animal-cachorro-dog-svgrepo-com.svg', 'A brown dog representing player 2 board piece');
const playerOneCards: NodeListOf<Element> = document.querySelectorAll('.player1-card');
const player1GuessBox = document.querySelector('.player1-guess');
const player1GuessName = document.querySelector('.pl1-guess-name');
const player1GuessWeapon = document.querySelector('.pl1-guess-weapon');
const player1GuessRoom = document.querySelector('.pl1-guess-room');

// player 2
const player2 = createPlayerPieces('player2-piece', 'animal-elefante-elephant-svgrepo-com.svg', 'A grey elephant representing player 2 board piece');
const playerTwoCards: NodeListOf<Element> = document.querySelectorAll('.player2-card');
const player2GuessBox = document.querySelector('.player2-guess');
const player2GuessName: Element | null = document.querySelector('.pl2-guess-name');
const player2GuessWeapon = document.querySelector('.pl2-guess-weapon');
const player2GuessRoom = document.querySelector('.pl2-guess-room');

// dice
const dice = document.getElementsByClassName('dice')[0] as HTMLButtonElement;

// counter time
let minutes: number;
let seconds: number;
minutes = 0;
seconds = 0;
const currentTimer: Element | null = document.querySelector('.current-timer');

// counter draws
let count: number;
count = 0;

// comentator
const commentatorText: Element | null = document.querySelector('.commentator-text');

// highscore
const highscoreBtns = document.querySelectorAll('.highscore-btn');
const highscoreBox = document.querySelector('.highscore');
const winnersTable: Element | null = document.querySelector('.winners');
type Highscore = { name: string, score: number, time: string };

let highscores: Highscore[] = [
  { name: 'Peter Pan', score: 1, time: '00:07' },
  { name: 'Wednesday', score: 37, time: '27:39' },
  { name: 'Mr. Bean', score: 74, time: '93:23' },
];

// game over
const playAgainBtn = document.querySelectorAll('.restart-game-btn');
const gameOverLoseBox = document.querySelector('.game-over-lose');
const gameOverWinBox: Element | null = document.querySelector('.game-over-win');
const rightName = document.querySelector('.right-answer-name');
const rightWeapon = document.querySelector('.right-answer-weapon');
const rightRoom = document.querySelector('.right-answer-room');
const sumDraws = document.querySelector('.game-over-draws');
const sumTime = document.querySelector('.game-over-time');

// draw 1 card from each deck and put then in "accuseDeck"
let drawCharAccuse: string[] = [...charDeck].splice(randomNum0to5(), 1);
let drawWeaponAccuse: string[] = [...weaponDeck].splice(randomNum0to5(), 1);
let drawRoomAccuse: string[] = [...roomDeck].splice(randomNum0to8(), 1);
let accuseDeck:string[][] = [drawCharAccuse, drawWeaponAccuse, drawRoomAccuse];

// players hands before delt cards
let playerOneHand: string[] = [];
let playerTwoHand: string[] = [];
let playerYouHand: string[] = [];

// merge all card from the three categories
let mergedDeck: string[] = charDeck.concat(weaponDeck, roomDeck);

// fn for shuffle deck
const shuffle = (array: string[]):string[] => {
  const tempArray:string[] = [...array];
  let currentIndex:number = array.length;
  let randomIndex:number;

  // While there remain cards to shuffle.
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [tempArray[currentIndex], tempArray[randomIndex]] = [
      tempArray[randomIndex], tempArray[currentIndex]];
  }

  return tempArray;
};
// has to come after shuffle-fn
let shuffledCard: string[] = shuffle(mergedDeck);

const dealCards = ():void => {
  while (playerYouHand.length < 3 && shuffledCard.length) {
    playerOneHand.push(shuffledCard.shift() as string);
    playerTwoHand.push(shuffledCard.shift() as string);
    playerYouHand.push(shuffledCard.shift() as string);
  }
};

// has to come before setPl1CardTexts
dealCards();

const setCardText = (card: string | HTMLElement | null, text: string): void => {
  const tempCard = card;
  if (tempCard !== null && tempCard instanceof HTMLElement) {
    tempCard.innerHTML = text;
  }
};

const setPl1CardTxts = (): void => {
  const [pl1Card1, pl1Card2, pl1Card3] = playerOneHand;
  setCardText(pl1Card1, playerOneHand[0]);
  setCardText(pl1Card2, playerOneHand[1]);
  setCardText(pl1Card3, playerOneHand[2]);
};

const timer = ():void => {
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

const resetTimer = ():void => {
  minutes = 0;
  seconds = 0;

  if (currentTimer !== null) {
    currentTimer.innerHTML = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
};

// player 1 is placed in a random room
const movePlayer1 = ():void => {
  allRooms[randomNum0to8()].appendChild(player1);
  if (commentatorText !== null) {
    commentatorText.innerHTML = 'The dog is on the loose!';
  }
};

const movePlayer2 = ():void => {
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

const disableGuessAccuseBtns = ():void => {
  if (guessBtn !== null) {
    guessBtn.disabled = true;
  }
  if (accuseBtn !== null) {
    accuseBtn.disabled = true;
  }
};

const startGame = ():void => {
  defaultDice();
  enableDice();
  setPl1CardTxts();
  disableGuessAccuseBtns();

  // remove the marked opt for next turns guesses
  const setButtonColor = (btn: HTMLButtonElement):void => {
    btn.classList.remove('marked-option');
  };

  accuseNameBtns.forEach(setButtonColor);
  accuseWeaponBtns.forEach(setButtonColor);
  accuseRoomBtns.forEach(setButtonColor);

  if (playerName !== null && playerInput !== null) {
    playerName.innerHTML = playerInput.value;
    validatePlayerInput();
    resetTimer();
    setTimer = setInterval(timer, 1000); // Start a new timer

    if (commentatorText !== null) {
      commentatorText.innerHTML = 'Roll the dice!';
    }
  }
};

const enableGuessAccuseBtns = ():void => {
  if (guessBtn !== null) {
    guessBtn.disabled = false;
  }
  if (accuseBtn !== null) {
    accuseBtn.disabled = false;
  }
};

const handlingDisableRooms = (button: HTMLButtonElement):void => {
  button.setAttribute('disabled', 'true');
};

const disableRoomBtns = ():void => {
  allRooms.forEach(handlingDisableRooms);
};

const handlingEnableRooms = (button: HTMLButtonElement):void => {
  button.removeAttribute('disabled');
};

const enableRoomBtns = ():void => {
  allRooms.forEach(handlingEnableRooms);
};

// move player you to different rooms
const movePlayer = (e: Event):void => {
  const target: EventTarget | null = e.currentTarget;
  if (target !== null && commentatorText !== null && target instanceof HTMLElement) {
    if (!target.contains(playerYou)) { // check that player isnt already in the room
      target.appendChild(playerYou);
      disableRoomBtns();
      enableGuessAccuseBtns();
      commentatorText.innerHTML = 'Cowards guess. Idiots accuse. Which one are you?';
    }
  } else if (commentatorText !== null) {
    commentatorText.innerHTML = "Can't choose the same room! Choose another room.";
  }
};

const movePlayerForEach = (btn: HTMLButtonElement): void => {
  btn.addEventListener('click', movePlayer);
};

const addCardToHand = (card: Element, i: number): void => {
  const yourCard = card;
  yourCard.innerHTML = playerYouHand[i];
};

const updateCount = ():void => {
  count += 1;
};

const addDiceRollingClass = (diceText: HTMLElement): void => {
  diceText.classList.add('dice-rolling');
};

const removeDiceRollingClass = (diceText: HTMLElement):void => {
  diceText.classList.remove('dice-rolling');
};

const rollDice = (e: Event):void => {
  const diceText = e.target as HTMLElement;
  const diceNr = randomNum0to5() + 1;
  const resetDice = ():void => { removeDiceRollingClass(diceText); };

  // if dice is 4 or more => enable all room so you can move to one
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

  addDiceRollingClass(diceText);
  setTimeout(resetDice, 500);

  updateCount();
  if (diceText !== null) {
    diceText.innerHTML = String(diceNr);
  }
};

const showAccuseBox = (): void => {
  if (bgBlock !== null && accuseBox !== null) {
    bgBlock.classList.remove('hidden');
    accuseBox.classList.remove('hidden');
  }
};

const guess = ():void => {
  guessBox?.classList.remove('hidden');
  bgBlock?.classList.remove('hidden');
};

const checkGuessMade = ():void => {
  if (guessMade.name === true && guessMade.weapon === true && guessMade.room === true) {
    if (submitGuessBtn !== null) {
      submitGuessBtn.disabled = false;
    }
  }
};

const checkAccuseMade = ():void => {
  if (accuseMade.name === true && accuseMade.weapon === true && accuseMade.room === true) {
    if (submitAccuseBtn !== null) {
      submitAccuseBtn.disabled = false;
    }
  }
};

// mark one answer with a backgroundcolor in each categories
const handleClick = (btns: HTMLButtonElement[], property: 'name' | 'weapon' | 'room', checkFn: () => void):void => {
  const handleButtonClick = (e: MouseEvent):void => {
    const button = e.target as HTMLButtonElement;
    button.classList.add('marked-option');
    guessMade[property] = true;
    accuseMade[property] = true;
    checkFn();

    const removeMarkedOption = (btn2: HTMLElement):void => {
      if (btn2 !== button) {
        btn2.classList.remove('marked-option');
      }
    };

    btns.forEach(removeMarkedOption);
  };

  const handleButtonClickForEach = (btn: HTMLElement):void => {
    btn.addEventListener('click', handleButtonClick);
  };

  btns.forEach(handleButtonClickForEach);
};

// Function to update the highscore board
const updateHighscoreBoard = ():void => {
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

const sortHighscoreFn = (a: { score: number, time:string }, b: { score: number, time:string }):number => {
  // sort by score in descending order
  if (a.score !== b.score) {
    return a.score - b.score;
  }
  // if scores are equal, sort by time in ascending order
  const timeA = Date.parse(a.time);
  const timeB = Date.parse(b.time);
  return (timeA - timeB) / 1000;
};

// add a new highscore
const addHighscore = (name: string, score: number, time: string): void => {
  const highscore: { name: string, score: number, time: string } = { name, score, time };
  highscores.push(highscore);

  highscores.sort(sortHighscoreFn);

  highscores = highscores.slice(0, 3); // Keep only the top 3 highscores
  updateHighscoreBoard();
};

const handlingSubmitAccuse = ():void => {
  // Stop the timer
  clearInterval(setTimer);

  // Get players accusations: name, weapon, and room
  const accusedName = String(document.querySelector('.accuse-name-btn.marked-option')?.innerHTML);
  const accusedWeapon = String(document.querySelector('.accuse-weapon-btn.marked-option')?.innerHTML);
  const accusedRoom = String(document.querySelector('.accuse-room-btn.marked-option')?.innerHTML);
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

  // If the player's accusation is correct, show the win screen and add the score to the high scores
  if (checkAllAccuse && checkNull) {
    accuseBox?.classList.add('hidden');
    gameOverWinBox.classList.remove('hidden');
    sumDraws.innerHTML = String(count);
    clearInterval(setTimer);
    sumTime.innerHTML = currentTimer.innerHTML;
    addHighscore(playerInput.value, count, sumTime.innerHTML);
    commentatorText.innerHTML = 'You are the next Sherlock Holmes.';

    // If the player's accusation is incorrect, show the lose screen and reveal the correct answers
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

// default player1 hand after turn
const defaultPl1Hand = ():void => {
  for (let i = 0; i < playerOneHand.length; i++) {
    playerOneCards[i].innerHTML = 'Cluedo';
    playerOneCards[i].classList.remove('guess-match', 'player1-match', 'player2-match');
  }
};

const defaultPl2Hand = ():void => {
  for (let i = 0; i < playerTwoHand.length; i++) {
    playerTwoCards[i].innerHTML = 'Cluedo';
    playerTwoCards[i].classList.remove('guess-match', 'player1-match', 'player2-match');
  }
};

const defaultYouHand = ():void => {
  for (let i = 0; i < playerYouHand.length; i++) {
    playerYouCards[i].classList.remove('guess-match', 'player1-match', 'player2-match');
  }
};

// fn to add blue border to matching card/cards
const setBlue = (hand: string[], cards: NodeListOf<Element>, tempGuess: string, check?:string):boolean => {
  const index: number = hand.indexOf(tempGuess);
  if (index > -1) {
    if (check === 'check') { return true; }
    const tempCards = cards;
    tempCards[index].classList.add('player1-match');
  }
  return false;
};

// shows a text of player 1's guess
const showPlayer1GuessBox1 = ():void => {
  if (player1GuessBox !== null && commentatorText !== null) {
    player1GuessBox.classList.remove('hidden');
    commentatorText.innerHTML = 'The Dog is making a guess';
  }
};

// default after turns. Otherwise highlighted cards still shows
const defaultHandsAfterPl1 = ():void => {
  player1GuessBox?.classList.add('hidden');
  defaultPl2Hand();
  defaultYouHand();
};

// fn to add green border to matching card/cards
const setGreen = (hand: NodeListOf<Element>, index: number):void => {
  if (index > -1) {
    const tempHand = hand;
    tempHand[index].classList.add('player2-match');
  }
};

// shows a text of player 2's guess
const showPlayer2GuessBox = ():void => {
  if (player2GuessBox !== null && commentatorText !== null) {
    player2GuessBox?.classList.remove('hidden');
    commentatorText.innerHTML = 'The Elephant is making a guess';
  }
};

const defaultHandsAfterPl2 = ():void => {
  player2GuessBox?.classList.add('hidden');
  defaultPl1Hand();
  defaultYouHand();
  enableDice();
  defaultDice();
  if (commentatorText !== null) {
    commentatorText.innerHTML = 'Guess you were too scared to accuse... Coward! Now, roll the dice.';
  }
};

// player 1 action after you make a guess
const player1Actions = ():void => {
  defaultPl1Hand();
  defaultPl2Hand();
  const diceNr:number = randomNum0to5() + 1;
  dice.innerHTML = String(diceNr);

  if (diceNr > 3 && player1GuessName !== null && player1GuessWeapon !== null && player1GuessRoom !== null && player1GuessBox !== null && commentatorText !== null) {
    movePlayer1();
    const guessedName:string = charDeck[randomNum0to5()];
    const guessedWeapon:string = weaponDeck[randomNum0to5()];
    const guessedRoom: string = roomDeck[randomNum0to8()];

    // change innerHTML in players guess box that displays players guess
    player1GuessName.innerHTML = guessedName;
    player1GuessWeapon.innerHTML = guessedWeapon;
    player1GuessRoom.innerHTML = guessedRoom;

    // if a card from player 2's hand matches => change to blue
    const highlightPlayerTwoCards = ():void => {
      setBlue(playerTwoHand, playerTwoCards, guessedName);
      setBlue(playerTwoHand, playerTwoCards, guessedWeapon);
      setBlue(playerTwoHand, playerTwoCards, guessedRoom);
    };

    // if a card form your hand matches => change to blue
    const highlightUrHandFromPl1 = ():void => {
      setBlue(playerYouHand, playerYouCards, guessedName);
      setBlue(playerYouHand, playerYouCards, guessedWeapon);
      setBlue(playerYouHand, playerYouCards, guessedRoom);
    };

    if (setBlue(playerTwoHand, playerTwoCards, guessedName, 'check')
      || setBlue(playerTwoHand, playerTwoCards, guessedWeapon, 'check')
      || setBlue(playerTwoHand, playerTwoCards, guessedRoom, 'check')) {
      setTimeout(highlightPlayerTwoCards, 1000 * 6);
    } else {
      setTimeout(highlightUrHandFromPl1, 1000 * 6);
    }

    setTimeout(showPlayer1GuessBox1, 1000 * 4);
    setTimeout(defaultHandsAfterPl1, 1000 * 10);
  } else {
    player1Actions();
  }
};

// player 2 (elephant) moves after player 1 is finish with its moves
const player2Actions = ():void => {
  const diceNr:number = randomNum0to5() + 1;
  dice.innerHTML = String(diceNr);

  if (diceNr > 3 && player2GuessName !== null && player2GuessWeapon !== null && player2GuessRoom !== null && commentatorText !== null) {
    movePlayer2();

    // makes a random guess
    const guessedName: string = charDeck[randomNum0to5()];
    const guessedWeapon: string = weaponDeck[randomNum0to5()];
    const guessedRoom: string = roomDeck[randomNum0to8()];

    // change innerHTML in players guess box that displays players guess
    player2GuessName.innerHTML = guessedName;
    player2GuessWeapon.innerHTML = guessedWeapon;
    player2GuessRoom.innerHTML = guessedRoom;

    // if player 1's card matches with the guess => change to color green
    const highlightPlayerOneCards = ():void => {
      setGreen(playerOneCards, playerOneHand.indexOf(guessedName));
      setGreen(playerOneCards, playerOneHand.indexOf(guessedWeapon));
      setGreen(playerOneCards, playerOneHand.indexOf(guessedRoom));
    };

    // if any cards from your hand matches with the guess => change to color green
    const highlightUrHandFromPl2 = ():void => {
      setGreen(playerYouCards, playerYouHand.indexOf(guessedName));
      setGreen(playerYouCards, playerYouHand.indexOf(guessedWeapon));
      setGreen(playerYouCards, playerYouHand.indexOf(guessedRoom));
    };

    if (playerYouHand.indexOf(guessedName) || playerYouHand.indexOf(guessedWeapon) || playerYouHand.indexOf(guessedRoom)) {
      setTimeout(highlightUrHandFromPl2, 1000 * 6);
    } else {
      setTimeout(highlightPlayerOneCards, 1000 * 6);
    }

    setTimeout(showPlayer2GuessBox, 1000 * 4);
    setTimeout(defaultHandsAfterPl2, 1000 * 10);
  } else {
    player2Actions();
  }
};

const resetGuessOption = (name: HTMLButtonElement):void => {
  name.classList.remove('marked-option');
};

// when making a guess
const handlingSubmitGuess = ():void => {
  bgBlock?.classList.add('hidden');

  // variables for marked answer
  const guessedName:string = document.querySelectorAll('.guess-name-btn.marked-option')[0].innerHTML;
  const guessedWeapon:string = document.querySelectorAll('.guess-weapon-btn.marked-option')[0].innerHTML;
  const guessedRoom:string = document.querySelectorAll('.guess-room-btn.marked-option')[0].innerHTML;
  const guessedCards: string[] = [guessedName, guessedWeapon, guessedRoom];

  // reveal the card in player 1's hand if it matches with the guess
  const revealPlayerOneCard = (card: string, i: number):void => {
    if (guessedCards.includes(card)) {
      playerOneCards[i].innerHTML = playerOneHand[i];
      playerOneCards[i].classList.add('guess-match'); // change color by adding classList
    }
  };
  // reveal the card in player 2's hand if it matches with the guess
  const revealPlayerTwoCard = (card: string, i: number):void => {
    if (guessedCards.includes(card)) {
      playerTwoCards[i].innerHTML = playerTwoHand[i];
      playerTwoCards[i].classList.add('guess-match');
    }
  };

  if (playerOneHand.includes(guessedCards[0]) || playerOneHand.includes(guessedCards[1]) || playerOneHand.includes(guessedCards[2])) {
    playerOneHand.forEach(revealPlayerOneCard);
  } else {
    playerTwoHand.forEach(revealPlayerTwoCard);
  }

  guessNameBtns.forEach(resetGuessOption);
  guessWeaponBtns.forEach(resetGuessOption);
  guessRoomBtns.forEach(resetGuessOption);

  disableGuessAccuseBtns();
  guessBox?.classList.add('hidden');
  defaultYouHand();
  defaultDice();
  setTimeout(player1Actions, 1000 * 3);
  setTimeout(player2Actions, 1000 * 12);
};

// highschore
const showHighscore = ():void => {
  highscoreBox?.classList.remove('hidden');
  gameOverLoseBox?.classList.add('hidden');
  gameOverWinBox?.classList.add('hidden');
};

// when clicking on highscore btn => show highscore
const openHighscore = (value: Element): void => {
  const highscoreBtn = value;
  highscoreBtn.addEventListener('click', showHighscore);
};

const restartGame = (e: Event):void => {
  const target = e.target as HTMLElement;

  if (target !== null && target.parentElement !== null) {
    target.parentElement.classList.add('hidden');
    count = 0; // reset counter
    introBox?.classList.remove('hidden');
  }
  // reset accuseDeck and mergedDeck
  drawCharAccuse = [...charDeck].splice(randomNum0to5(), 1);
  drawWeaponAccuse = [...weaponDeck].splice(randomNum0to5(), 1);
  drawRoomAccuse = [...roomDeck].splice(randomNum0to8(), 1);
  accuseDeck = [drawCharAccuse, drawWeaponAccuse, drawRoomAccuse];
  mergedDeck = charDeck.concat(weaponDeck, roomDeck);

  // reset players hand with new cards
  playerOneHand = [];
  playerTwoHand = [];
  playerYouHand = [];
  shuffledCard = shuffle(mergedDeck);
  dealCards();
  playerYouCards.forEach(addCardToHand);
};

const playAgainFn = (btn: HTMLButtonElement): void => {
  btn.addEventListener('click', restartGame);
};

if (startGameBtn !== null) {
  startGameBtn.addEventListener('click', startGame);
}

playerYouCards.forEach(addCardToHand);
allRooms.forEach(movePlayerForEach);
dice.addEventListener('click', rollDice);

if (guessBtn !== null) {
  guessBtn.addEventListener('click', guess);
}

submitGuessBtn?.addEventListener('click', handlingSubmitGuess);
handleClick(guessNameBtns, 'name', checkGuessMade);
handleClick(guessWeaponBtns, 'weapon', checkGuessMade);
handleClick(guessRoomBtns, 'room', checkGuessMade);
handleClick(accuseNameBtns, 'name', checkAccuseMade);
handleClick(accuseWeaponBtns, 'weapon', checkAccuseMade);
handleClick(accuseRoomBtns, 'room', checkAccuseMade);

if (accuseBtn !== null) {
  accuseBtn.addEventListener('click', showAccuseBox);
}

submitAccuseBtn?.addEventListener('click', handlingSubmitAccuse);

updateHighscoreBoard();
highscoreBtns.forEach(openHighscore);
(playAgainBtn as NodeListOf<HTMLButtonElement>).forEach(playAgainFn);
