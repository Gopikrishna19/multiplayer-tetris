const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

const HEIGHT = 400;
const WIDTH = 240;
const SCALE = 20;

canvas.setAttribute('height', `${HEIGHT}`);
canvas.setAttribute('width', `${WIDTH}`);

context.scale(SCALE, SCALE);

const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

const player = {
    offset: {x: 5, y: 5},
    matrix: matrix,
};

function clearCanvas() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

function draw() {
    clearCanvas();
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

    return {
        drop: function (time) {
            const deltaTime = time - lastTime;

            lastTime = time;
            dropCounter += deltaTime;

            if (dropCounter > dropInterval) {
                player.offset.y += 1;
                dropCounter = 0;
            }
        },
        set dropCounter(value) {
            dropCounter = value;
        },
    };
}

const timedDrop = generateDropTimer();

function render(time = 0) {
    timedDrop.drop(time);
    draw();
    requestAnimationFrame(render);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            player.offset.x -= 1;
            break;
        case 'ArrowRight':
            player.offset.x += 1;
            break;
        case 'ArrowDown':
            player.offset.y += 1;
            timedDrop.dropCounter = 0;
            break;
    }
});

render();
