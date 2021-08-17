import React from 'react'
import line1 from "../images/line1.jpg"
import OneDDemo from "./OneDDemo"

const OneD = () => {
    return (
        <div id="1D">
                <h1>Walkways on a Line</h1>
                <p>To start out, we can look at a solution for a limited version of the problem</p>
                <h2>Modified Problem</h2>
                <p>In this case, we only look at sources and destinations in one 
                    dimension, on a real number line scaled from 0 to 1 with a
                    source at 0 and a destination at 1 and with any source having
                    a smaller value than any destination. 
                </p>
                <img src={line1} alt="1-D Formulation"></img>
                <h2>Algorithm</h2>
                <p>This formulation of the problem employs a few facts about 
                    the possible locations of the points that comprise the travel
                    time diameter to deterministically find the ideal location 
                    for the walkway in linear time. 
                </p>
                <OneDDemo length="40"/>
            </div>
    )
}

export default OneD
