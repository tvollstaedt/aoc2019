const assert = require('assert');
const solver = require('../3/solver');

describe('3.1', () => {


    it('First test cases', () => {
        assert.equal(solver.getShortestDistanceFromWirePath([
            'R8,U5,L5,D3',
            'U7,R6,D4,L4'
        ]), 6);
    });

    it('Second test cases', () => {
        assert.equal(solver.getShortestDistanceFromWirePath([
            'R75,D30,R83,U83,L12,D49,R71,U7,L72',
            'U62,R66,U55,R34,D71,R55,D58,R83'
        ]), 159);
    });

    it('Third test case', () => {
        assert.equal(solver.getShortestDistanceFromWirePath([
            'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
            'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'
        ]), 135);
    })
});
