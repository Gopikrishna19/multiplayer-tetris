class Player {
    #dropCounter = 0;
    #dropInterval = 1000;

    constructor() {
        this.offset = {
            x: 0,
            y: 0,
        };
        this.piece = null;
        this.score = 0;
    }

    autoDrop = (deltaTime, arena) => {
        this.#dropCounter += deltaTime;

        if (this.#dropCounter > this.#dropInterval) {
            this.drop(arena);
        }
    };

    drop = (arena) => {
        this.offset.y++;

        if (collide(arena, this)) {
            this.offset.y--;
            merge(arena, this);
            sweepArena(arena, this);

            this.reset(arena, this);
        }

        this.#dropCounter = 0;
    };

    move = (arena, direction) => {
        this.offset.x += direction;

        if (collide(arena, this)) {
            this.offset.x -= direction;
        }
    };

    reset = (arena) => {
        this.piece = createPiece();
        this.offset.y = 0;
        this.offset.x = (arena[0].length / 2 | 0) - (this.piece[0].length / 2 | 0);

        if (collide(arena, this)) {
            arena.forEach(row => row.fill(0));
            this.score = 0;
        }

        updateScore(this);
    };

    rotate = (arena, direction) => {
        rotateMatrix(this.piece, direction);
        const playerOffset = this.offset.x;
        let offset = 1;

        while (collide(arena, this)) {
            this.offset.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > this.piece[0].length) {
                rotateMatrix(this.piece, -direction);
                this.offset.x = playerOffset;

                return;
            }
        }
    };
}