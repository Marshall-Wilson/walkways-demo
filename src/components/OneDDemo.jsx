import React from 'react'
import Map from '../scripts/Map'
import P5Wrapper from "react-p5-wrapper";
import OneDSolver from '../scripts/OneDSolver';


const OneDDemo = ({length}) => {
    const sketch = p5 => {
        const canvasSize = 800;
        const numRows = 1;
        const cellSize = canvasSize / length;
    
        let selecting = "source"; //source, dest, or erase
        let pathSpeed = 2;
        let map = null;
        let path = null;
        let solver = new OneDSolver();
        
        p5.setup = () => {
            p5.createCanvas(canvasSize, 2*cellSize);
            map = new Map(parseInt(length, 10), numRows, cellSize, pathSpeed);
            map.generateCells();
            map.markCell(0, 0, "source");
            map.markCell(map.numCols - 1, 0, "dest");
    
            let sourceButton = p5.createButton("Select Sources");
            let destButton = p5.createButton("Select Destinations");
            let calcButton = p5.createButton("Calculate Path");
            let resetButton = p5.createButton("Reset"); 
            let speedSelect = p5.createSelect(false);
            for (let i = 2; i <= map.numCols; i++){
                speedSelect.option("Path Speed: " + i,i);
            }
            speedSelect.selected(2);

    
            resetButton.mousePressed(() => {reset(speedSelect)});
            sourceButton.mousePressed(() => selecting = "source");
            destButton.mousePressed(() => selecting = "dest");
            calcButton.mousePressed(() => {
                map.pathSpeed = speedSelect.value();
                path = solver.findOptimalPath(map);
                p5.redraw();
            })

            p5.noLoop();
        }

        const reset = (speedSelect) => {
            resetPath();
            selecting = "source";
            map = new Map(length, numRows, cellSize, pathSpeed);
            map.generateCells();
            map.markCell(0, 0, "source");
            map.markCell(map.numCols - 1, 0, "dest");
            map.pathSpeed = speedSelect.value();
        }
    
        p5.mouseClicked = () => {
            let col = (Math.floor(p5.mouseX / cellSize));
            let row = (Math.floor(p5.mouseY / cellSize));
            if (legalCell(col, selecting) && row === 0) {
                resetPath();
                map.markCell(col, row, selecting);
            }
            p5.redraw();
        }

        p5.draw = () => {
            p5.background(255);
            map.drawMap(p5);
            if (path !== null) {
                path.drawPath(p5);
            } else {
                p5.fill("black");
                p5.textSize(18);
                p5.text("0", 0, 2 * map.cellSize - 5);
                p5.text("1", canvasSize - map.cellSize/2, 2 * map.cellSize - 5);
                p5.textSize(16);
                let a = ((1 - (map.pathSpeed/(2 * map.pathSpeed - 1)))/ 2);
                let b = ((1 + (map.pathSpeed/(2 * map.pathSpeed - 1)))/ 2);
                //p5.circle(map.cellSize * map.numCols * a + map.cellSize/2, map.cellSize/2, 5);
                //p5.text("v / (2v - 1)",map.cellSize * map.numCols * a - map.cellSize, map.cellSize * 2  - 5)
                //p5.circle(map.cellSize * map.numCols * b + map.cellSize/2, map.cellSize/2, 5);
                
            }
        }
        
        const legalCell = (cellCol, selecting) => {
            if (selecting === "source") {
                return map.cells.find(otherCol => otherCol[0].dest && otherCol[0].col < cellCol) === undefined;
            }
            if (selecting === "dest") {
                return map.cells.find(otherCol => otherCol[0].source && otherCol[0].col > cellCol) === undefined;
            }
        }
    
        const resetPath = () => {
            if (path !== null) {
                path = null;
            }
        }    
    }
    
    return (
        <div>
            <h2>Try It Out</h2>
            <p>Try it out for yourself by placing sources, destinations, 
                and changing the speed of the walkway to see how it affects the 
                walkway's location and the locations of r1, s1, r2, and s2.
            </p>
            <P5Wrapper sketch={sketch} />
        </div>
    )
}

export default OneDDemo
