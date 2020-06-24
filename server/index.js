const express = require('express');
const {Server: WebSocketServer} = require('ws');
const path = require('path');

const webServerPort = 8080;
const webServer = express();

webServer.use(express.static(path.join(__dirname, '..', 'src')));
webServer.listen(webServerPort, () => {
    console.log(`Web server listening at http://localhost:${webServerPort}`);
});

const webSocketServerPort = 8081;
const webSocketServer = new WebSocketServer({port: webSocketServerPort}, () => {
    console.log(`WebSocket server listening at http://localhost:${webSocketServerPort}`);
});

webSocketServer.on('connection', connection => {
    console.log('Connection established');

    connection.on('close', () => {
        console.log('Connection closed');
    })
});
