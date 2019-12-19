const fs = require('fs').promises;

intCodeEngine = programString => {
    const program = programString.split(',');
    let pointer = 0;
    let finish = false;

    while (!finish) {
        const leftOperandIndex = parseInt(program[pointer + 1]);
        const rightOperandIndex = parseInt(program[pointer + 2]);
        const targetIndex = parseInt(program[pointer + 3]);

        switch (parseInt(program[pointer])) {
            case ADD:
                program[targetIndex] = parseInt(program[leftOperandIndex]) + parseInt(program[rightOperandIndex]);
                break;
            case MULTIPLY:
                program[targetIndex] = parseInt(program[leftOperandIndex]) * parseInt(program[rightOperandIndex]);
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
    const program = content.split(',');
    program[1] = 12;
    program[2] = 2;
    console.log(intCodeEngine(program.join(',')));
});


module.exports = {
    intCodeEngine
};
