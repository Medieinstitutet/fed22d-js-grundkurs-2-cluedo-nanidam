// export function createDropdownSection() {
//   // create the main section element
//   const section = document.createElement('section');
//   section.classList.add('dropdown', 'hidden');

//   // create the h2 element for the drop-title
//   const dropTitle = document.createElement('h2');
//   dropTitle.classList.add('drop-title');
//   dropTitle.textContent = 'Take a guess';
//   section.appendChild(dropTitle);

//   // create the div element for the drop-wrapper
//   const dropWrapper = document.createElement('div');
//   dropWrapper.classList.add('drop-wrapper');
//   section.appendChild(dropWrapper);

//   const characters = document.createElement('article');
//   characters.classList.add('drop-characters');
//   dropWrapper.appendChild(characters);

//   const charactersTitle = document.createElement('h3');
//   charactersTitle.textContent = 'Who?';
//   characters.appendChild(charactersTitle);

//   const names = [
//     'Miss Scarlett',
//     'Mr. Green',
//     'Colonel Mustard',
//     'Professor Plum',
//     'Mrs. Peacock',
//     'Mrs. White',
//   ];
//   for (const name of names) {
//     const button = document.createElement('button');
//     button.classList.add('guess-name-btn');
//     button.textContent = name;
//     characters.appendChild(button);
//   }

//   // create the article element for the drop-weapons
//   const dropWeapons = document.createElement('article');
//   dropWeapons.classList.add('drop-weapons');
//   dropWrapper.appendChild(dropWeapons);

//   // create the h3 element for the drop-weapons title
//   const weaponsTitle = document.createElement('h3');
//   weaponsTitle.textContent = 'Which weapon?';
//   dropWeapons.appendChild(weaponsTitle);

//   // create the weapon buttons
//   const weapons = ['Candlestick', 'Knife', 'Lead Pipe', 'Revolver', 'Rope', 'Wrench'];
//   weapons.forEach((weapon) => {
//     const button = document.createElement('button');
//     button.classList.add('guess-weapon-btn');
//     button.textContent = weapon;
//     dropWeapons.appendChild(button);
//   });

//   // Create the article element and set its class
//   const article = document.createElement('article');
//   article.classList.add('drop-rooms');

//   // Create the h3 element and set its text
//   const h3 = document.createElement('h3');
//   h3.textContent = 'Which room?';
//   article.appendChild(h3);

//   // Create buttons for each of the rooms and add them to the article
//   const rooms = ['Kitchen', 'Ballroom', 'Conservatory', 'Dining Room', 'Billiard Room', 'Library', 'Lounge', 'Hall', 'Study'];
//   for (const room of rooms) {
//     const button = document.createElement('button');
//     button.textContent = room;
//     button.classList.add('guess-room-btn');
//     article.appendChild(button);
//   }
//   dropWrapper.appendChild(article);
//   section.appendChild(dropWrapper);

//   // Create the submit button and set its text and class
//   const submitButton = document.createElement('button');
//   submitButton.textContent = 'Submit guess';
//   submitButton.classList.add('submit-btn');
//   submitButton.setAttribute('disabled', true);
//   section.appendChild(submitButton);

//   return section;
// }

// export const main = document.querySelector('.main');

// export const appendDropdownToMain = () => {
//   const dropdownSection = createDropdownSection();
//   main.appendChild(dropdownSection);
//   console.log(dropdownSection);
// };
