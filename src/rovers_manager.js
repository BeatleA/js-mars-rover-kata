const { navigateRover } = require("./navigation");

const manageRovers = (grid, positions, instructions) => {
    if (!grid) throw new Error("grid is required");
    if (!positions) throw new Error("positions is required");
    if (!instructions) throw new Error("instructions is required");
    if (!(Array.isArray(positions) && positions.every(Array.isArray))) throw new Error("invalid positions");
    const xy = positions.map(position => JSON.stringify(position.slice(0, 2)));
    if (xy.length !== new Set(xy).size) throw new Error("invalid positions");
    if (!(Array.isArray(instructions) && instructions.length === positions.length)) throw new Error("invalid instructions");

    let occupied = positions.slice(1);
    return positions.map((position, index) => {
        const newPosition = navigateRover(grid, position, instructions[index], occupied);
        occupied.push(newPosition);
        occupied = occupied.slice(1);
        return newPosition;
    });
};

module.exports = manageRovers;