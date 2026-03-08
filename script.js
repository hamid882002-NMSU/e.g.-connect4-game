/**
 * Connect 4 - Multiplayer Strategy Game
 * 
 * Architecture: Model-View-Controller (MVC)
 * - Model: The 'board' array and game state variables.
 * - View: The DOM elements and the render function.
 * - Controller: Event listeners and game logic functions.
 */

// --- CONFIGURATION & CONSTANTS ---
const ROWS = 6;
const COLS = 7;
const PLAYER_1 = 1; // Red
const PLAYER_2 = 2; // Yellow

// --- STATE (The Model) ---
let board = [];
let currentPlayer = PLAYER_1;
let isGameActive = true;

// --- DOM ELEMENTS (The View) ---
const boardElement = document.getElementById('game-board');
const statusCard = document.getElementById('status-card');
const statusText = document.getElementById('status-text');
const resetBtn = document.getElementById('reset-button');
const overlay = document.getElementById('overlay');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalClose = document.getElementById('modal-close');

// --- INITIALIZATION ---

/**
 * Starts or resets the game state
 */
function initGame() {
    // 1. Initialize logic board (Model)
    // 0 = empty, 1 = red, 2 = yellow
    board = Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
    
    // 2. Reset state variables
    currentPlayer = PLAYER_1;
    isGameActive = true;
    
    // 3. Clear and update the View
    renderInitialBoard();
    updateUI();
    hideModal();
}

/**
 * Creates the grid of cells in the DOM
 */
function renderInitialBoard() {
    boardElement.innerHTML = '';
    
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = r;
            cell.dataset.col = c;
            
            // Event Type 1: Click to drop piece
            cell.addEventListener('click', () => handleCellClick(c));
            
            // Event Type 2: Mouseenter/leave for column highlighting
            cell.addEventListener('mouseenter', () => highlightColumn(c, true));
            cell.addEventListener('mouseleave', () => highlightColumn(c, false));
            
            boardElement.appendChild(cell);
        }
    }
}

// --- CONTROLLER LOGIC ---

/**
 * Handles the logic when a user clicks on any cell in a column
 * @param {number} colIndex 
 */
function handleCellClick(colIndex) {
    if (!isGameActive) return;

    // Find the lowest available row in this column
    const rowIndex = getLowestEmptyRow(colIndex);

    if (rowIndex !== -1) {
        // Update Model
        board[rowIndex][colIndex] = currentPlayer;
        
        // Update View (DOM manipulation)
        updateCellInDOM(rowIndex, colIndex);
        
        // Check for Win or Draw
        if (checkWin(rowIndex, colIndex)) {
            endGame(false);
        } else if (checkDraw()) {
            endGame(true);
        } else {
            // Switch Player
            currentPlayer = (currentPlayer === PLAYER_1) ? PLAYER_2 : PLAYER_1;
            updateUI();
        }
    }
}

/**
 * Finds the bottom-most empty row in a given column
 * @param {number} col 
 * @returns {number} row index or -1 if full
 */
function getLowestEmptyRow(col) {
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r][col] === 0) {
            return r;
        }
    }
    return -1;
}

/**
 * Checks if the last move resulted in a win
 * @param {number} r row index
 * @param {number} c column index
 * @returns {boolean}
 */
function checkWin(r, c) {
    const player = board[r][c];
    
    // Define directions: [rowDelta, colDelta]
    const directions = [
        [0, 1],  // Horizontal
        [1, 0],  // Vertical
        [1, 1],  // Diagonal (down-right)
        [1, -1]  // Diagonal (down-left)
    ];

    for (const [dr, dc] of directions) {
        let count = 1;

        // Check in positive direction
        count += countInDirection(r, c, dr, dc, player);
        // Check in negative direction
        count += countInDirection(r, c, -dr, -dc, player);

        if (count >= 4) return true;
    }

    return false;
}

/**
 * Helper to count consecutive pieces in a direction
 */
function countInDirection(row, col, dr, dc, player) {
    let count = 0;
    let r = row + dr;
    let c = col + dc;

    while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
        count++;
        r += dr;
        c += dc;
    }
    return count;
}

/**
 * Checks if the board is full (Draw)
 */
function checkDraw() {
    return board.every(row => row.every(cell => cell !== 0));
}

// --- VIEW UPDATES (DOM MANIPULATION) ---

/**
 * Updates a single cell visual piece
 */
function updateCellInDOM(row, col) {
    const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
    if (cell) {
        const pieceClass = (currentPlayer === PLAYER_1) ? 'red' : 'yellow';
        cell.classList.add(pieceClass);
        
        // Visual feedback: remove hover highlight on landing
        cell.classList.remove('highlight');
    }
}

/**
 * Updates status text and styles based on current player
 */
function updateUI() {
    if (currentPlayer === PLAYER_1) {
        statusText.textContent = "Player 1's Turn (Red)";
        statusCard.className = "status-card player1-active";
    } else {
        statusText.textContent = "Player 2's Turn (Yellow)";
        statusCard.className = "status-card player2-active";
    }
}

/**
 * Highlights/Unhighlights entire column on hover
 */
function highlightColumn(col, shouldHighlight) {
    if (!isGameActive) return;
    
    const columnCells = document.querySelectorAll(`.cell[data-col="${col}"]`);
    columnCells.forEach(cell => {
        if (shouldHighlight) {
            cell.classList.add('highlight');
        } else {
            cell.classList.remove('highlight');
        }
    });
}

/**
 * Logic for when game ends
 */
function endGame(isDraw) {
    isGameActive = false;
    
    if (isDraw) {
        modalTitle.textContent = "It's a Tie!";
        modalMessage.textContent = "The board is full. Well played both!";
    } else {
        const winner = (currentPlayer === PLAYER_1) ? "Player 1 (Red)" : "Player 2 (Yellow)";
        modalTitle.textContent = "Congratulations!";
        modalMessage.textContent = `${winner} has won the match!`;
    }
    
    showModal();
}

function showModal() {
    overlay.classList.remove('hidden');
}

function hideModal() {
    overlay.classList.add('hidden');
}

// --- EVENT LISTENERS ---

resetBtn.addEventListener('click', initGame);
modalClose.addEventListener('click', initGame);

// Start the game on load
window.onload = initGame;
