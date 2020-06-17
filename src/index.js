const playerElements = document.querySelectorAll('.player');

const keymaps = [
    {
        drop: 's',
        moveLeft: 'a',
        moveRight: 'd',
        rotate: 'w'
    },
    {
        drop: 'ArrowDown',
        moveLeft: 'ArrowLeft',
        moveRight: 'ArrowRight',
        rotate: 'ArrowUp'
    }
];

playerElements.forEach((element, index) => {
    const tetris = new Tetris(element);

    tetris.start(keymaps[index]);
})
