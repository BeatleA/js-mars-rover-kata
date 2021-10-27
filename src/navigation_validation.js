const isValidGrid = grid =>
    Array.isArray(grid) && grid.length === 2 && grid.every(element => Number.isInteger(element) && element >= 0);

const isValidPosition = (x, y, maxX, maxY) => x >= 0 && x <= maxX && y >= 0 && y <= maxY;

const isValidPositionAndDirection = (grid, position) =>
    Array.isArray(position) && position.length === 3 && position.slice(0, 2).every(Number.isInteger) &&
    /^[NSWE]{1}$/g.test(position[2]) && isValidPosition(position[0], position[1], ...grid);

const isValidOccupied = (grid, occupied) =>
    Array.isArray(occupied) && occupied.every(element => Array.isArray(element) && isValidPositionAndDirection(grid, element));

const validateNavigationArguments = (grid, position, instructions, occupied) => {
    if (!grid) throw new Error("grid is required");
    if (!position) throw new Error("position is required");
    if (!instructions) throw new Error("instructions is required");
    if (!occupied) throw new Error("occupied is required");
    if (!isValidGrid(grid)) throw new Error("invalid grid");
    if (!isValidPositionAndDirection(grid, position)) throw new Error("invalid position");
    if (!(/^[LRM]+$/g.test(instructions))) throw new Error("invalid instructions");
    if (!isValidOccupied(grid, occupied)) throw new Error("invalid occupied");
}

module.exports = {
    validateNavigationArguments,
    isValidPosition,
    isValidGrid,
    isValidPositionAndDirection,
    isValidOccupied
};
