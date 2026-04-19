const readline = require('readline');

class TicTacToe {
    constructor() {
        this.board = Array(9).fill(null);
        this.currentPlayer = 'X';
        this.gameOver = false;
        
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    printBoard() {
        console.log('\n');
        for (let i = 0; i < 9; i += 3) {
            const row = this.board.slice(i, i + 3).map(cell => cell || ' ');
            console.log(` ${row[0]} | ${row[1]} | ${row[2]} `);
            if (i < 6) console.log('---+---+---');
        }
        console.log('\n');
    }

    makeMove(position) {
        if (position < 0 || position >= 9 || this.board[position] !== null) {
            return false;
        }
        this.board[position] = this.currentPlayer;
        return true;
    }

    checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                return this.board[a];
            }
        }

        if (this.board.every(cell => cell !== null)) {
            return 'draw';
        }

        return null;
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }

    async play() {
        console.log('=== Крестики-нолики ===');
        console.log('Введите номер клетки (0-8) для хода:');
        console.log('0 | 1 | 2');
        console.log('3 | 4 | 5');
        console.log('6 | 7 | 8\n');

        while (!this.gameOver) {
            this.printBoard();
            console.log(`Ход игрока: ${this.currentPlayer}`);

            const move = await new Promise(resolve => {
                this.rl.question('Ваш ход (0-8): ', resolve);
            });

            const position = parseInt(move, 10);

            if (isNaN(position) || position < 0 || position > 8) {
                console.log('Неверный ввод! Введите число от 0 до 8.');
                continue;
            }

            if (!this.makeMove(position)) {
                console.log('Эта клетка уже занята! Попробуйте другую.');
                continue;
            }

            const result = this.checkWinner();
            
            if (result) {
                this.printBoard();
                if (result === 'draw') {
                    console.log('Ничья!');
                } else {
                    console.log(`Победил игрок ${result}!`);
                }
                this.gameOver = true;
            } else {
                this.switchPlayer();
            }
        }

        this.rl.close();
    }
}

// Запуск игры
const game = new TicTacToe();
game.play();
