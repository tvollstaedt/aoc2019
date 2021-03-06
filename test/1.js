const assert = require('assert');
const solver = require('../1/solver');

describe('1.1', () =>  {
    it('For a mass of 1969, the fuel required should be 654', () => {
        assert.equal(solver.calculateMassFuel(1969), 654);
    });
    it('For a mass of 100756, the fuel required should be 33583', () => {
        assert.equal(solver.calculateMassFuel(100756), 33583);
    });
});

describe('1.2', () =>  {
    it('The total fuel required for a module of mass 1969 should be 966', () => {
        assert.equal(solver.calculateTotalFuel(1969), 966);
    });
    it('The fuel required by a module of mass 100756 and its fuel should be 50346', () => {
        assert.equal(solver.calculateTotalFuel(100756), 50346);
    });
});
