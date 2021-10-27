const {
    validateNavigationArguments,
    isValidPosition
} = require("./validation");

const navigateRover = (grid, position, instructions, occupied) => {
    validateNavigationArguments(grid, position, instructions, occupied);

    let [x, y, direction] = position;
    const left = { N: "W", S: "E", W: "S", E: "N" };
    const right = { N: "E", S: "W", W: "N", E: "S" };

    for (let instruction of [...instructions]) {
        if (instruction !== "M") {
            direction = (instruction === "L") ? left[direction] : right[direction];
        } else {
            const [newPosition, validPosition] = move(grid, [x, y, direction], occupied);
            if (validPosition) {
                [x, y, direction] = newPosition;
            } else {
                console.log("Rover cannot go any further. Incorrect instructions. Last possible position returned.");
                break;
            }
        }
    }

    return [x, y, direction];
};

const move = (grid, position, occupied) => {
    let [x, y, direction] = position;
    const moveXY = { N: [x, y + 1], S: [x, y - 1], W: [x - 1, y], E: [x + 1, y] };

    [x, y] = moveXY[direction];
    const valid = isValidPosition(x, y, ...grid) && occupied.every(element => element[0] !== x || element[1] !== y);

    return [valid ? [x, y, direction] : position, valid];
};

module.exports = {
    navigateRover,
    move
};