import Path from "./Path"
import Location from "./Location"

class Solver {
    constructor() {
        this.interval = null;
    }

    findOptimalPath = map => {
        let tempPath = new Path();
        let minDist = map.numCells;
        let minPath = new Path();

        //for each pair of cells, calculate the travel radius and update min
        map.cells.forEach(startCol => {
            startCol.forEach(startCell => {
                map.cells.forEach(endCol => {
                    endCol.forEach(endCell => {
                        let start = new Location(startCell.col, startCell.row);
                        let end = new Location(endCell.col, endCell.row)
                        tempPath = new Path(start, end, null, null, null, 0, map.cellSize, "purple");
                        tempPath.radius = this.findRadius(map, tempPath);
                        if (tempPath.radius < minDist) {
                            minDist = tempPath.radius;
                            minPath = tempPath;
                        }
                    })
                })
            })
        })
        return minPath;
    }

    findAnglePath = (map, slope) => {
        let tempPath = new Path();
        let minDist = map.numCells;
        let minPath = new Path();

        //for each pair of cells, calculate the travel radius and update min
        map.cells.forEach(startCol => {
            startCol.forEach(startCell => {
                map.cells.forEach(endCol => {
                    endCol.forEach(endCell => {
                        if (this.inRange(startCell, endCell, slope, map.cellSize)) {
                            let start = new Location(startCell.col, startCell.row);
                            let end = new Location(endCell.col, endCell.row)
                            tempPath = new Path(start, end, null, null, null, 0, map.cellSize, "purple");
                            tempPath.radius = this.findRadius(map, tempPath);
                            if (tempPath.radius < minDist) {
                                minDist = tempPath.radius;
                                minPath = tempPath;
                            }
                        }
                    })
                })
            })
        })
        return minPath;
    }

    approxOptimalPath = (map, p5, numAngles) => {
        let realPath = this.findOptimalPath(map);
        let approxPath = new Path();
        approxPath.radius = 1000;
        let counter = { i: 0 };
        for (let i = 0; i < numAngles; i++) {
            let anglePath = this.findAnglePath(map, i * 2 * Math.PI / numAngles);
            anglePath.color = "blue";
            if (anglePath.radius < approxPath.radius) {
                approxPath = anglePath;
            }
        }
        approxPath.color = "red";
        this.interval = setInterval(this.frame, 10000 / numAngles, map, p5, numAngles, counter);
        return [realPath, approxPath];
    }

    frame = (map, p5, numAngles, counter) => {
        if (counter.i == numAngles) {
            clearInterval(this.interval);
        } else {
            p5.redraw();
            let angle = counter.i * 2 * Math.PI / numAngles;
            let anglePath = this.findAnglePath(map, angle);
            anglePath.color = "blue";
            anglePath.drawPath(p5);
            p5.fill("black");
            p5.textSize(20);
            p5.strokeWeight(0);
            p5.text(angle.toPrecision(3), 0, 4 * map.cellSize / 3);
            p5.strokeWeight(4);
            p5.translate(3 * map.cellSize, map.cellSize);
            p5.rotate(angle);
            p5.line(0, 0, map.cellSize, 0);
            p5.rotate(-1 * angle);
            p5.translate(-3 * map.cellSize, -1 * map.cellSize);
            counter.i += 1
        }
    }

    findRadius = (map, path) => {
        let maxRadius = 0;
        map.cells.forEach(startCol => {
            startCol.forEach(startCell => {
                if (startCell.source) {
                    map.cells.forEach(endCol => {
                        endCol.forEach(endCell => {
                            if (endCell.dest) {
                                let travelTime = this.findTravelTime(startCell, endCell, path, map);
                                if (travelTime > maxRadius) {
                                    maxRadius = travelTime;
                                    path.radius = travelTime;
                                    path.radSource = startCell.location;
                                    path.radDest = endCell.location;
                                }
                            }
                        })
                    })
                }
            })
        })

        return maxRadius;
    }

    findTravelTime = (source, dest, path, map) => {
        let pathTime = this.calcPathTime(map, path);
        let noPath = Math.sqrt((source.col - dest.col) ** 2 + (source.row - dest.row) ** 2);
        let usePathOne =
            Math.sqrt((source.col - path.start.col) ** 2 + (source.row - path.start.row) ** 2) +
            pathTime +
            Math.sqrt((path.stop.col - dest.col) ** 2 + (path.stop.row - dest.row) ** 2);
        let usePathTwo =
            Math.sqrt((source.col - path.stop.col) ** 2 + (source.row - path.stop.row) ** 2) +
            pathTime +
            Math.sqrt((path.start.col - dest.col) ** 2 + (path.stop.row - dest.row) ** 2);
        if (noPath < usePathOne && noPath < usePathTwo) {
            path.usesPath = false;
        } else {
            path.usesPath = true;
        }
        return Math.min(noPath, usePathOne, usePathTwo);
    }

    calcPathTime = (map, path) => {
        return Math.sqrt((path.start.col - path.stop.col) ** 2 + (path.start.row - path.stop.row) ** 2) / map.pathSpeed;
    }

    // return whether the endpoint of a possible path falls within one cell 
    // length of the desired slope
    inRange = (start, stop, idealSlope, cellSize) => {
        //calculate slope of possible path
        let pathSlope;
        if (start.col === stop.col) {
            if (start.row === stop.row) {
                return true;
            } else if (start.row < stop.row) {
                pathSlope = Math.PI / 2;
            } else {
                pathSlope = 3 * Math.PI / 2;
            }
        } else {
            pathSlope = Math.asin((stop.row - start.row) / (stop.col - start.col));
        }

        //calculate path length
        let dist = Math.sqrt((start.col - stop.col) ** 2 + (start.row - stop.row) ** 2);

        //calculate deviation from ideal slope at 90 degrees
        let diff = Math.abs(dist * Math.sin(pathSlope - idealSlope));
        return diff <= 1;
    }
}


export default Solver