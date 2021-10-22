const {
    isValidGrid,
    isValidPosition
} = require("./validation");

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