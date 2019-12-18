const fs = require('fs').promises;

calculateMassFuel = mass => {
    return Math.floor(mass / 3) - 2;
};

calculateTotalFuel = mass => {
    let massFeul = calculateMassFuel(mass);
    return massFeul > 0 ? massFeul += calculateTotalFuel(massFeul) : 0;
};

fs.readFile('input', 'utf8').then(content => {
    const moduleFuel = content.split('\n').filter(line => !!line).reduce((sum, mass) => sum += calculateMassFuel(mass), 0);
    console.log('Module fuel requirement (Part 1): ', moduleFuel);

    const totalFuel = content.split('\n').filter(line => !!line).reduce((sum, mass) => sum += calculateTotalFuel(mass), 0);
    console.log('Total fuel requirement (Part 2): ', totalFuel);
});


module.exports = {
    calculateMassFuel,
    calculateTotalFuel
};
