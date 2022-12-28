// create guess box with all options and a submit btn
const createGuessAccuseBoxes = () => {
  const sectionGuess = document.createElement('section');
  sectionGuess.classList.add('guess-box', 'hidden');

  const h2Guess = document.createElement('h2');
  h2Guess.classList.add('guess-title');
  h2Guess.textContent = 'Make a guess';
  sectionGuess.appendChild(h2Guess);

  const divGuess = document.createElement('div');
  divGuess.classList.add('guess-wrapper');
  sectionGuess.appendChild(divGuess);

  const article1Guess = document.createElement('article');
  article1Guess.classList.add('guess-characters');
  divGuess.appendChild(article1Guess);

  const headerWhoGuess = document.createElement('h3');
  headerWhoGuess.textContent = 'Who?';
  article1Guess.appendChild(headerWhoGuess);

  const button1Guess = document.createElement('button');
  button1Guess.classList.add('guess-name-btn');
  button1Guess.textContent = 'Miss Scarlett';
  article1Guess.appendChild(button1Guess);

  const button2Guess = document.createElement('button');
  button2Guess.classList.add('guess-name-btn');
  button2Guess.textContent = 'Mr. Green';
  article1Guess.appendChild(button2Guess);

  const button3Guess = document.createElement('button');
  button3Guess.classList.add('guess-name-btn');
  button3Guess.textContent = 'Colonel Mustard';
  article1Guess.appendChild(button3Guess);

  const button4Guess = document.createElement('button');
  button4Guess.classList.add('guess-name-btn');
  button4Guess.textContent = 'Professor Plum';
  article1Guess.appendChild(button4Guess);

  const button5Guess = document.createElement('button');
  button5Guess.classList.add('guess-name-btn');
  button5Guess.textContent = 'Mrs. Peacock';
  article1Guess.appendChild(button5Guess);

  const button6Guess = document.createElement('button');
  button6Guess.classList.add('guess-name-btn');
  button6Guess.textContent = 'Mrs. White';
  article1Guess.appendChild(button6Guess);

  const article2Guess = document.createElement('article');
  article2Guess.classList.add('guess-weapons');
  divGuess.appendChild(article2Guess);

  const headerWeapon = document.createElement('h3');
  headerWeapon.textContent = 'Which weapon?';
  article2Guess.appendChild(headerWeapon);

  const button7Guess = document.createElement('button');
  button7Guess.classList.add('guess-weapon-btn');
  button7Guess.textContent = 'Candlestick';
  article2Guess.appendChild(button7Guess);

  const button8Guess = document.createElement('button');
  button8Guess.classList.add('guess-weapon-btn');
  button8Guess.textContent = 'Knife';
  article2Guess.appendChild(button8Guess);

  const button9Guess = document.createElement('button');
  button9Guess.classList.add('guess-weapon-btn');
  button9Guess.textContent = 'Lead Pipe';
  article2Guess.appendChild(button9Guess);

  const button1Guess0 = document.createElement('button');
  button1Guess0.classList.add('guess-weapon-btn');
  button1Guess0.textContent = 'Revolver';
  article2Guess.appendChild(button1Guess0);

  const button1Guess1 = document.createElement('button');
  button1Guess1.classList.add('guess-weapon-btn');
  button1Guess1.textContent = 'Rope';
  article2Guess.appendChild(button1Guess1);

  const button1Guess2 = document.createElement('button');
  button1Guess2.classList.add('guess-weapon-btn');
  button1Guess2.textContent = 'Wrench';
  article2Guess.appendChild(button1Guess2);

  const article3 = document.createElement('article');
  article3.classList.add('guess-rooms');
  divGuess.appendChild(article3);

  const header3Guess = document.createElement('h3');
  header3Guess.textContent = 'Which room?';
  article3.appendChild(header3Guess);

  const button1Guess3 = document.createElement('button');
  button1Guess3.classList.add('guess-room-btn');
  button1Guess3.textContent = 'Kitchen';
  article3.appendChild(button1Guess3);

  const button1Guess4 = document.createElement('button');
  button1Guess4.classList.add('guess-room-btn');
  button1Guess4.textContent = 'Ballroom';
  article3.appendChild(button1Guess4);

  const button1Guess5 = document.createElement('button');
  button1Guess5.classList.add('guess-room-btn');
  button1Guess5.textContent = 'Conservatory';
  article3.appendChild(button1Guess5);

  const button1Guess6 = document.createElement('button');
  button1Guess6.classList.add('guess-room-btn');
  button1Guess6.textContent = 'Dining Room';
  article3.appendChild(button1Guess6);

  const button1Guess7 = document.createElement('button');
  button1Guess7.classList.add('guess-room-btn');
  button1Guess7.textContent = 'Billiard Room';
  article3.appendChild(button1Guess7);

  const button1Guess8 = document.createElement('button');
  button1Guess8.classList.add('guess-room-btn');
  button1Guess8.textContent = 'Library';
  article3.appendChild(button1Guess8);

  const button1Guess9 = document.createElement('button');
  button1Guess9.classList.add('guess-room-btn');
  button1Guess9.textContent = 'Lounge';
  article3.appendChild(button1Guess9);

  const button2Guess0 = document.createElement('button');
  button2Guess0.classList.add('guess-room-btn');
  button2Guess0.textContent = 'Hall';
  article3.appendChild(button2Guess0);

  const button2Guess1 = document.createElement('button');
  button2Guess1.classList.add('guess-room-btn');
  button2Guess1.textContent = 'Study';
  article3.appendChild(button2Guess1);

  const submitButton = document.createElement('button');
  submitButton.classList.add('submit-guess-btn');
  submitButton.setAttribute('disabled', 'true');
  submitButton.textContent = 'Submit guess';
  sectionGuess.appendChild(submitButton);

  document.body.appendChild(sectionGuess);

  // create accuse box with all options and a submit btn
  const section = document.createElement('section');
  section.classList.add('accuse-box', 'hidden');

  const h2 = document.createElement('h2');
  h2.classList.add('accuse-title');
  h2.textContent = 'Make an accusation!';
  section.appendChild(h2);

  const div = document.createElement('div');
  div.classList.add('accuse-wrapper');
  section.appendChild(div);

  const article1 = document.createElement('article');
  article1.classList.add('accuse-characters');
  div.appendChild(article1);

  const h3 = document.createElement('h3');
  h3.textContent = 'Who?';
  article1.appendChild(h3);

  const button1 = document.createElement('button');
  button1.classList.add('accuse-name-btn');
  button1.textContent = 'Miss Scarlett';
  article1.appendChild(button1);

  const button2 = document.createElement('button');
  button2.classList.add('accuse-name-btn');
  button2.textContent = 'Mr. Green';
  article1.appendChild(button2);

  const button3 = document.createElement('button');
  button3.classList.add('accuse-name-btn');
  button3.textContent = 'Colonel Mustard';
  article1.appendChild(button3);

  const button4 = document.createElement('button');
  button4.classList.add('accuse-name-btn');
  button4.textContent = 'Professor Plum';
  article1.appendChild(button4);

  const button5 = document.createElement('button');
  button5.classList.add('accuse-name-btn');
  button5.textContent = 'Mrs. Peacock';
  article1.appendChild(button5);

  const button6 = document.createElement('button');
  button6.classList.add('accuse-name-btn');
  button6.textContent = 'Mrs. White';
  article1.appendChild(button6);

  const article2 = document.createElement('article');
  article2.classList.add('accuse-weapons');
  div.appendChild(article2);

  const h4 = document.createElement('h3');
  h4.textContent = 'Which weapon?';
  article2.appendChild(h4);

  const button7 = document.createElement('button');
  button7.classList.add('accuse-weapon-btn');
  button7.textContent = 'Candlestick';
  article2.appendChild(button7);

  const button8 = document.createElement('button');
  button8.classList.add('accuse-weapon-btn');
  button8.textContent = 'Knife';
  article2.appendChild(button8);

  const button9 = document.createElement('button');
  button9.classList.add('accuse-weapon-btn');
  button9.textContent = 'Lead Pipe';
  article2.appendChild(button9);

  const button10 = document.createElement('button');
  button10.classList.add('accuse-weapon-btn');

  button10.textContent = 'Revolver';
  article2.appendChild(button10);

  const button11 = document.createElement('button');
  button11.classList.add('accuse-weapon-btn');
  button11.textContent = 'Rope';
  article2.appendChild(button11);

  const button12 = document.createElement('button');
  button12.classList.add('accuse-weapon-btn');
  button12.textContent = 'Wrench';
  article2.appendChild(button12);

  const article3Accuse = document.createElement('article');
  article3Accuse.classList.add('accuse-rooms');
  div.appendChild(article3Accuse);

  const h5 = document.createElement('h3');
  h5.textContent = 'Which room?';
  article3Accuse.appendChild(h5);

  const button13 = document.createElement('button');
  button13.classList.add('accuse-room-btn');
  button13.textContent = 'Kitchen';
  article3Accuse.appendChild(button13);

  const button14 = document.createElement('button');
  button14.classList.add('accuse-room-btn');
  button14.textContent = 'Ballroom';
  article3Accuse.appendChild(button14);

  const button15 = document.createElement('button');
  button15.classList.add('accuse-room-btn');
  button15.textContent = 'Conservatory';
  article3Accuse.appendChild(button15);

  const button16 = document.createElement('button');
  button16.classList.add('accuse-room-btn');
  button16.textContent = 'Dining Room';
  article3Accuse.appendChild(button16);

  const button17 = document.createElement('button');
  button17.classList.add('accuse-room-btn');
  button17.textContent = 'Billiard Room';
  article3Accuse.appendChild(button17);

  const button18 = document.createElement('button');
  button18.classList.add('accuse-room-btn');
  button18.textContent = 'Library';
  article3Accuse.appendChild(button18);

  const button19 = document.createElement('button');
  button19.classList.add('accuse-room-btn');
  button19.textContent = 'Lounge';
  article3Accuse.appendChild(button19);

  const button20 = document.createElement('button');
  button20.classList.add('accuse-room-btn');
  button20.textContent = 'Hall';
  article3Accuse.appendChild(button20);

  const button21 = document.createElement('button');
  button21.classList.add('accuse-room-btn');
  button21.textContent = 'Study';
  article3Accuse.appendChild(button21);

  const submitButtonAccuse = document.createElement('button');
  submitButtonAccuse.classList.add('submit-accuse-btn');
  submitButtonAccuse.setAttribute('disabled', 'true');
  submitButtonAccuse.textContent = 'Submit my accusation!';
  section.appendChild(submitButtonAccuse);

  document.body.appendChild(section);
};

export default createGuessAccuseBoxes;
