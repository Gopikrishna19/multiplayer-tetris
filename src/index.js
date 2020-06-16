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
    drawMatrix(player.piece, player.offset);
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
    const arena = new Arena(ARENA_WIDTH, ARENA_HEIGHT);
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
