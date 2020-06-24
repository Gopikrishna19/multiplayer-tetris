class TetrisManager {
    #document;
    #instances = [];
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

        this.#instances.push(tetris);
        this.#document.body.appendChild(element);

        tetris.start();

        return tetris;
    }
}
