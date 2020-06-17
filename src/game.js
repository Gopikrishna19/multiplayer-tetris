class Game {
    #arena;
    #context;
    #player;

    static get ORIGIN() {
        return {
            x: 0,
            y: 0,
        };
    }

    static get COLORS() {
        return [
            null,
            'purple',
            'yellow',
            'orange',
            'blue',
            'aqua',
            'green',
            'red',
        ];
    }

    static get HEIGHT() {
        return 400;
    }

    static get WIDTH() {
        return 240;
    }

    static get SCALE() {
        return Game.HEIGHT / 20;
    }

    static get ARENA_HEIGHT() {
        return Game.HEIGHT / Game.SCALE;
    }

    static get ARENA_WIDTH() {
        return Game.WIDTH / Game.SCALE;
    }

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
        this.drawMatrix(this.#arena, Game.ORIGIN);
        this.drawMatrix(this.#player.piece, this.#player.offset);
    };

    drawMatrix = (matrix, offset) => {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this.#context.fillStyle = Game.COLORS[value];
                    this.#context.fillRect(
                        x + offset.x,
                        y + offset.y,
                        1, 1,
                    );
                }
            });
        });
    };

    subscribeToKeyboardEvents({
                                  drop,
                                  moveLeft,
                                  moveRight,
                                  rotate,
                              }) {
        document.addEventListener('keydown', (event) => {
            switch (event.key) {
                case moveLeft:
                    this.#player.move(this.#arena, -1);
                    break;
                case moveRight:
                    this.#player.move(this.#arena, +1);
                    break;
                case drop:
                    this.#player.drop(this.#arena);
                    break;
                case rotate:
                    this.#player.rotate(this.#arena, -1);
                    break;
            }
        });
    }
}