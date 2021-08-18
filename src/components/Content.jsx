import React from 'react'
import OneD from "./OneD"
import TwoDH from "./TwoDH"
import TwoD from "./TwoD"

const Content = () => {
    return (
        <div>
            <div id="problem">
                <h1>Introduction</h1>
                <p>A common problem in the field of optimization is to find the 
                    best location for a facility. These problems can range from
                    finding the cheapest location for a factory, to the most profitable
                    new airline route, to the best place to build an escalator in
                    a mall. 
                </p>
                <p>On this page, we will explore methods for solving one particular
                    formulation of this type of problem. That is, finding the 
                    <i>optimal location </i> for a <i>moving walkway</i> in a 
                    plane containing a number of sources and destinations. 
                </p>
                <h3>Definitions</h3>
                <p>A <i>moving walkway</i> is any pair of points 
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
