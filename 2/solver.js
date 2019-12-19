const fs = require('fs').promises;
const ADD = 1;
const MULTIPLY = 2;
const EXIT = 99;


intCodeEngine = program => {
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

    return program;
};

findInputs = (program, wantedValue) => {
    for(let noun = 0; noun <= 99; noun++) {
        for(let verb = 0; verb <= 99; verb++) {
            const alteredProgram = [program[0], noun, verb, ...program.slice(3)];
            const outputValue = intCodeEngine(alteredProgram)[0];
            if(outputValue === wantedValue) {
                return 100 * noun + verb;
            }
        }
    }
}

fs.readFile('input', 'utf8').then(content => {
    const program = content.split(',');
    console.log('Intcode output: ', intCodeEngine([program[0], 12, 2, ...program.slice(3)])[0]);

    const wantedValue = 19690720;
    console.log(`100 * noun + verb for ${wantedValue}:`, findInputs(program, wantedValue) || 'Not found :-(');
});


module.exports = {
    intCodeEngine,
    findInputs
};
