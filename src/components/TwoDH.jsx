import React from 'react'

const TwoDH = () => {
    return (
        <div id="2D-restricted">
            <h1 className = "section_title">Walkways on a Plane</h1>
            <div>
                <h2>Modified Problem</h2>
                <p>To get to fully solving optimal walkways on a plane, we first
                    need to solve a slightly restricted version. We will have points
                    anywhere on a 2D plane with no restriction to where sources and
                    destinations can be. Additionally, the walkway is now bidirectional,
                    so paths can go from a source to either endpoint of the walkway.
                    However, we will constrain the walkway to be horizontal.
                </p>
            </div>
            <div>
                <h2>Randomized Optimization of Quasiconvex Programs</h2>
                <p>
                    Unlike the previous problem, Cardinal et al. don't provide a
                    deterministic algorithm for generating an optimal walkway.
                    Instead, they show that the problem of finding an optimal
                    horizontal walkway in a plane can be solved using a variety of
                    algorithms for solving quasiconvex programs in the same asymptotic
                    time it takes to verify a solution. This is the reason for constraining
                    the walkway to be horizontal; the additional complexity from
                    allowing walkways with different y values causes the program to
                    cease to be quasiconvex.
                </p>
                <p>
                    In this case, the process of verifying a solution is the method
                    for finding the travel time diameter for a path. The naive method
                    would be to calculate the maximum travel time among all O(n<sup>2</sup>)
                    possible source-destination pairs.
                </p>
                <p>
                    However, we can do better than this using the observation that
                    the walkway is only ever used for pairs that fall on opposite sides
                    of the bisector of the walkway. This means we can partition the
                    set of points into points that are closer to one end of the walkway
                    and points that are closer to the other end. So the travel time
                    diameter is the euclidian diameter of either of the two sets (which
                    can be found in O(nlogn)) or the maximum travel time using or not
                    using the walkway between the two sets.
                </p>
                <p>
                    For pairs that span the two groups, we can find whether the
                    maximum travel time exceeds a known value (such as the travel
                    time diameter of a previous iteration) in O(nlogn) time as well
                    by using some clever data structures.
                </p>
                <p>
                    So with a verification method of the travel time diameter in
                    O(nlogn), and any good quasiconvex programing algorithm, we can
                    find an optimal horizontal walkway in O(nlogn) time.
                </p>
            </div>
        </div>
    )
}

export default TwoDH
