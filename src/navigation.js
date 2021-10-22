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
        switch (instruction) {
            case "L":
                direction = left[direction];
                break;
            case "R":
                direction = right[direction];
                break;
            case "M":
                const newPosition = move(grid, [x, y, direction]);
                if (JSON.stringify(newPosition) === JSON.stringify([x, y, direction])) {
                    return [x, y, direction];
                } else {
                    [x, y, direction] = newPosition;
                }
        }
    }

    return [x, y, direction];
}

const move = (grid, position) => {
    let [x, y, direction] = position;
    switch (direction) {
        case "N":
            y++;
            break;
        case "S":
            y--;
            break;
        case "W":
            x--;
            break;
        case "E":
            x++;
            break;
    }

    if (isValidPosition(x, y, ...grid)) {
        return [x, y, direction];
    } else {
        console.log("Rover cannot go any further. Incorrect instructions. Last possible position returned.");
        return position;
    }
}

module.exports = {
    navigateRover,
    move
}