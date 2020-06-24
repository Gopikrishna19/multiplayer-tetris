const {getIdGenerator} = require('./id');

module.exports.Session = class Session {
    #clients = new Set();

    static sessions = new Map();
    static idGenerator = getIdGenerator();

    constructor() {
        this.id = Session.idGenerator.next().value;

        Session.sessions.set(this.id, this);
    }

    hasClients() {
        return this.#clients.size > 0;
    }

    join(client) {
        if (client.session) {
            throw new Error('Client already in session');
        }

        this.#clients.add(client);
        client.session = this;
    }

    leave(client) {
        if (client.session !== this) {
            throw new Error('Client not in session');
        }

        this.#clients.delete(client)
        client.session = null;
    }
}
