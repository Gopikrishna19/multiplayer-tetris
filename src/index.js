const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

const HEIGHT = 400;
const WIDTH = 240;
const SCALE = 20;

canvas.setAttribute('height', `${HEIGHT}`);
canvas.setAttribute('width', `${WIDTH}`);

context.scale(SCALE, SCALE);

context.fillStyle = '#000';
context.fillRect(0, 0, WIDTH, HEIGHT);

const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];

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

const player = {
    offset: {x: 5, y: 5},
    matrix: matrix,
};

drawMatrix(player.matrix, player.offset);