function getPieceCreator() {
    const PIECES = {
        'T': [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ],
        'O': [
            [2, 2],
            [2, 2],
        ],
        'L': [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ],
        'J': [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ],
        'S': [
            [0, 0, 0],
            [0, 5, 5],
            [5, 5, 0],
        ],
        'Z': [
            [0, 0, 0],
            [6, 6, 0],
            [0, 6, 6],
        ],
        'I': [
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
        ],
    };

    return function (type) {
        return PIECES[type];
    };
}

const createPiece = getPieceCreator();