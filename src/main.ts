import './style/style.scss';

// All kod härifrån och ner är bara ett exempel för att komma igång

// I denna utils-fil har vi lagrat funktioner som ofta används, t.ex. en "blanda array"-funktion
// import { shuffle } from './utils';

// // I denna fil har vi lagrat vår "data", i detta exempel en ofullständig kortlek
// import exampleCardDeck from './exampleArray';

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
const rooms = Array.from(document.getElementsByClassName('room'));
const smallRooms = Array.from(document.getElementsByClassName('room-small'));
const diningRoom = Array.from(document.getElementsByClassName('dining-room'));

// merge all rooms to ONE array
const mergeRooms = rooms.concat(smallRooms);
const mergeAllRooms = mergeRooms.concat(diningRoom);

const makeRoomActive = function makeRoomActive(e:unknown) {
  mergeAllRooms.forEach((room) => {
    if (room.getAttribute('id') === e.currentTarget.id) {
      room.classList.add('active');
    } else {
      room.classList.remove('active');
    }
  });
};

mergeAllRooms.forEach((room) => {
  room.addEventListener('click', makeRoomActive);
});

// characters deck
const charDeck: string[] = [
  'Miss Scarlett', 'Mr. Green', 'Colonel Mustard', 'Professor Plum', 'Mrs. Peacock', 'Mrs. White',
];

const weaponDeck: string[] = [
  'Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench',
];

const roomDeck: string[] = [
  'Kitchen', 'Ballroom', 'Dining Room', 'Billiard Room', 'Library', 'Lounge', 'Hall', 'Study',
];

// shuffle a random number
const randomNum0to5 = () => Math.floor(Math.random() * 6);

// draw 1 card from each deck and put then in "accuseDeck"
const drawCharAccuse: string[] = charDeck.splice(randomNum0to5(), 1);
const drawWeaponAccuse: string[] = weaponDeck.splice(randomNum0to5(), 1);
const drawRoomAccuse: string[] = roomDeck.splice(Math.floor(Math.random() * roomDeck.length), 1);
const accuseDeck = [];

accuseDeck.push(drawCharAccuse);
accuseDeck.push(drawWeaponAccuse);
accuseDeck.push(drawRoomAccuse);

// dice & counter
const dice = document.getElementsByClassName('dice')[0];

// when dice is clicked on -> add +1 on count
let count = 0;
const updateCount = () => {
  count++;
};
dice.addEventListener('click', updateCount);

updateCount();

// guess btn
const guessBtn = document.getElementsByClassName('guess-btn')[0];

// FIXME: guess/accuse box
const guess = () => {
  alert('POP UP GUESS BOX SOMEWHERE');
};
guessBtn.addEventListener('click', guess);

// players
const playerOneHand = [];
const playerTwoHand = [];
const playerYouHand = [];

const mergeWeapon: string[] = charDeck.concat(weaponDeck);
const mergedDeck: string[] = mergeWeapon.concat(roomDeck);

const shuffle = (array: string[]) => {
  const tempArray:string[] = [...array];
  let currentIndex:number = array.length;
  let randomIndex:number;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [tempArray[currentIndex], tempArray[randomIndex]] = [
      tempArray[randomIndex], tempArray[currentIndex]];
  }

  return array;
};

const shuffledCard: string[] = shuffle(mergedDeck);
console.log(shuffledCard);

while (shuffledCard.length > 0) {
  playerOneHand.push(shuffledCard.shift());
  playerTwoHand.push(shuffledCard.shift());
  // if shuffledCard is not empty -> push
  if (shuffledCard.length !== 0) {
    playerYouHand.push(shuffledCard.shift());
  }
}

console.log(shuffledCard);
console.log(playerOneHand);
console.log(playerTwoHand);
console.log(playerYouHand);
