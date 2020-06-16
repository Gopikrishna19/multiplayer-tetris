const ORIGIN = {
    x: 0,
    y: 0,
};
const COLORS = [
    null,
    'purple',
    'yellow',
    'orange',
    'blue',
    'aqua',
    'green',
    'red'
];

class Game {
    #arena;
    #context;
    #player;

    constructor(player, arena, context) {
        this.#player = player;
        this.#arena = arena;
        this.#context = context;
    }

    clear = (width, height) => {
        this.#context.fillStyle = '#000';
        this.#context.fillRect(0, 0, width, height);
    };

    draw = (width, height) => {
        this.clear(width, height);
        this.drawMatrix(this.#arena, ORIGIN);
        this.drawMatrix(this.#player.piece, this.#player.offset);
    };

    drawMatrix = (matrix, offset) => {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.#context.fillStyle = COLORS[value];
                    this.#context.fillRect(
                        x + offset.x,
                        y + offset.y,
                        1, 1,
                    );
                }
            });
        });
    };

    subscribeToKeyboardEvents() {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'ArrowLeft':
                    this.#player.move(this.#arena, -1);
                    break;
                case 'ArrowRight':
                    this.#player.move(this.#arena, +1);
                    break;
                case 'ArrowDown':
                    this.#player.drop(this.#arena);
                    break;
                case 'q':
                case 'Q':
                case 'ArrowUp':
                    this.#player.rotate(this.#arena, -1);
                    break;
                case 'e':
                case 'E':
                    this.#player.rotate(this.#arena, +1);
                    break;
            }
        });
    }

    updateScore = (score) => {
        document.getElementById('score').innerText = `Score: ${score}`;
    }
}