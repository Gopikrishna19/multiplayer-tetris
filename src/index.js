const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

const HEIGHT = 800;
const WIDTH = 480;
const SCALE = 40;
const ARENA_HEIGHT = HEIGHT / SCALE;
const ARENA_WIDTH = WIDTH / SCALE;
const ORIGIN = {
    x: 0,
    y: 0,
};
const COLORS = [
    null,
    'red',
    'blue',
    'violet',
    'green',
    'purple',
    'orange',
    'pink',
];

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

function sweepArena(arena) {
    for (let y = arena.length - 1; y >= 0; y -= 1) {
        if (arena[y].every(value => value !== 0)) {
            console.log('found fill');
            const row = arena.splice(y, 1)[0].fill(0);

            arena.unshift(row);

            y += 1;
        }
    }
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

function createPiece(type) {
    switch (type) {
        case 'T':
            return [
                [0, 0, 0],
                [1, 1, 1],
                [0, 1, 0],
            ];
        case 'O':
            return [
                [2, 2],
                [2, 2],
            ];
        case 'L':
            return [
                [0, 3, 0],
                [0, 3, 0],
                [0, 3, 3],
            ];
        case 'J':
            return [
                [0, 4, 0],
                [0, 4, 0],
                [4, 4, 0],
            ];
        case 'S':
            return [
                [0, 0, 0],
                [0, 5, 5],
                [5, 5, 0],
            ];
        case 'Z':
            return [
                [0, 0, 0],
                [6, 6, 0],
                [0, 6, 6],
            ];
        case 'I':
            return [
                [0, 7, 0, 0],
                [0, 7, 0, 0],
                [0, 7, 0, 0],
                [0, 7, 0, 0],
            ];
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
                context.fillStyle = COLORS[value];
                context.fillRect(
                    x + offset.x,
                    y + offset.y,
                    1, 1,
                );
            }
        });
    });
}

function generatePlayerController() {
    let dropCounter = 0;
    let dropInterval = 1000;
    let lastTime = 0;

    const playerReset = (arena, player) => {
        const pieces = 'ILJOTSZ';
        player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
        player.offset.y = 0;
        player.offset.x = (arena[0].length / 2 | 0) - (player.matrix[0].length / 2 | 0);

        if (collide(arena, player)) {
            arena.forEach(row => row.fill(0));
        }
    };

    const playerDrop = (arena, player) => {
        player.offset.y++;

        if (collide(arena, player)) {
            player.offset.y--;
            merge(arena, player);
            sweepArena(arena);
            playerReset(arena, player);
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
        autoDrop: function (time, arena, player) {
            const deltaTime = time - lastTime;

            lastTime = time;
            dropCounter += deltaTime;

            if (dropCounter > dropInterval) {
                playerDrop(arena, player);
            }
        },
        playerDrop: playerDrop,
        playerMove: playerMove,
        playerReset: playerReset,
        playerRotate: playerRotate,
    };
}

function startGame() {
    const controller = generatePlayerController();
    const arena = createArena(ARENA_WIDTH, ARENA_HEIGHT);

    const player = {
        offset: {}
    };

    controller.playerReset(arena, player);

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                controller.playerMove(arena, player, -1);
                break;
            case 'ArrowRight':
                controller.playerMove(arena, player, +1);
                break;
            case 'ArrowDown':
                controller.playerDrop(arena, player);
                break;
            case 'q':
            case 'Q':
                controller.playerRotate(arena, player, -1);
                break;
            case 'e':
            case 'E':
                controller.playerRotate(arena, player, +1);
                break;
        }
    });

    return function render(time = 0) {
        controller.autoDrop(time, arena, player);
        draw(arena, player);
        requestAnimationFrame(render);
    }
}

startGame()();
