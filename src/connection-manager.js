class ConnectionManager {
    connect(address) {
        this.connection = new WebSocket(address);

        this.connection.addEventListener('open', () => {
            console.info('Connection established');

            this.connection.send(window.messages.CREATE_SESSION);
        });

        this.connection.addEventListener('message', event => {
            let payload = null;
            let message;

            try {
                ({message, payload} = JSON.parse(event.data));
            } catch (error) {
                message = event.data
                console.warn('Received non-JSON message:', message);
                console.info('Message will be used as is');
            }

            console.info('Received Message:', message, payload);
        });
    }
}
