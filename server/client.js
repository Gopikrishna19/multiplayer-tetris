module.exports.Client = class Client {
    #connection;

    constructor(connection) {
        this.#connection = connection;
    }

    send(message) {
        console.info('Sending message:', message);

        this.#connection.send(JSON.stringify(message), err => {
            if (err) {
                console.error('Message failed:', message);
                console.error(err);
            }
        });
    }
};
