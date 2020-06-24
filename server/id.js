module.exports.getIdGenerator = function* () {
    const pool = 'abcdefghjkmnpqrstwxyz123456789';
    while (true) {
        yield Array.from({length: 6})
            .map(() => pool[Math.random() * pool.length | 0])
            .join('');
    }
};
