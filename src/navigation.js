const {
    isValidGrid,
    isValidPosition
} = require("./validation");

const navigateRover = (grid, position, instructions) => {
    if (!grid) throw new Error("grid is required");
    if (!position) throw new Error("position is required");
    if (!instructions) throw new Error("instructions is required");
    if (!isValidGrid(grid)) throw new Error("invalid grid");
    if (!isValidPosition(position[0], position[1], ...grid) || !(/^[NSWE]+$/g.test(position[2]))) throw new Error("invalid position");
};

const move = (grid, position) => {

}

module.exports = navigateRover;