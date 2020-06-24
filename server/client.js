module.exports.Client = class Client {
    #connection;

    constructor(connection) {
        this.#connection = connection;
    }
};
