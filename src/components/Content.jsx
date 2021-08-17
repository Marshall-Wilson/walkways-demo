import React from 'react'
import OneD from "./OneD"
import TwoDH from "./TwoDH"
import TwoD from "./TwoD"

const Content = () => {
    return (
        <div>
            <div id="problem">
                <h1>Introduction</h1>
                <h2>Problem Statement</h2>
                <p>The goal of this algorithm is to find the <i>optimal location </i>  
                     for a <i>moving walkway</i> in a plane containing a number of
                    sources and destinations. 
                </p>
                <h3>Definitions</h3>
                <p>A <i>moving walkway</i> in this case is defined as any two points 
                    between which movement is faster than normal. It could represent
                    a highway, a flight path, or an actual moving walkway. 
                </p>
                <p>The <i>optimal location </i> for such a walkway is defined as the 
                    location that minimizes the travel time diameter.
                </p>
                <p> The <i>travel time diameter </i>is defined as the maximum travel time 
                between any source and destination.
                </p>
            </div>
            <OneD/>
            <TwoDH/>
            <TwoD/>
        </div>
    )
}

export default Content
