const {
    isValidGrid,
    isValidPosition,
    isValidPositionAndDirection,
    isValidOccupied,
    validateNavigationArguments
} = require("./navigation_validation");

describe("isValidGrid", () => {
    test.each([
        [[5, 5]],
        [[6, 7]],
        [[0, 0]],
        [[6, 0]],
        [[0, 7]],
    ])("returns true when grid is valid: grid = %p", grid => {
        expect(isValidGrid(grid)).toBe(true);
    });

    test.each([
        [3, 4],
        [["4", 2]],
        [[4, 2.4]],
        [[1, -1]],
        [[-1, 0]],
    ])("returns false when grid is invalid: grid = %p", grid => {
        expect(isValidGrid(grid)).toBe(false);
    });
});

describe("isValidPosition", () => {
    test.each([
        [1, 2, 5, 5],
        [0, 0, 3, 6],
        [0, 4, 5, 4],
        [6, 7, 6, 7],
    ])("returns true when position is valid: x = %d, y = %d, maxX = %d, maxY = %d", (x, y, maxX, maxY) => {
        expect(isValidPosition(x, y, maxX, maxY)).toBe(true);
    });

    test.each([
        [6, 2, 5, 5],
        [1, 6, 5, 5],
        [-1, 0, 3, 6],
        [2, -1, 3, 6],
        [6, 7, 5, 6],
    ])("returns false when position is invalid: x = %d, y = %d, maxX = %d, maxY = %d", (x, y, maxX, maxY) => {
        expect(isValidPosition(x, y, maxX, maxY)).toBe(false);
    });
});

describe("isValidPositionAndDirection", () => {
    test.each([
        { grid: [6, 7], position: [1, 2, "N"] },
        { grid: [5, 10], position: [5, 10, "S"] },
        { grid: [0, 0], position: [0, 0, "W"] },
        { grid: [5, 5], position: [1, 3, "E"] },
    ])("returns true when position and direction are valid: grid = $grid, position = $position", ({ grid, position }) => {
        expect(isValidPositionAndDirection(grid, position)).toBe(true);
    });

    test.each([
        { grid: [5, 6], position: [1, 2, "NS"] },
        { grid: [5, 5], position: [1, 3, "K"] },
        { grid: [0, 0], position: [0, 0, "n"] },
        { grid: [5, 5], position: [6, 3, "W"] },
        { grid: [5, 5], position: [6, 3, 4] },
        { grid: [5, 5], position: ["N", 3, "E"] },
        { grid: [5, 5], position: [1, 3, ""] },
    ])("returns false when position or direction are invalid: grid = $grid, position = $position", ({ grid, position }) => {
        expect(isValidPositionAndDirection(grid, position)).toBe(false);
    });
});

describe("isValidOccupied", () => {
    test.each([
        { grid: [5, 5], occupied: [[5, 5, "N"], [2, 3, "S"], [4, 1, "W"]] },
        { grid: [5, 5], occupied: [[0, 0, "E"], [1, 2, "E"], [1, 3, "E"]] },
        { grid: [7, 3], occupied: [[4, 2, "S"]] },
        { grid: [4, 3], occupied: [] },
    ])("returns true when occupied is valid: %j", ({ grid, occupied }) => {
        expect(isValidOccupied(grid, occupied)).toBe(true);
    });

    test.each([
        { grid: [5, 5], occupied: null },
        { grid: [5, 5], occupied: (3, 4, "N") },
        { grid: [7, 3], occupied: [["4", 2, "S"]] },
        { grid: [4, 3], occupied: [[4, 2.4, "W"]] },
        { grid: [5, 3], occupied: [[1, -1, "E"]] },
        { grid: [3, 3], occupied: [[-1, 0, "E"]] },
        { grid: [5, 3], occupied: [[1, 0, "E"], [3, 2, "N"], [0, 4, "R"]] },
        { grid: [5, 5], occupied: [1, 0, "E"] },
        { grid: [5, 5], occupied: [[1, 0, "E"], [6, 0, "S"]] },
    ])("returns false when occupied is invalid: %j", ({ grid, occupied }) => {
        expect(isValidOccupied(grid, occupied)).toBe(false);
    });
});

describe("validateNavigationArguments", () => {
    test("throws an error if arguments missing", () => {
        expect(() => {
            validateNavigationArguments();
        }).toThrow("grid is required");

        expect(() => {
            validateNavigationArguments([5, 5]);
        }).toThrow("position is required");

        expect(() => {
            validateNavigationArguments([5, 5], [1, 2, "N"]);
        }).toThrow("instructions is required");

        expect(() => {
            validateNavigationArguments([5, 5], [1, 2, "N"], "LMLMLMLMM");
        }).toThrow("occupied is required");
    });

    test("throws an error if arguments invalid", () => {
        expect(() => {
            validateNavigationArguments([-1, 5], [1, 2, "N"], "LMLMLMLMM", []);
        }).toThrow("invalid grid");

        expect(() => {
            validateNavigationArguments([1, 5], [1, 6, "N"], "LMLMLMLMM", []);
        }).toThrow("invalid position");

        expect(() => {
            validateNavigationArguments([1, 5], [1, 2, "K"], "LMLMLMLMM", []);
        }).toThrow("invalid position");

        expect(() => {
            validateNavigationArguments([1, 5], [1, 4, "E"], "LMLMLSLMM", []);
        }).toThrow("invalid instructions");

        expect(() => {
            validateNavigationArguments([1, 5], [1, 4, "E"], "LMLMLLMM", [1, 2, "S"]);
        }).toThrow("invalid occupied");
    });
});