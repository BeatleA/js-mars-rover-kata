const { navigateRover } = require("./navigation");
const validateManagerArguments = require("./rovers_manager_validation");

const manageRovers = (grid, positions, instructions) => {
    validateManagerArguments(grid, positions, instructions);

    let occupied = positions.slice(1);
    return positions.map((position, index) => {
        const newPosition = navigateRover(grid, position, instructions[index], occupied);
        occupied.push(newPosition);
        occupied = occupied.slice(1);
        return newPosition;
    });
};

module.exports = manageRovers;