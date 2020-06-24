const express = require('express');
const {Server: WebSocketServer} = require('ws');
const path = require('path');

const webServerPort = 8080;
const webServer = express();

webServer.use(express.static(path.join(__dirname, '..', 'src')));
webServer.listen(webServerPort, () => {
    console.info(`Web server listening at http://localhost:${webServerPort}`);
});

const webSocketServerPort = 8081;
const webSocketServer = new WebSocketServer({port: webSocketServerPort}, () => {
    console.info(`WebSocket server listening at http://localhost:${webSocketServerPort}`);
});
const sessions = new Map();

class Session {
    constructor(id) {
        this.id = id;
    }
}

function* getIdGenerator() {
    const pool = 'abcdefghjkmnpqrstwxyz123456789';
    while (true) {
        yield Array.from({length: 6})
            .map(() => pool[Math.random() * pool.length | 0])
            .join('');
    }
}

const idGenerator = getIdGenerator();

webSocketServer.on('connection', connection => {
    console.info('Connection established');

    connection.on('message', message => {
        console.info('Message received:', message);

        switch (message) {
            case 'create-session':
                const session = new Session(idGenerator.next().value);
                sessions.set(session.id, session);

                console.info(sessions);
        }
    });

    connection.on('close', () => {
        console.info('Connection closed');
    });
});
