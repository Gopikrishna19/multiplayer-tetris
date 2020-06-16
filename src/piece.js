class Piece extends Array {
    static PIECES = {
        T: [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0],
        ],
        O: [
            [2, 2],
            [2, 2],
        ],
        L: [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3],
        ],
        J: [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0],
        ],
        S: [
            [0, 0, 0],
            [0, 5, 5],
            [5, 5, 0],
        ],
        Z: [
            [0, 0, 0],
            [6, 6, 0],
            [0, 6, 6],
        ],
        I: [
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
            [0, 7, 0, 0],
        ],
    };

    constructor() {
        super();

        const pieces = 'ILJOTSZ';
        const type = pieces[pieces.length * Math.random() | 0];

        const piece = Piece.PIECES[type];

        piece.forEach((row) => this.push([...row]));
    }

    rotate = (direction) => {
        for (let y = 0; y < this.length; y += 1) {
            for (let x = 0; x < y; x += 1) {
                [
                    this[x][y],
                    this[y][x],
                ] = [
                    this[y][x],
                    this[x][y],
                ];
            }
        }

        if (direction > 0) {
            this.forEach(row => row.reverse());
        } else {
            this.reverse();
        }
    }
}
