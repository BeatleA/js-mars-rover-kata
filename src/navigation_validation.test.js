const {
    isValidGrid,
    isValidPosition,
    isValidPositionAndDirection,
    isValidOccupied,
    validateNavigationArguments
} = require("./navigation_validation");

describe("isValidGrid", () => {
    test("returns true when grid is valid", () => {
        expect(isValidGrid([5, 5])).toBe(true);
        const grid = [6, 7];
        expect(isValidGrid(grid)).toBe(true);
        const grid2 = [0, 0];
        expect(isValidGrid(grid2)).toBe(true);
        const grid3 = [6, 0];
        expect(isValidGrid(grid3)).toBe(true);
        const grid4 = [0, 7];
        expect(isValidGrid(grid4)).toBe(true);
    });

    test("returns false when grid is not valid", () => {
        expect(isValidGrid()).toBe(false);
        expect(isValidGrid(3, 4)).toBe(false);
        const grid = ["4", 2];
        expect(isValidGrid(grid)).toBe(false);
        const grid2 = [4, 2.4];
        expect(isValidGrid(grid2)).toBe(false);
        const grid3 = [1, -1];
        expect(isValidGrid(grid3)).toBe(false);
        const grid4 = [-1, 0];
        expect(isValidGrid(grid4)).toBe(false);
    });
});

describe("isValidPosition", () => {
    test("returns true when position is valid", () => {
        expect(isValidPosition(1, 2, 5, 5)).toBe(true);
        expect(isValidPosition(0, 0, 3, 6)).toBe(true);
        expect(isValidPosition(0, 4, 5, 4)).toBe(true);
        const grid = [6, 7];
        expect(isValidPosition(6, 7, ...grid)).toBe(true);
    });

    test("returns false when position is not valid", () => {
        expect(isValidPosition(6, 2, 5, 5)).toBe(false);
        expect(isValidPosition(1, 6, 5, 5)).toBe(false);
        expect(isValidPosition(-1, 0, 3, 6)).toBe(false);
        expect(isValidPosition(2, -1, 3, 6)).toBe(false);
        const grid = [5, 6];
        expect(isValidPosition(6, 7, ...grid)).toBe(false);
    });
});

describe("isValidPositionAndDirection", () => {
    test("returns true when position and direction are valid", () => {
        const grid = [6, 7];
        const position = [1, 2, "N"];
        expect(isValidPositionAndDirection(grid, position)).toBe(true);
        expect(isValidPositionAndDirection([5, 10], [5, 10, "S"])).toBe(true);
        expect(isValidPositionAndDirection([0, 0], [0, 0, "W"])).toBe(true);
        expect(isValidPositionAndDirection([5, 5], [1, 3, "E"])).toBe(true);
    });

    test("returns false when position or direction are not valid", () => {
        const grid = [5, 6];
        const position = [1, 2, "NS"];
        expect(isValidPositionAndDirection(grid, position)).toBe(false);
        expect(isValidPositionAndDirection([5, 5], [1, 3, "K"])).toBe(false);
        expect(isValidPositionAndDirection([0, 0], [0, 0, "n"])).toBe(false);
        expect(isValidPositionAndDirection([5, 5], [6, 3, "W"])).toBe(false);
        expect(isValidPositionAndDirection([5, 5], [6, 3, 4])).toBe(false);
        expect(isValidPositionAndDirection([5, 5], ["N", 3, "E"])).toBe(false);
        expect(isValidPositionAndDirection([5, 5], [1, 3, ""])).toBe(false);
    });
});

describe("isValidOccupied", () => {
    test("returns true when occupied is valid", () => {
        const grid = [5, 5];
        expect(isValidOccupied(grid, [[5, 5, "N"], [2, 3, "S"], [4, 1, "W"]])).toBe(true);
        const occupied = [[0, 0, "E"], [1, 2, "E"], [1, 3, "E"]];
        expect(isValidOccupied(grid, occupied)).toBe(true);
    });

    test("returns false when occupied is not valid", () => {
        const grid = [5, 5];
        expect(isValidOccupied()).toBe(false);
        expect(isValidOccupied(grid, 3, 4, "N")).toBe(false);
        const occupied = [["4", 2, "S"]];
        expect(isValidOccupied(grid, occupied)).toBe(false);
        const occupied2 = [[4, 2.4, "W"]];
        expect(isValidOccupied(grid, occupied2)).toBe(false);
        const occupied3 = [[1, -1, "E"]];
        expect(isValidOccupied(grid, occupied3)).toBe(false);
        const occupied4 = [[-1, 0, "E"]];
        expect(isValidOccupied(grid, occupied4)).toBe(false);
        const occupied5 = [[1, 0, "E"], [3, 2, "N"], [0, 4, "R"]];
        expect(isValidOccupied(grid, occupied5)).toBe(false);
        const occupied6 = [1, 0, "E"];
        expect(isValidOccupied(grid, occupied6)).toBe(false);
        const occupied7 = [[1, 0, "E"], [6, 0, "S"]];
        expect(isValidOccupied(grid, occupied7)).toBe(false);
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