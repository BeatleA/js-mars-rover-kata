const {
    isValidGrid,
    isValidPosition,
    isValidPositionAndDirection
} = require("./validation");

const navigateRover = (grid, position, instructions) => {
    if (!grid) throw new Error("grid is required");
    if (!position) throw new Error("position is required");
    if (!instructions) throw new Error("instructions is required");
    if (!isValidGrid(grid)) throw new Error("invalid grid");
    if (!isValidPositionAndDirection(grid, position)) throw new Error("invalid position");
    if (!(/^[LRM]+$/g.test(instructions))) throw new Error("invalid instructions");

    let [x, y, direction] = position;
    const left = { N: "W", S: "E", W: "S", E: "N" };
    const right = { N: "E", S: "W", W: "N", E: "S" };

    for (let instruction of [...instructions]) {
        if (instruction !== "M") {
            direction = (instruction === "L") ? left[direction] : right[direction];
        } else {
            const [newPosition, validPosition] = move(grid, [x, y, direction]);
            if (validPosition) {
                [x, y, direction] = newPosition;
            } else {
                console.log("Rover cannot go any further. Incorrect instructions. Last possible position returned.");
                return [x, y, direction];
            }
        }
    }

    return [x, y, direction];
}

const move = (grid, position) => {
    let [x, y, direction] = position;
    const moveXY = { N: (x, y) => [x, ++y], S: (x, y) => [x, --y], W: (x, y) => [--x, y], E: (x, y) => [++x, y] };

    [x, y] = moveXY[direction](x, y);    
    const valid = isValidPosition(x, y, ...grid);

    return [valid ? [x, y, direction] : position, valid];
}

module.exports = {
    navigateRover,
    move
}