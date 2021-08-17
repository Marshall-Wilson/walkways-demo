import Location from "./Location"

const defLoc = new Location(0, 0)

class Path {

    constructor(start = defLoc, stop = defLoc,
        radSource = defLoc, radDest = defLoc,
        usesPath = true,
        radius = 0, cellSize = 0, color = "purple") {

        this.start = start;
        this.stop = stop;
        this.radius = radius;
        this.radSource = radSource;
        this.radDest = radDest;
        this.usesPath = usesPath;
        this.cellSize = cellSize
        this.color = color
    }

    drawPath(p5) {
        p5.stroke(this.color);
        p5.strokeWeight(20);
        p5.line((this.start.col * this.cellSize) + this.cellSize / 2,
            (this.start.row * this.cellSize) + this.cellSize / 2,
            (this.stop.col * this.cellSize) + this.cellSize / 2,
            (this.stop.row * this.cellSize) + this.cellSize / 2
        );
    }

    drawRadius(p5) {
        p5.stroke(255, 0, 0);
        p5.strokeWeight(10);

        //line if path is used
        if (this.usesPath) {
            //source to path start
            p5.line((this.radSource.col * this.cellSize) + this.cellSize / 2,
                (this.radSource.row * this.cellSize) + this.cellSize / 2,
                (this.start.col * this.cellSize) + this.cellSize / 2,
                (this.start.row * this.cellSize) + this.cellSize / 2
            );

            //path start to path end
            p5.line((this.start.col * this.cellSize) + this.cellSize / 2,
                (this.start.row * this.cellSize) + this.cellSize / 2,
                (this.stop.col * this.cellSize) + this.cellSize / 2,
                (this.stop.row * this.cellSize) + this.cellSize / 2
            );

            //path end to destination
            p5.line((this.stop.col * this.cellSize) + this.cellSize / 2,
                (this.stop.row * this.cellSize) + this.cellSize / 2,
                (this.radDest.col * this.cellSize) + this.cellSize / 2,
                (this.radDest.row * this.cellSize) + this.cellSize / 2
            );

            // Line if path isn't used
        } else {
            p5.line((this.radSource.col * this.cellSize) + this.cellSize / 2,
                (this.radSource.row * this.cellSize) + this.cellSize / 2,
                (this.radDest.col * this.cellSize) + this.cellSize / 2,
                (this.radDest.row * this.cellSize) + this.cellSize / 2
            );
        }
    }

}

export default Path