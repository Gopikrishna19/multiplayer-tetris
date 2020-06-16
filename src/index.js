const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

const HEIGHT = 400;
const WIDTH = 240;
const SCALE = HEIGHT / 20;
const ARENA_HEIGHT = HEIGHT / SCALE;
const ARENA_WIDTH = WIDTH / SCALE;
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

function sweepArena(arena, player) {
    for (let y = arena.length - 1, rowCount = 1; y >= 0; y -= 1) {
        if (arena[y].every(value => value !== 0)) {
            console.log('found fill');
            const row = arena.splice(y, 1)[0].fill(0);

            arena.unshift(row);

            y += 1;
            player.score += rowCount * 10;
            rowCount *= 2;
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

function clearCanvas() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

function updateScore(player) {
    document.getElementById('score').innerText = `Score: ${player.score}`;
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

function startGame() {
    const arena = createArena(ARENA_WIDTH, ARENA_HEIGHT);

    const player = new Player();

    player.reset(arena);

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                player.move(arena, -1);
                break;
            case 'ArrowRight':
                player.move(arena, +1);
                break;
            case 'ArrowDown':
                player.drop(arena);
                break;
            case 'q':
            case 'Q':
            case 'ArrowUp':
                player.rotate(arena, -1);
                break;
            case 'e':
            case 'E':
                player.rotate(arena, +1);
                break;
        }
    });

    let lastTime = 0;

    return function render(time = 0) {
        const deltaTime = time - lastTime;

        lastTime = time;
        player.autoDrop(deltaTime, arena);

        draw(arena, player);
        requestAnimationFrame(render);
    };
}

startGame()();
