((root) => {
    root.parseJsonMessage = (data) => {
        let message;
        let payload = null;

        try {
            ({message, payload} = JSON.parse(data));
        } catch (error) {
            message = data
            console.warn('Received non-JSON message:', message);
            console.info('Message will be used as is');
        }

        return {
            message,
            payload
        }
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
