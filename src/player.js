class Player {
    #dropCounter = 0;
    #dropInterval = 1000;
    #onScore = [];
    #score = 0;

    constructor() {
        this.offset = {
            x: 0,
            y: 0,
        };
        this.piece = null;
    }

    autoDrop = (deltaTime, arena) => {
        this.#dropCounter += deltaTime;

        if (this.#dropCounter > this.#dropInterval) {
            this.drop(arena);
        }
    };

    drop = (arena) => {
        this.offset.y++;

        if (arena.isColliding(this)) {
            this.offset.y--;
            arena.merge(this);
            this.#score += arena.sweepAndScore(this);
            this.reset(arena, this);
        }

        this.#dropCounter = 0;
    };

    move = (arena, direction) => {
        this.offset.x += direction;

        if (arena.isColliding(this)) {
            this.offset.x -= direction;
        }
    };

    onScore = (listener) => {
        this.#onScore.push(listener);

        return () => {
            const index = this.#onScore.findIndex(value => listener === value);

            this.#onScore.splice(index, 1);
        };
    }

    reset = (arena) => {
        this.piece = new Piece();
        this.offset.y = 0;
        this.offset.x = (arena[0].length / 2 | 0) - (this.piece[0].length / 2 | 0);

        if (arena.isColliding(this)) {
            arena.clear();
            this.#score = 0;
        }

        this.updateScore();
    };

    rotate = (arena, direction) => {
        this.piece.rotate(direction);
        const playerOffset = this.offset.x;
        let offset = 1;

        while (arena.isColliding(this)) {
            this.offset.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > this.piece[0].length) {
                this.piece.rotate(direction);
                this.offset.x = playerOffset;

                return;
            }
        }
    };

    updateScore = () => {
        this.#onScore.forEach(listener => listener(this.#score));
    }
}