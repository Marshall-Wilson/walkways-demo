import React from 'react'
import line1 from "../images/line1.jpg"
import OneDDemo from "./OneDDemo"

const OneD = () => {
    return (
        <div id="1D">
                <h1 className = "section_title">Walkways on a Line</h1>
                <p>First, we can look at a solution for a limited version of the problem</p>
                <div>
                    <h2>Modified Problem</h2>
                    <p>In this case, we only look at sources and destinations in one
                        dimension, on a real number line scaled from 0 to 1 with a
                        source at 0 and a destination at 1 and with any source having
                        a smaller value than any destination.
                    </p>
                    <img src={line1} alt="1-D Formulation"></img>
                </div>
                <div>
                    <h2>Algorithm</h2>
                    <p>
                        This formulation of the problem employs a few facts about
                        the possible locations of the points that comprise the travel
                        time diameter to deterministically find the ideal location
                        for the walkway in linear time.
                    </p>
                    <p>
                        First, we note that the optimal travel time diameter is never
                        greater than v / (2v - 1). We can prove this, by placing a
                        path from the midpoint of 1 - v / (2v - 1) and 0 to the
                        midpoint of v / (2v - 1) and 1. For any speed, this worst-case path
                        will always have a travel time diameter of v / (2v - 1), which
                        reflects both the maximum time for point pairs that use the walkway
                        and the maximum distance between any point pairs
                        that don't use the walkway.
                    </p>
                    <p>
                        Next, we can identify two crucial points in any map. <i>r</i>
                    , which is the largest source for which it is faster to use the
                    walkway to get from r to 1. And symmetrically, <i>s</i>, which is
                    the smallest destination for which it is faster to use the walkway
                    to get from 0 to s
                    </p>
                    <p>
                        Third, the location of a path and the location of its r and
                        s points are tied together. Specifically, the start of an
                        optimal walkway is positioned at r/2 and the end is positioned
                        at (s + 1)/2.
                    </p>
                    <p>
                        Fourth, if we know r and s, we can also know that the travel time
                        diameter is the travel time between one of the pairs (0, 1),
                        (0, s), (r, 1), or (r, s).
                    </p>
                    <p>
                        And Finally, we can tie all three of these observations together
                        to generate two possible pairs, r and s, for a set of points,
                        and using them, generate and test two paths. This requires more
                        math magic than is reasonable to show here, but the result is that
                        r1 is the largest source less than or equal to 1 - v/(2v -1),
                        s1 is the smallest destination greater than or equal to
                        (r1(v-1) + v + 1)/(3v - 1)
                        s2 is the smallest destination greater than or equal to v/(2v - 1),
                        and r2 is the largest source less than or equal to ((1 - v)(s2 + 1))/(1 - 3v)
                        By finding these two pairs and testing the travel time diameters of
                        the resulting paths, we can find which path is optimal.
                    </p>
                    <p>
                        This algorithm runs through all of the points once to find r1 and s2,
                        a second time to find s1 and r2, and finally calculates the
                        travel time between four pairs of points twice to find which
                        path is better, so the overall runtime is O(n).
                        A more naive method might require upwards of O(n<sup>4</sup>)
                        to test every possible path start and end and find the
                        travel time diameter for every possible source and destination
                        pair, so this algorithm is pretty slick.
                    </p>
                </div>
                <OneDDemo length="41"/>
            </div>
    )
}

export default OneD
