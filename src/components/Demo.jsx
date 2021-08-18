import React from 'react'
import Sketch from 'react-p5'
import Map from '../scripts/Map'
import Solver from '../scripts/Solver'
import Path from '../scripts/Path'


const Demo = ({ numCols, numRows }) => {

    const canvasSize = 600;
    const cellSize = canvasSize / numCols;
    let selecting = "source"; //source, dest, or erase
    let map = new Map(0, 0, 0);
    let path = null;
    let approxPath = null;
    let pathSpeed = 2;
    let solver = new Solver();

    const makePath = p5 => {
        resetPath();
        path = solver.findOptimalPath(map);
        p5.redraw();
    }

    const resetPath = () => {
        if (path !== null) {
            path = null;
        }
        if (approxPath !== null) {
            approxPath = null;
        }
    }

    const setup = (p5, canvasParentRef) => {
        let cnv = p5.createCanvas(canvasSize, numRows * cellSize).parent(canvasParentRef);

        let sourceButton = p5.createButton("Select Sources");
        let destButton = p5.createButton("Select Destinations");
        let eraseButton = p5.createButton("Erase");
        let resetButton = p5.createButton("Reset");
        let calcButton = p5.createButton("Calculate Path");
        let angleSelect = p5.createSelect(false);
        for (let i = 1; i <= 20; i++){
            angleSelect.option("# of angles: " + i,i);
        }
        angleSelect.selected(8);
        let speedSelect = p5.createSelect(false);
        for (let i = 2; i <= 40; i++){
            speedSelect.option("Path Speed: " + i,i);
        }
        speedSelect.selected(2);


        sourceButton.mousePressed(() => { selecting = "source" });
        destButton.mousePressed(() => { selecting = "dest" });
        eraseButton.mousePressed(() => { selecting = "erase" });
        calcButton.mousePressed(() => {
            resetPath();
            let tempPath = null;
            let tempApprox = null;
            map.pathSpeed = speedSelect.value();
            [tempPath, tempApprox] = solver.approxOptimalPath(map, p5, angleSelect.value());
            setTimeout(() => {
                path = tempPath;
                approxPath = tempApprox;
                p5.redraw();
            }, 12000);
        });

        resetButton.mousePressed(() => {
            map = new Map(numCols, numRows, cellSize, pathSpeed);
            resetPath();
            p5.redraw();
        });

        map = new Map(numCols, numRows, cellSize, pathSpeed);
        map.generateCells();
        p5.noLoop();

        cnv.mouseClicked(() => {
            resetPath();
            let col = (Math.floor(p5.mouseX / cellSize));
            let row = (Math.floor(p5.mouseY / cellSize));
            map.markCell(col, row, selecting);
            p5.redraw();
        });
    }

    const draw = (p5) => {
        p5.background(0);
        map.drawMap(p5);
        if (path !== null) {
            path.drawPath(p5);
            p5.fill("purple");
            p5.stroke("purple");
            p5.strokeWeight(8);
            p5.line(map.cellSize * 17, map.cellSize / 2, map.cellSize * 19, map.cellSize / 2);
            p5.strokeWeight(0);
            p5.textSize(16);
            p5.text("True Optimal Path", map.cellSize * 12, 2 * map.cellSize / 3);
        
        }
        if (approxPath !== null) {
            approxPath.drawPath(p5);
            p5.fill("red");
            p5.stroke("red");
            p5.strokeWeight(8);
            p5.line(map.cellSize * 17, 3* map.cellSize / 2, map.cellSize * 19, 3 *map.cellSize / 2);
            p5.strokeWeight(0);
            p5.textSize(16);
            p5.text("Approximated Path", map.cellSize * 12, 5 * map.cellSize / 3);
        }
    }

    return ( 
        <div>
        <h2> Try It Out </h2> 
        <p> 
            Try seeing how the blue walkways for the various angles 
            differ from the approximately optimal walkway in red and the 
            true optimal walkway in purple for different numbers of angles. 
        </p>
        <Sketch setup = { setup } draw = { draw }/> 
        </div>
    )
}

export default Demo