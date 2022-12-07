/*eslint-disable */
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

const makeRoomActive = function makeRoomActive(e) {
  mergeAllRooms.forEach((room) => {
    if (room.getAttribute('id') === e.currentTarget.id) {
      room.classList.add('active');
    } else {
      room.classList.remove('active');
    }
  });
};

mergeAllRooms.forEach((room: any) => {
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


const accuseDeck: string[] = [];

//shuffle a random number
const shuffleCard =  () => {
  return Math.floor(Math.random() * 5);
};

accuseDeck.push(charDeck[shuffleCard()]);
accuseDeck.push(weaponDeck[shuffleCard()]);
accuseDeck.push(roomDeck[Math.floor(Math.random() * roomDeck.length)]);



