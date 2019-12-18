const assert = require("assert");
const puzzle = require('../2/2');

describe('2.1', () =>  {
    it('For a simple programs, the final state must be the same as expected', () => {
        assert.equal(puzzle.intCodeEngine('1,0,0,0,99'), '2,0,0,0,99');
        assert.equal(puzzle.intCodeEngine('2,3,0,3,99'), '2,0,0,0,99');
        assert.equal(puzzle.intCodeEngine('2,4,4,5,99,0'), '2,4,4,5,99,9801');
        assert.equal(puzzle.intCodeEngine('1,1,1,4,99,5,6,0,99'), '30,1,1,4,2,5,6,0,99');
    });
});
