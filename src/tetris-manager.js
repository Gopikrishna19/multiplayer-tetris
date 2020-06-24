class TetrisManager {
    #document;
    #instances = new Set();
    #template;

    constructor(document) {
        this.#document = document;
        this.#template = document.getElementById('player-template');
    }

    createPlayer() {
        const element = this.#document.importNode(this.#template.content, true).children[0];
        const tetris = new Tetris(element, {
            drop: 'ArrowDown',
            moveLeft: 'ArrowLeft',
            moveRight: 'ArrowRight',
            rotate: 'ArrowUp',
        });

        this.#instances.add(tetris);
        this.#document.body.appendChild(tetris.element);

        tetris.start();

        return tetris;
    }

    removePlayer(tetris) {
        this.#instances.delete(tetris);
        this.#document.body.removeChild(tetris.element);
    }
}
