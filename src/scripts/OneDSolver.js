import OneDPath from "./OneDPath"
import Location from "./Location"

class OneDSolver {

    findOptimalPath = map => {
        const limit = map.pathSpeed / (2 * map.pathSpeed - 1);
        // s is smallest destination that used walkway
        // r is largest source that uses walkway

        let r1 = new Location(0, 0);
        let s2 = new Location(map.numCols - 1, 0);
        map.cells.forEach(col => {
            col.forEach(cell => {
                if (cell.col <= (1 - limit) * (map.numCols - 1) && cell.col > r1.col && cell.source) { // r1
                    r1.col = cell.col;
                    console.log("r1 swapped", r1.col);
                }
                if (cell.col >= limit * (map.numCols - 1) && cell.col < s2.col && cell.dest) { // s2
                    s2.col = cell.col;
                }
            });
        });
        let scaledr1 = r1.col / (map.numCols - 1);
        let scaleds2 = s2.col / (map.numCols - 1);
        const s1Limit = (scaledr1 * (map.pathSpeed - 1) + map.pathSpeed + 1) / (3 * map.pathSpeed - 1) * (map.numCols - 1);
        const r2Limit = ((((map.numCols - 1) - map.pathSpeed) * (s2.col / (map.numCols - 1) + 1)) / ((map.numCols - 1) - 3 * map.pathSpeed)) * (map.numCols - 1);
        let s1 = new Location(map.numCols - 1, 0);
        let r2 = new Location(0, 0);
        console.log(s1Limit, r2Limit, limit, map.pathSpeed);
        map.cells.forEach(col => {
            col.forEach(cell => {
                if (cell.col <= r2Limit && cell.col > r2.col && cell.source) { // r2
                    r2.col = cell.col;
                }
                if (cell.col >= s1Limit && cell.col < s1.col && cell.dest) { // s1
                    s1.col = cell.col;
                }
            });
        });
        let path1 = new OneDPath(new Location(r1.col / 2, 0), new Location((s1.col + map.numCols - 1) / 2, 0), r1, s1, r2, s2, 10, map.cellSize, "purple");
        let path2 = new OneDPath(new Location(r2.col / 2, 0), new Location((s2.col + map.numCols - 1) / 2, 0), r1, s1, r2, s2, 10, map.cellSize, "purple");
        console.log(path1, path2);
        console.log(s1, s2, map.numCols, s1.col, s2.col, (s1.col + map.numCols - 1) / 2, (s2.col + map.numCols - 1) / 2)
        if (this.computeDistance(map, r1, s1, path1) >= this.computeDistance(map, r2, s2, path2)) {
            return path1;
        } else {
            return path2;
        }
    }

    computeDistance = (map, r, s, path) => {
        return Math.max(
            Math.min( // 0 to 1
                path.start.col + (path.stop.col - path.start.col) / map.pathSpeed + (map.numCols - 1 - path.stop.col),
                map.numCols - 1
            ),
            Math.min( // 0 to s
                path.start.col + (path.stop.col - path.start.col) / map.pathSpeed + Math.abs(path.stop.col - s.col),
                s.col
            ),
            Math.min( // r to 1
                Math.abs(path.start.col - r.col) + (path.stop.col - path.start.col) / map.pathSpeed + (map.numCols - 1 - path.stop.col),
                Math.abs(map.numCols - 1 - r.col)
            ),
            Math.min( // r to s
                Math.abs(path.start.col - r.col) + (path.stop.col - path.start.col) / map.pathSpeed + Math.abs(path.stop.col - s.col),
                Math.abs(s.col - r.col)
            )
        );
    }


}
export default OneDSolver