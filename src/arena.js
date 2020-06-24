class Arena extends Array {
    constructor(width, height) {
        super();

        let h = height;

        while (h--) {
            this.push(new Array(width).fill(0));
        }
    }

    clear = () => {
        this.forEach(row => row.fill(0));
    }

    isColliding = (player) => {
        return player.piece.some((row, y) => {
            return row.some((value, x) => {
                return value !== 0 && (this[y + player.offset.y] && this[y + player.offset.y][x + player.offset.x]) !== 0;
            });
        });
    }


    merge = (player) => {
        player.piece.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    this[y + player.offset.y][x + player.offset.x] = value;
                }
            });
        });
    };

    sweepAndScore = () => {
        let score = 0;

        for (let y = this.length - 1, rowCount = 1; y >= 0; y -= 1) {
            if (this[y].every(value => value !== 0)) {
                const row = this.splice(y, 1)[0].fill(0);

                this.unshift(row);

                y += 1;
                score += rowCount * 10;
                rowCount *= 2;
            }
        }

        return score;
    };
}
