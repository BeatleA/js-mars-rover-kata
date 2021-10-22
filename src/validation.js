const isValidGrid = grid => {
    return Array.isArray(grid) && grid.length === 2 && grid.every(element => Number.isInteger(element) && element >= 0);
}

const isValidPosition = (x, y, maxX, maxY) => {
    return x >= 0 && x <= maxX && y >= 0 && y <= maxY;
}

module.exports = {
    isValidGrid,
    isValidPosition
}
