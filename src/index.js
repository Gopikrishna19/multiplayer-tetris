const tetrisManager = new TetrisManager(document);
const connectionManager = new ConnectionManager();

tetrisManager.createPlayer();
connectionManager.connect('ws://localhost:8081');
