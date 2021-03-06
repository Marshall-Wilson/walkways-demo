import React from 'react'

const TwoD = () => {
    return (
        <div id="2D-unrestricted">
            <div>
                <h1 className = "section_title">Unrestricted Walkways on a Plane</h1>
                <h2>Final Problem Statement</h2>
                <p>Now we have all the tools needed to solve the unrestricted version
                    of this problem. How to find an optimal, bidirectional walkway
                    in a plane.
                </p>
            </div>
            <div>
                <h2>Best Solution</h2>
                <p>Unfortunately, removing the horizontal limitation on the
                    walkway moves the overall optimization problem out of the
                    quasiconvex space, meaning that it cannot be solved by the
                    solution used in the last section. However, we are able to
                    generate a (1 + ε)-approximate solution using the previous
                    algorithm. Esentially we're going to solve the horizontal problem
                    a constant number of times and take the best result, which will
                    be within (1 + ε) times the travel time diameter of the true
                    optimal solution.
                </p>
            </div>
            <div>
                <h2>Algorithm</h2>
                <p>
                    For a given ε, and for each angle iε/v in [0, 2πv/ε], rotate
                    the set of points by the given angle and then solve the
                    problem with a horizontal walkway using the previous
                    algorithm. At each step, keep the walkway that has the
                    smallest travel time diameter.
                </p>
                <p>
                    In doing this, we know that the solution walkway differs from
                    a truly optimal walkway by an angle of at most ε/v.
                </p>
                <h3>Runtime</h3>
                <p>The core of the algorithm is the same as the previous section,
                    so repeating it for each angle results in an overall runtime
                    of O( <sup>ε</sup>/<sub>v</sub> <i>n</i>log<i>n</i>)
                </p>
            </div>
        </div>
    )
}

export default TwoD
