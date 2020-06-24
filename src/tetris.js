class Tetris {
    #canvas;
    #context;
    #keymap;

    #updateScore = (score) => {
        this.element.querySelector('.score').innerText = `Score: ${score}`;
    }

    constructor(element, keymap) {
        this.element = element;
        this.#keymap = keymap;
        this.#canvas = element.querySelector('.tetris');
        this.#context = this.#canvas.getContext('2d');

        this.setDimensions();
    }

    setDimensions = () => {
        this.#canvas.setAttribute('height', `${Game.HEIGHT}`);
        this.#canvas.setAttribute('width', `${Game.WIDTH}`);
        this.#context.scale(Game.SCALE, Game.SCALE);
    }

    start = () => {
        const arena = new Arena(Game.ARENA_WIDTH, Game.ARENA_HEIGHT);
        const player = new Player();
        const game = new Game(player, arena, this.#context);

        game.subscribeToKeyboardEvents(this.#keymap);

        player.onScore(this.#updateScore);
        player.reset(arena);

        let lastTime = 0;

        function render(time = 0) {
           const deltaTime = time - lastTime;
            lastTime = time;

            player.autoDrop(deltaTime, arena);
            game.draw(Game.WIDTH, Game.HEIGHT);

            requestAnimationFrame(render);
        }

        render();
    }
}
