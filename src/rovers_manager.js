const { navigateRover } = require("./navigation");
const validateManagerArguments = require("./rovers_manager_validation");

const manageRovers = (grid, positions, instructions) => {
    validateManagerArguments(grid, positions, instructions);

    let occupied = positions;
    return positions.map((position, index) => {
        occupied = occupied.slice(1);
        const newPosition = navigateRover(grid, position, instructions[index], occupied);
        occupied.push(newPosition);
        return newPosition;
    });
};

module.exports = manageRovers;