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

const manager = new TetrisManager(document, keymaps);

manager.start();
