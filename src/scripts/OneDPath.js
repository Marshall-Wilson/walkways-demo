import Location from "./Location"

const defLoc = new Location(0, 0)

class OneDPath {
    constructor(start = defLoc, stop = defLoc,
        r1 = defLoc, s1 = defLoc,
        r2 = defLoc, s2 = defLoc,
        radius = 0, cellSize = 0, color = "purple") {

        this.start = start;
        this.stop = stop;
        this.radius = radius;
        this.r1 = r1;
        this.s1 = s1;
        this.r2 = r2;
        this.s2 = s2;
        this.cellSize = cellSize
        this.color = color
    }

    drawPath(p5) {
        p5.stroke(this.color);
        p5.strokeWeight(10);
        p5.line((this.start.col * this.cellSize) + this.cellSize / 2,
            (this.start.row * this.cellSize) + this.cellSize / 2,
            (this.stop.col * this.cellSize) + this.cellSize / 2,
            (this.stop.row * this.cellSize) + this.cellSize / 2
        );

        console.log("s1:", this.s1.col, "r1:", this.r1.col, "s2:", this.s2.col, "r2:", this.r2.col, "start:", this.start.col, "stop:", this.stop.col);
        p5.strokeWeight(0);
        p5.textSize(16);
        p5.fill("orangered");
        p5.circle((this.s1.col * this.cellSize) + this.cellSize / 2, this.cellSize / 2, 5);
        p5.text('s1', (this.s1.col * this.cellSize) - this.cellSize / 2 - 5, 2 * this.cellSize);
        p5.circle((this.s2.col * this.cellSize) + this.cellSize / 2, this.cellSize / 2, 5);
        p5.text('s2', (this.s2.col * this.cellSize), 2 * this.cellSize);

        p5.fill("green");
        p5.circle((this.r1.col * this.cellSize) + this.cellSize / 2, this.cellSize / 2, 5);
        p5.text('r1', (this.r1.col * this.cellSize), 2 * this.cellSize);
        p5.circle((this.r2.col * this.cellSize) + this.cellSize / 2, this.cellSize / 2, 5);
        p5.text('r2', (this.r2.col * this.cellSize) + this.cellSize / 2 + 5, 2 * this.cellSize);
    }
}

export default OneDPath