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
            let speedSlider = p5.createSlider(1, parseInt(length, 10), 1);
    
            resetButton.mousePressed(() => {reset(speedSlider)});
            sourceButton.mousePressed(() => selecting = "source");
            destButton.mousePressed(() => selecting = "dest");
            calcButton.mousePressed(() => {
                map.pathSpeed = speedSlider.value();
                path = solver.findOptimalPath(map);
                p5.redraw();
            })

            p5.noLoop();
        }

        const reset = (speedSlider) => {
            resetPath();
            map = new Map(length, numRows, cellSize, pathSpeed);
            map.generateCells();
            map.markCell(0, 0, "source");
            map.markCell(map.numCols - 1, 0, "dest");
            map.pathSpeed = speedSlider.value();
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
            <p>Try placing sources, destinations, and changing the speed of 
                the walkway to see how it affects the walkway's location.
            </p>
            <P5Wrapper sketch={sketch} />
        </div>
    )
}

export default OneDDemo
