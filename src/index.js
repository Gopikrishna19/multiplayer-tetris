function startGame() {
    const HEIGHT = 400;
    const WIDTH = 240;
    const SCALE = HEIGHT / 20;
    const ARENA_HEIGHT = HEIGHT / SCALE;
    const ARENA_WIDTH = WIDTH / SCALE;

    const canvas = document.getElementById('tetris');
    const context = canvas.getContext('2d');

    canvas.setAttribute('height', `${HEIGHT}`);
    canvas.setAttribute('width', `${WIDTH}`);
    context.scale(SCALE, SCALE);

    const arena = new Arena(ARENA_WIDTH, ARENA_HEIGHT);
    const player = new Player();
    const game = new Game(player, arena, context);

    game.subscribeToKeyboardEvents();

    player.onScore(game.updateScore);
    player.reset(arena);

    let lastTime = 0;

    return function render(time = 0) {
        const deltaTime = time - lastTime;
        lastTime = time;

        player.autoDrop(deltaTime, arena);
        game.draw(WIDTH, HEIGHT);

        requestAnimationFrame(render);
    };
}

startGame()();
