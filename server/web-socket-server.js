const {Session} = require('./session');
const {Client} = require('./client');
const {Server} = require('ws');

const port = 8081;
const server = new Server({port}, () => {
    console.info(`WebSocket server listening at http://localhost:${port}`);
});

server.on('connection', connection => {
    console.info('Connection established');

    const client = new Client(connection);

    connection.on('message', message => {
        console.info('Message received:', message);

        switch (message) {
            case global.messages.CREATE_SESSION:
                const session = new Session();
                console.info('Session created');

                session.join(client);
                console.info(Session.sessions);
        }
    });

    connection.on('close', () => {
        console.info('Connection closed');

        const session = client.session;

        if (session) {
            session.leave(client);

            if (!session.hasClients()) {
                Session.sessions.delete(session.id);
                console.info('Session deleted');
            } else {
                console.info(Session.sessions);
            }
        }
    });
});
