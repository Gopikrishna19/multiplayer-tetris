const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

const HEIGHT = 400;
const WIDTH = 240;
const SCALE = 20;
const ARENA_HEIGHT = HEIGHT / SCALE;
const ARENA_WIDTH = WIDTH / SCALE;
const ORIGIN = {
    x: 0,
    y: 0,
};

canvas.setAttribute('height', `${HEIGHT}`);
canvas.setAttribute('width', `${WIDTH}`);

context.scale(SCALE, SCALE);

function createArena(width, height) {
    const matrix = [];
    let h = height;

    while (h--) {
        matrix.push(new Array(width).fill(0));
    }

    return matrix;
}

function collide(arena, player) {
    return player.matrix.some((row, y) => {
        return row.some((value, x) => {
            return value !== 0 && (arena[y + player.offset.y] && arena[y + player.offset.y][x + player.offset.x]) !== 0;
        });
    });
}

function merge(arena, player) {
    player.matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                arena[y + player.offset.y][x + player.offset.x] = value;
            }
        });
    });
}

function rotateMatrix(matrix, direction) {
    for (let y = 0; y < matrix.length; y += 1) {
        for (let x = 0; x < y; x += 1) {
            [
                matrix[x][y],
                matrix[y][x],
            ] = [
                matrix[y][x],
                matrix[x][y],
            ];
        }
    }

    if (direction > 0) {
        matrix.forEach(row => row.reverse());
    } else {
        matrix.reverse();
    }
}

function clearCanvas() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

function draw(arena, player) {
    clearCanvas();
    drawMatrix(arena, ORIGIN);
    drawMatrix(player.matrix, player.offset);
}

function drawMatrix(matrix, offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(
                    x + offset.x,
                    y + offset.y,
                    1, 1,
                );
            }
        });
    });
}

function generateDropTimer() {
    let dropCounter = 0;
    let dropInterval = 1000;
    let lastTime = 0;

    const playerDrop = (arena, player) => {
        player.offset.y++;

        if (collide(arena, player)) {
            player.offset.y--;
            merge(arena, player);
            player.offset.y = 0;
        }

        dropCounter = 0;
    };

    const playerMove = (arena, player, direction) => {
        player.offset.x += direction;

        if (collide(arena, player)) {
            player.offset.x -= direction;
        }
    };

    const playerRotate = (arena, player, direction) => {
        rotateMatrix(player.matrix, direction);
        const playerOffset = player.offset.x;
        let offset = 1;

        while (collide(arena, player)) {
            player.offset.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));

            if (offset > player.matrix[0].length) {
                rotateMatrix(player.matrix, -direction);
                player.offset.x = playerOffset;

                return;
            }
        }
    };

    return {
        drop: function (time, arena, player) {
            const deltaTime = time - lastTime;

            lastTime = time;
            dropCounter += deltaTime;

            if (dropCounter > dropInterval) {
                playerDrop(arena, player);
            }
        },
        playerDrop: playerDrop,
        playerMove: playerMove,
        playerRotate: playerRotate,
    };
}

function startGame() {
    const timedDrop = generateDropTimer();
    const arena = createArena(ARENA_WIDTH, ARENA_HEIGHT);

    const matrix = [
        [0, 0, 0],
        [1, 1, 1],
        [0, 1, 0],
    ];

    const player = {
        offset: {x: 5, y: 5},
        matrix: matrix,
    };

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                timedDrop.playerMove(arena, player, -1);
                break;
            case 'ArrowRight':
                timedDrop.playerMove(arena, player, +1);
                break;
            case 'ArrowDown':
                timedDrop.playerDrop(arena, player);
                break;
            case 'q':
            case 'Q':
                timedDrop.playerRotate(arena, player, -1);
                break;
            case 'e':
            case 'E':
                timedDrop.playerRotate(arena, player, +1);
                break;
        }
    });

    return function render(time = 0) {
        timedDrop.drop(time, arena, player);
        draw(arena, player);
        requestAnimationFrame(render);
    }
}

startGame()();
