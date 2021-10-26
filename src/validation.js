const isValidGrid = grid =>
    Array.isArray(grid) && grid.length === 2 && grid.every(element => Number.isInteger(element) && element >= 0);

const isValidPosition = (x, y, maxX, maxY) => x >= 0 && x <= maxX && y >= 0 && y <= maxY;

const isValidPositionAndDirection = (grid, position) =>
    Array.isArray(position) && position.length === 3 && position.slice(0, 2).every(Number.isInteger) &&
    /^[NSWE]{1}$/g.test(position[2]) && isValidPosition(position[0], position[1], ...grid);

const isValidOccupied = (grid, occupied) =>
    Array.isArray(occupied) && occupied.every(element => Array.isArray(element) && isValidPositionAndDirection(grid, element));

module.exports = {
    isValidGrid,
    isValidPosition,
    isValidPositionAndDirection,
    isValidOccupied
};
