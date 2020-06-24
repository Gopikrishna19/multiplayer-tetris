const {Session} = require('./session');
const {Server: WebSocketServer} = require('ws');

const port = 8081;
const server = new WebSocketServer({port}, () => {
    console.info(`WebSocket server listening at http://localhost:${port}`);
});

server.on('connection', connection => {
    console.info('Connection established');

    connection.on('message', message => {
        console.info('Message received:', message);

        switch (message) {
            case 'create-session':
                const session = new Session();

                console.info(Session.sessions);
        }
    });

    connection.on('close', () => {
        console.info('Connection closed');
    });
});
