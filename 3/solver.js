'use strict';
const {
    checkIntersection,
} = require('line-intersect');

const fs = require('fs').promises;

const findWireIntersections = wireMaps => {
    const intersections = [];
    const intersectionSteps = [0, 0];

    wireMaps[0].forEach(wireOneLine => {
        intersectionSteps[0] += Math.abs(wireOneLine[1][1] - wireOneLine[0][1]) + Math.abs(wireOneLine[1][0] - wireOneLine[0][0]);
        intersectionSteps[1] = 0;
        wireMaps[1].forEach(wireTwoLine => {
            intersectionSteps[1] += Math.abs(wireTwoLine[1][1] - wireTwoLine[0][1]) + Math.abs(wireTwoLine[1][0] - wireTwoLine[0][0]);

            const intersection = checkIntersection(
                ...wireOneLine[0], ...wireOneLine[1], ...wireTwoLine[0], ...wireTwoLine[1]
            );

            if (intersection.type === 'intersecting') {
                intersections.push({
                    steps: [
                        intersectionSteps[0] - Math.abs(wireOneLine[0][0] === wireOneLine[1][0] ? wireOneLine[1][1] - intersection.point.y : wireOneLine[1][0] - intersection.point.x),
                        intersectionSteps[1] - Math.abs(wireTwoLine[0][0] === wireTwoLine[1][0] ? wireTwoLine[1][1] - intersection.point.y : wireTwoLine[1][0] - intersection.point.x)
                    ],
                    point: intersection.point
                });
            }
        })
    });

    return intersections;
};

const createWireMap = (wirePaths) => {
    const wireMap = [];

    wirePaths.filter(pathString => !!pathString).forEach((wirePath, wireIndex) => {
        const currentPosition = [0, 0];
        wireMap[wireIndex] = [];

        wirePath.split(',').forEach(step => {

            let [, direction, amount] = step.match(/^([RUDL])(\d+)$/);
            amount = parseInt(amount);

            switch (direction) {
                case 'R':
                    wireMap[wireIndex].push([
                        [currentPosition[0], currentPosition[1]],
                        [currentPosition[0] += amount, currentPosition[1]]
                    ]);
                    break;
                case 'U':
                    wireMap[wireIndex].push([
                        [currentPosition[0], currentPosition[1]],
                        [currentPosition[0], currentPosition[1] += amount]
                    ]);
                    break;
                case 'L':
                    wireMap[wireIndex].push([
                        [currentPosition[0], currentPosition[1]],
                        [currentPosition[0] -= amount, currentPosition[1]]
                    ]);
                    break;
                case 'D':
                    wireMap[wireIndex].push([
                        [currentPosition[0], currentPosition[1]],
                        [currentPosition[0], currentPosition[1] -= amount]
                    ]);
                    break;
            }
        });

    });

    return wireMap;
};

const getShortestDistanceFromIntersections = intersections => {
    const distances = intersections
        .filter(intersection => !(intersection.point.x === 0 && intersection.point.y === 0))
        .map(intersection =>
            Math.abs(intersection.point.x) + Math.abs(intersection.point.y)
        )
        .sort((a, b) => a - b);

    return distances[0] || -1;
};

const getFewestStepCount = intersections => {
    return intersections
        .filter(int => int.point.x !== 0 && int.point.y !== 0)
        .map(int => int.steps.reduce((a, c) => a + c, 0))
        .sort((a, b) => a - b)[0] || -1;
};

fs.readFile('input', 'utf8').then(content => {
    const wireMap = createWireMap(content.split('\n'));
    const intersections = findWireIntersections(wireMap);

    console.log('Shortest wire intersection distance: ',
        getShortestDistanceFromIntersections(intersections));

    console.log('Fewest step count to reach an intersection: ', getFewestStepCount(intersections));
});

module.exports = {
    createWireMap,
    findWireIntersections,
    getShortestDistanceFromIntersections,
    getFewestStepCount
};
