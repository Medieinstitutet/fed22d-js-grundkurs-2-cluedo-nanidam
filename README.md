[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=9553152&assignment_repo_type=AssignmentRepo)

# Simplified Cluedo

This is a school project of the game Cluedo with focus on JavaScript/Typescript.

In this simplified version, you will take on the role as the detective, trying to identify the suspect, weapon, and location of a hypothetical murder.

To make a guess, a player will choose one of the suspects, weapons, or locations that they have not yet guessed and present it to the other players. If any player has a card that matches the guess, they must reveal it to the guessing player.

To win the game, a player must use their detective skills to gather as much information as possible through careful questioning and deduction. With each correct guess, players will narrow down the possible combinations of suspects, weapons, and locations, bringing them one step closer to solving the crime.

_Disclaimer_ This version is made to be played on a desktop layout and not for mobile and smaller tablets.

## Tech Stack

**User interface** HTML CSS Sass

**Functionality** JavaScript TypeScript

**Versioncontroll** Git

**Tools** Visual Studio Code Eslint Prettier Vite

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Publicera ditt projekt

Detta projekt innehåller en automatisk workflow/action, som fungerar såhär:

1. Varje gång du pushar till branchen `main`, så triggas ett script som heter `Deploy changes`.
2. Detta script kör i princip kommandot `pnpm run build`. Den skapar en mapp som heter `dist`, som innehåller ditt optimerade/färdiga/publicerade projekt. Filerna i den mappen kopieras över till en ny branch, som heter `gh-pages`.

För att aktivera din sajt live behöver du:

1. Gå in i filen `vite.config.js` och ändra `base` så att den heter samma som ditt repo heter.
2. Gå in i inställningarna för ditt repo (Settings), gå till fliken "General" och längst ner på sidan i "Danger Zone" ändrar du repots "visibility" till public.
3. I samma "Settings"-flik på ditt repo, klicka på "Pages" i menyn till vänster.
4. I "Branch"-dropdownen väljer du `gh-pages`.
