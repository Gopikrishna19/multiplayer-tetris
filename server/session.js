const {getIdGenerator} = require('./id');

module.exports.Session = class Session {
    static sessions = new Map();
    static idGenerator = getIdGenerator();

    constructor() {
        this.id = Session.idGenerator.next().value;

        Session.sessions.set(this.id, this);
    }
}
