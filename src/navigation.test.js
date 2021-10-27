const {
    navigateRover,
    move
} = require("./navigation");

describe("navigateRover", () => {
    test.each([
        { grid: [3, 3], position: [1, 2, "N"], instructions: "M", occupied: [], expected: [1, 3, "N"] },
        { grid: [7, 4], position: [1, 2, "N"], instructions: "LM", occupied: [[0, 0, "W"]], expected: [0, 2, "W"] },
        { grid: [5, 5], position: [1, 2, "N"], instructions: "LMLMLMLMM", occupied: [[3, 3, "E"]], expected: [1, 3, "N"] },
        { grid: [5, 5], position: [3, 3, "E"], instructions: "MMRMMRMRRM", occupied: [[2, 4, "W"], [2, 5, "W"], [0, 1, "S"]], expected: [5, 1, "E"] },
        { grid: [15, 5], position: [11, 3, "W"], instructions: "MLLMMRMM", occupied: [[2, 4, "W"], [2, 5, "W"], [0, 1, "S"]], expected: [12, 1, "S"] },
    ])("returns new position when instructions correct and no clashes", ({ grid, position, instructions, occupied, expected }) => {
        expect(navigateRover(grid, position, instructions, occupied)).toEqual(expected);
    });

    test.each([
        { grid: [3, 3], position: [1, 3, "N"], instructions: "M", occupied: [], expected: [1, 3, "N"] },
        { grid: [3, 3], position: [0, 0, "E"], instructions: "MMLMMLLMMM", occupied: [], expected: [2, 0, "S"] },
        { grid: [0, 0], position: [0, 0, "W"], instructions: "MMLMMLLMMM", occupied: [], expected: [0, 0, "W"] },
        { grid: [5, 4], position: [5, 4, "W"], instructions: "LMLMRR", occupied: [], expected: [5, 3, "E"] },
    ])("returns last possible position when instructions lead off the grid", ({ grid, position, instructions, occupied, expected }) => {
        expect(navigateRover(grid, position, instructions, occupied)).toEqual(expected);
    });

    test.each([
        { grid: [5, 5], position: [1, 2, "N"], instructions: "M", occupied: [[4, 2, "W"], [1, 3, "W"], [4, 3, "E"], [1, 5, "S"]], expected: [1, 2, "N"] },
        { grid: [4, 6], position: [0, 0, "E"], instructions: "MMLMMRMMM", occupied: [[4, 2, "W"], [1, 3, "W"], [4, 3, "E"], [1, 5, "S"]], expected: [3, 2, "E"] },
        { grid: [4, 5], position: [0, 0, "N"], instructions: "MMMMRMLM", occupied: [[4, 2, "W"], [1, 3, "W"], [4, 3, "E"], [1, 5, "S"]], expected: [1, 4, "N"] },
        { grid: [5, 5], position: [5, 4, "W"], instructions: "MLML", occupied: [[4, 2, "W"], [1, 3, "W"], [4, 3, "E"], [1, 5, "S"]], expected: [4, 4, "S"] },
    ])("returns last possible position when instructions lead to occupied position", ({ grid, position, instructions, occupied, expected }) => {
        expect(navigateRover(grid, position, instructions, occupied)).toEqual(expected);
    });
});

describe("move", () => {
    test.each([
        { grid: [5, 5], position: [1, 4, "E"], occupied: [], expected: [[2, 4, "E"], true] },
        { grid: [5, 5], position: [2, 4, "N"], occupied: [], expected: [[2, 5, "N"], true] },
        { grid: [0, 1], position: [0, 0, "N"], occupied: [], expected: [[0, 1, "N"], true] },
        { grid: [3, 3], position: [2, 3, "E"], occupied: [], expected: [[3, 3, "E"], true] },
        { grid: [3, 3], position: [3, 3, "W"], occupied: [], expected: [[2, 3, "W"], true] },
        { grid: [3, 3], position: [3, 3, "S"], occupied: [], expected: [[3, 2, "S"], true] },
    ])("returns new position and true if move is within the grid", ({ grid, position, occupied, expected }) => {
        expect(move(grid, position, occupied)).toEqual(expected);
    });

    test.each([
        { grid: [5, 5], position: [5, 3, "E"], occupied: [], expected: [[5, 3, "E"], false] },
        { grid: [5, 5], position: [2, 5, "N"], occupied: [], expected: [[2, 5, "N"], false] },
        { grid: [0, 0], position: [0, 0, "W"], occupied: [], expected: [[0, 0, "W"], false] },
        { grid: [3, 3], position: [2, 3, "N"], occupied: [], expected: [[2, 3, "N"], false] },
        { grid: [7, 3], position: [0, 3, "W"], occupied: [], expected: [[0, 3, "W"], false] },
        { grid: [7, 3], position: [5, 0, "S"], occupied: [], expected: [[5, 0, "S"], false] },
    ])("returns old position and false if move leads off the grid", ({ grid, position, occupied, expected }) => {
        expect(move(grid, position, occupied)).toEqual(expected);
    });

    test.each([
        { grid: [5, 5], position: [1, 4, "E"], occupied: [[3, 4, "E"]], expected: [[2, 4, "E"], true] },
        { grid: [5, 5], position: [2, 4, "N"], occupied: [[2, 4, "S"], [1, 4, "E"]], expected: [[2, 5, "N"], true] },
        { grid: [3, 3], position: [2, 3, "E"], occupied: [[1, 3, "E"]], expected: [[3, 3, "E"], true] },
        { grid: [4, 5], position: [1, 3, "E"], occupied: [[4, 2, "E"]], expected: [[2, 3, "E"], true] },
    ])("returns new position and true if move leads to unoccupied position", ({ grid, position, occupied, expected }) => {
        expect(move(grid, position, occupied)).toEqual(expected);
    });

    test.each([
        { grid: [5, 5], position: [1, 4, "E"], occupied: [[2, 4, "W"], [2, 5, "W"], [0, 1, "S"]], expected: [[1, 4, "E"], false] },
        { grid: [5, 5], position: [2, 4, "N"], occupied: [[2, 4, "W"], [2, 5, "W"], [0, 1, "S"]], expected: [[2, 4, "N"], false] },
        { grid: [0, 1], position: [0, 0, "N"], occupied: [[2, 4, "W"], [2, 5, "W"], [0, 1, "S"]], expected: [[0, 0, "N"], false] },
    ])("returns old position and false if move leads to occupied postion", ({ grid, position, occupied, expected }) => {
        expect(move(grid, position, occupied)).toEqual(expected);
    });
});