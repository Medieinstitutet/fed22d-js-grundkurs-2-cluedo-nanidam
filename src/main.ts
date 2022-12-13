import './style/style.scss';

// import {
//   createDropdownSection, appendToMain, main,
// } from './render';
import {
  startGameBtn, guessBtn,
  createPlayerPieces, charDeck, weaponDeck, roomDeck,
  randomNum0to5, randomNum0to8,
  guess, shuffle, shuffledCard,
  playerOneHand, playerTwoHand, playerYouHand,
  mergeWeapon, mergedDeck,
  currentTimer, minutes, seconds, timer,
  errorMsgName, allRooms, playerInput, startGameBtn, introBox, validatePlayerInput,
  playerName, playerYou, player1, player2,
  dice, count, updateCount, accuseDeck, rollDice,
} from './help-funcs';

// appendToMain();

// TODO: move all addEventListener here
// FIXME: all anonymus fn

dice.addEventListener('click', rollDice);

guessBtn.addEventListener('click', guess);

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
