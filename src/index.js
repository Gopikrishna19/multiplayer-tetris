const playerElements = document.querySelectorAll('.player');

[...playerElements].forEach(element => {
    const tetris = new Tetris(element);

    tetris.start();
})
