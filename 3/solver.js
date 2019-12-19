'use strict';

const {
    checkIntersection,
} = require('line-intersect');

const fs = require('fs').promises;

const rootPoint = [0, 0];

const getManhattenDistance = (rootPoint, intersection) => {
    return Math.abs(rootPoint[0] - intersection[0]) + Math.abs(rootPoint[1] - intersection[1]);
};

const findWireIntersections = wireMaps => {
    const intersections = [];

    wireMaps[0].forEach(wireOneLine => {
        wireMaps[1].forEach(wireTwoLine => {
            const intersection = checkIntersection(
                ...wireOneLine[0], ...wireOneLine[1], ...wireTwoLine[0], ...wireTwoLine[1]
            );

            if (intersection.type === 'intersecting') {
                intersections.push(intersection.point);
            }
        })
    });

    return intersections;
};

const createWireMap = (wirePaths) => {
    const wireMap = [];

    wirePaths.filter(pathString => !!pathString).forEach((wirePath, wireIndex) => {
        const currentPosition = [...rootPoint];
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

const getShortestDistanceFromWirePath = wirePath => {
    const wireMap = createWireMap(wirePath);
    const intersections = findWireIntersections(wireMap);
    const distances = intersections
        .filter(point => point.x !== 0 && point.y !== 0)
        .map(intersection =>
            getManhattenDistance(rootPoint, [intersection.x, intersection.y])
        )
        .sort((a, b) => a - b);

    return distances[0] || -1;
};

fs.readFile('input', 'utf8').then(content => {
    console.log('Shortest wire intersection distance: ',
        getShortestDistanceFromWirePath(content.split('\n')));
});

module.exports = {
    createWireMap,
    findWireIntersections,
    getManhattenDistance,
    getShortestDistanceFromWirePath
};
