function startGame() {
    const canvas = document.getElementById('tetris');
    const context = canvas.getContext('2d');

    canvas.setAttribute('height', `${Game.HEIGHT}`);
    canvas.setAttribute('width', `${Game.WIDTH}`);
    context.scale(Game.SCALE, Game.SCALE);

    const arena = new Arena(Game.ARENA_WIDTH, Game.ARENA_HEIGHT);
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
        game.draw(Game.WIDTH, Game.HEIGHT);

        requestAnimationFrame(render);
    };
}

startGame()();
