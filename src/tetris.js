class Tetris {
    #canvas;
    #context;
    #keymap;
    #playerElement;

    #updateScore = (score) => {
        this.#playerElement.querySelector('.score').innerText = `Score: ${score}`;
    }

    constructor(playerElement, keymap) {
        this.#playerElement = playerElement;
        this.#keymap = keymap;
        this.#canvas = playerElement.querySelector('.tetris');
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
