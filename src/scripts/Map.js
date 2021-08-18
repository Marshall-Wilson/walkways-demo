import Cell from './Cell'

class Map {
    constructor(numCols, numRows, cellSize, pathSpeed) {
        this.numCols = parseInt(numCols, 10);
        this.numRows = numRows;
        this.numCells = numCols * numRows;
        this.cellSize = cellSize;
        this.cells = this.generateCells();
        this.pathSpeed = pathSpeed;
    }

    generateCells() {
        let cells = [];
        for (let i = 0; i < this.numCols; i++) {
            cells.push([]);
            for (let j = 0; j < this.numRows; j++) {
                cells[i].push(new Cell(i, j, this.cellSize));
            }
        }
        return cells;
    }

    drawMap(p5) {
        this.cells.forEach(col => {
            col.forEach(cell => {
                cell.drawCell(p5);
            });
        });
    }

    markCell(col, row, type) {
        if (col < this.numCols && row < this.numRows) {
            this.cells[col][row].mark(type);
        }
    }

}

export default Map