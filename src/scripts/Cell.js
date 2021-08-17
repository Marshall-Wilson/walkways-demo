import Location from "./Location"

class Cell {
    constructor(col, row, cellSize) {
        this.location = new Location(col, row);
        this.cellSize = cellSize;
        this.source = false;
        this.dest = false;
        this.walkway = false;
    }

    get col() {
        return this.location.col;
    }

    get row() {
        return this.location.row;
    }

    mark(type) {
        this.reset();
        if (type === "source") {
            this.reset();
            this.source = true;
        } else if (type === "dest") {
            this.reset();
            this.dest = true;
        } else if (type === "walkway") {
            this.walkway = true;
        } else {
            this.reset();
        }
    }

    reset() {
        this.source = false;
        this.dest = false;
        this.walkway = false;
    }

    drawCell(p5) {
        if (this.source) {
            p5.fill(122, 191, 122);
        } else if (this.dest) {
            p5.fill(191, 122, 122)
        } else if (this.walkway) {
            p5.fill(191, 122, 191);
        } else {
            p5.fill(122, 140, 191);
        }
        p5.strokeWeight(1);
        p5.stroke(51);
        p5.rect(this.col * this.cellSize,
            this.row * this.cellSize,
            this.cellSize,
            this.cellSize);
    }
}

export default Cell