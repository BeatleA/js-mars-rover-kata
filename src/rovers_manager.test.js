const manageRovers = require("./rovers_manager");

describe("manageRovers", () => {
    test.each([
        { grid: [3, 3], positions: [[1, 2, "N"]], instructions: ["M"], expected: [[1, 3, "N"]] },
        { grid: [7, 4], positions: [[1, 2, "N"], [2, 2, "N"]], instructions: ["LM", "RM"], expected: [[0, 2, "W"], [3, 2, "E"]] },
        { grid: [5, 5], positions: [[1, 2, "N"], [3, 3, "E"]], instructions: ["LMLMLMLMM", "MMRMMRMRRM"], expected: [[1, 3, "N"], [5, 1, "E"]] },
        { grid: [15, 5], positions: [[11, 3, "W"]], instructions: ["MLLMMRMM"], expected: [[12, 1, "S"]] },
        { grid: [10, 10], positions: [[0, 0, "N"], [3, 3, "E"], [7, 5, "W"]], instructions: ["RMLM", "MMRM", "LLMMM"], expected: [[1, 1, "N"], [5, 2, "S"], [10, 5, "E"]] },
    ])("returns an array of new positions when all arguments valid and no clashes", ({ grid, positions, instructions, expected }) => {
        expect(manageRovers(grid, positions, instructions)).toEqual(expected);
    });

    test.each([
        { grid: [7, 4], positions: [[1, 2, "E"], [2, 2, "W"]], instructions: ["M", "RM"], expected: [[1, 2, "E"], [2, 3, "N"]] },
        { grid: [5, 5], positions: [[3, 2, "N"], [3, 3, "E"]], instructions: ["LMRMRMLMM", "MMRMMRMRRM"], expected: [[2, 3, "E"], [5, 1, "E"]] },
        { grid: [10, 10], positions: [[0, 0, "N"], [3, 3, "W"], [4, 5, "W"]], instructions: ["RMLM", "MMLMMR", "LMMMRMMM"], expected: [[1, 1, "N"], [1, 2, "S"], [2, 2, "W"]] },
        { grid: [10, 10], positions: [[0, 0, "N"], [3, 3, "W"], [4, 3, "W"]], instructions: ["RMLM", "MRMRMRM", "M"], expected: [[1, 1, "N"], [3, 3, "S"], [4, 3, "W"]] },
    ])("returns an array of last possible positions when all arguments valid but rovers clashing", ({ grid, positions, instructions, expected }) => {
        expect(manageRovers(grid, positions, instructions)).toEqual(expected);
    });
});