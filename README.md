# Connect 4 - Multiplayer Strategy Game

A professional, responsive implementation of the classic Connect 4 board game built with pure Vanilla JavaScript, CSS, and HTML.

## Features
- **Turn-taking Mechanism**: Two-player local multiplayer (Red vs. Yellow).
- **Dynamic Board**: Game board is programmatically generated and updated using DOM manipulation.
- **Model-View-Controller (MVC) Pattern**: The game logic (Model) is strictly separated from the User Interface (View).
- **Interactive UI**: Includes column highlighting on hover and smooth transitions.
- **Win Detection**: Comprehensive algorithm to check for horizontal, vertical, and diagonal wins.
- **Responsive Design**: Playable on desktop and mobile devices.

## Prerequisites
No special software is required. You only need a modern web browser (Chrome, Firefox, Safari, or Edge).

## Installation
1.  Download the project files (`index.html`, `style.css`, `script.js`).
2.  Ensure all files are placed in the same directory.
3.  No external dependencies or libraries are required.

## How to Run
1.  Open the `index.html` file in your preferred web browser.
2.  Alternatively, use a local server extension (like Live Server in VS Code) for the best experience.

## How to Play
1.  **Objective**: Be the first player to connect four of your colored discs in a row (horizontally, vertically, or diagonally).
2.  **Player 1 (Red)** starts first.
3.  **Mouse Hover**: Hover over any column to see which column you are targeting.
4.  **Click**: Click any cell in a column to drop your disc into the lowest available slot.
5.  **Game End**: A popup will appear when a player wins or if the game ends in a draw.
6.  **New Game**: Click the "New Game" button at any time to reset the board.

## Implementation Details (Technical)
- **Events Used**: 
    - `click`: Used for dropping pieces and clicking buttons.
    - `mouseenter` / `mouseleave`: Used for identifying and highlighting the active column.
    - `onload`: Used to initialize the game state when the page opens.
- **DOM Manipulation**: 
    - Board cells are created using `document.createElement`.
    - Content is updated via `textContent`.
    - Styles are toggled using `classList` and class management.
- **Win Algorithm**: A directional scanning approach is used, checking all 8 possible directions from the last dropped piece.

## Acknowledgments
- Inspired by the classic Hasbro game "Connect 4".
- Reference logic for directional searching based on standard grid-traversal algorithms.
- UI design principles inspired by modern CSS frameworks (Tailwind/Bootstrap) but implemented in raw CSS.

## Troubleshooting
- **Board not showing?** Ensure `script.js` and `style.css` are in the same folder as `index.html`.
- **Clicks not working?** check if the game has ended; once a player wins, interaction is disabled until the "New Game" button is clicked.
