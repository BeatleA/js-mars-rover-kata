const isValidGrid = grid => {
    return Array.isArray(grid) && grid.length === 2 && grid.every(element => Number.isInteger(element) && element >= 0);
}

const isValidPosition = (x, y, maxX, maxY) => {
    return x >= 0 && x <= maxX && y >= 0 && y <= maxY;
}

const isValidPositionAndDirection = (grid, position) => {
    return Array.isArray(position) && position.length === 3 && Number.isInteger(position[0]) && Number.isInteger(position[1]) &&
        /^[NSWE]{1}$/g.test(position[2]) && isValidPosition(position[0], position[1], ...grid);
}

module.exports = {
    isValidGrid,
    isValidPosition,
    isValidPositionAndDirection
}
