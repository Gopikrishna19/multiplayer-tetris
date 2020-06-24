class ConnectionManager {
    connect(address) {
        this.connection = new WebSocket(address);

        this.connection.addEventListener('open', () => {
            console.info('Connection established');

            this.connection.send(window.messages.CREATE_SESSION);
        });

        this.connection.addEventListener('message', event => {
            let {message, payload} = window.parseJsonMessage(event.data);

            console.info('Received Message:', message, payload);
        });
    }
}
