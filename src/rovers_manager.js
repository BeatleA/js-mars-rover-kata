const { navigateRover } = require("./navigation");

const manageRovers = (grid, positions, instructions) => {
    if (!grid) throw new Error("grid is required");
    if (!positions) throw new Error("positions is required");
    if (!instructions) throw new Error("instructions is required");
    if (!(Array.isArray(positions) && positions.every(Array.isArray))) throw new Error("invalid positions");
    if (!(Array.isArray(instructions) && instructions.length === positions.length)) throw new Error("invalid instructions");

    return positions.map((position, index) => navigateRover(grid, position, instructions[index]));
};

module.exports = manageRovers;