((root) => {
    root.messages = {
        CREATE_SESSION: 'create-session',
        SESSION_ID: 'session-id',
    };
})((() => {
    let root = {};
    if (typeof global !== 'undefined') {
        root = global;
    } else if (typeof window !== 'undefined') {
        root = window;
    }
    return root;
})());
