((root) => {
    root.messages = {
        CREATE_SESSION: 'create-session',
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
