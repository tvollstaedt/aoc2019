const fs = require('fs').promises;

intCodeEngine = programString => {
    const program = programString.split(',');
    let pointer = 0;
    let finish = false;

    while (!finish) {
        const leftOperand = parseInt(program[pointer + 1]);
        const rightOperand = parseInt(program[pointer + 2]);
        const target = parseInt(program[pointer + 3]);

        switch (program[pointer]) {
            case ADD:
                program[target] = program[leftOperand] + program[rightOperand];
                break;
            case MULTIPLY:
                program[target] = program[leftOperand] * program[rightOperand];
                break;
            case EXIT:
                finish = true;
                break;
        }

        pointer += 4;
    }

    return program.join(',');
};


const ADD = 1;
const MULTIPLY = 2;
const EXIT = 99;

fs.readFile('input', 'utf8').then(content => {
    console.log(intCodeEngine(content));
});


module.exports = {
    intCodeEngine
};
