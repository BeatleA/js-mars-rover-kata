const isValidPosition = (x, y, maxX, maxY) => {
    return x >= 0 && x <= maxX && y >= 0 && y <= maxY;
}

module.exports = isValidPosition;