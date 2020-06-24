class ConnectionManager {
    connect(address) {
        this.connection = new WebSocket(address);
    }
}
