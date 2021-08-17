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
        let eraseButton = p5.createButton("Erase Cells");
        let calcButton = p5.createButton("Calculate Path");
        let resetButton = p5.createButton("Reset");
        let radiusButton = p5.createButton("Draw Longest Path");
        let angleInput = p5.createInput();
        let angleButton = p5.createButton("Approximate Path");

        angleButton.mousePressed(() => {
            resetPath();
            [path, approxPath] = solver.approxOptimalPath(map, p5, angleInput.value());
            setTimeout(p5.redraw, 12000);
        })
        sourceButton.mousePressed(() => { selecting = "source" });
        destButton.mousePressed(() => { selecting = "dest" });
        eraseButton.mousePressed(() => { selecting = "erase" });
        calcButton.mousePressed(() => {
            makePath(p5);
        });
        resetButton.mousePressed(() => {
            map = new Map(numCols, numRows, cellSize, pathSpeed);
            resetPath();
            p5.redraw();
        });
        radiusButton.mousePressed(() => {
            if (path !== null) {
                path.drawRadius(p5);
            }
        })

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

    const approxOptimalPath = (p5, numAngles) => {
        let minPath = new Path();
        minPath.radius = 1000;
        for (let i = 0; i < numAngles; i++) {
            setTimeout(() => {
                approxPath = solver.findAnglePath(map, i * 2 * Math.PI / numAngles);
                approxPath.color = "blue";
                if (approxPath.radius < minPath.radius) {
                    minPath = approxPath;
                }

                p5.redraw();
                console.log("time");
            }, 2000);
        }
        path = solver.findOptimalPath(map);
        approxPath = minPath;
        setTimeout(p5.redraw, 2000 * numAngles);
    }

    const draw = (p5) => {
        p5.background(0);
        map.drawMap(p5);
        if (path !== null) {
            path.drawPath(p5);
        }
        if (approxPath !== null) {
            approxPath.drawPath(p5);
        }
    }

    return ( <div>
        <h2> Try It Out </h2> 
        <p> Select source and destination squares and click calculate to find the ideal walkway </p> 
        <Sketch setup = { setup } draw = { draw }/> 
        </div>
    )
}

export default Demo