class ConnectionManager {
    connect(address) {
        this.connection = new WebSocket(address);
        this.connection.addEventListener('open', () => {
            console.log('Connection established');

            this.connection.send('create-session');
        })
    }
}
