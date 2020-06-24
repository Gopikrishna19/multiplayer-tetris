class TetrisManager {
    #document;
    #instances;
    #keymaps;

    constructor(document, keymaps) {
        this.#document = document;
        this.#keymaps = keymaps;

        const playerElements = this.#document.querySelectorAll('.player');

        this.#instances = [...playerElements].map((element, index) => new Tetris(element, this.#keymaps[index]));
    }

    start() {
        this.#instances.forEach(instance => instance.start());
    }
}