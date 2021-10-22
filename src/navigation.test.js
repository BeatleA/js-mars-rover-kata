const {
    navigateRover,
    move
} = require("./navigation");

describe("navigateRover", () => {
    test("throws an error if arguments missing", () => {
        expect(() => {
            navigateRover();
        }).toThrow("grid is required");

        expect(() => {
            navigateRover([5, 5]);
        }).toThrow("position is required");

        expect(() => {
            navigateRover([5, 5], [1, 2, "N"]);
        }).toThrow("instructions is required");
    });

    test("throws an error if arguments invalid", () => {
        expect(() => {
            navigateRover([-1, 5], [1, 2, "N"], "LMLMLMLMM");
        }).toThrow("invalid grid");

        expect(() => {
            navigateRover([1, 5], [1, 6, "N"], "LMLMLMLMM");
        }).toThrow("invalid position");

        expect(() => {
            navigateRover([1, 5], [1, 2, "K"], "LMLMLMLMM");
        }).toThrow("invalid position");

        expect(() => {
            navigateRover([1, 5], [1, 4, "E"], "LMLMLSLMM");
        }).toThrow("invalid instructions");
    });

    test("returns new position when instructions correct", () => {
        expect(navigateRover([3, 3], [1, 2, "N"], "M")).toEqual([1, 3, "N"]);
        expect(navigateRover([7, 4], [1, 2, "N"], "LM")).toEqual([0, 2, "W"]);
        expect(navigateRover([5, 5], [1, 2, "N"], "LMLMLMLMM")).toEqual([1, 3, "N"]);
        expect(navigateRover([5, 5], [3, 3, "E"], "MMRMMRMRRM")).toEqual([5, 1, "E"]);
        expect(navigateRover([15, 5], [11, 3, "W"], "MLLMMRMM")).toEqual([12, 1, "S"]);
    });

    test("returns last possible position when instructions lead off the grid", () => {
        expect(navigateRover([3, 3], [1, 3, "N"], "M")).toEqual([1, 3, "N"]);
        expect(navigateRover([3, 3], [0, 0, "E"], "MMLMMLLMMM")).toEqual([2, 0, "S"]);
        expect(navigateRover([0, 0], [0, 0, "W"], "MMLMMLLMMM")).toEqual([0, 0, "W"]);
        expect(navigateRover([5, 4], [5, 4, "W"], "LMLMRR")).toEqual([5, 3, "E"]);
    });
});

describe("move", () => {
    test("returns new position if move is within the grid", () => {
        expect(move([5, 5], [1, 4, "E"])).toEqual([2, 4, "E"]);
        expect(move([5, 5], [2, 4, "N"])).toEqual([2, 5, "N"]);
        expect(move([0, 1], [0, 0, "N"])).toEqual([0, 1, "N"]);
        expect(move([3, 3], [2, 3, "E"])).toEqual([3, 3, "E"]);
        expect(move([3, 3], [3, 3, "W"])).toEqual([2, 3, "W"]);
        expect(move([3, 3], [3, 3, "S"])).toEqual([3, 2, "S"]);
    });

    test("returns old position if move leads off the grid", () => {
        expect(move([5, 5], [5, 3, "E"])).toEqual([5, 3, "E"]);
        expect(move([5, 5], [2, 5, "N"])).toEqual([2, 5, "N"]);
        expect(move([0, 0], [0, 0, "W"])).toEqual([0, 0, "W"]);
        expect(move([3, 3], [2, 3, "N"])).toEqual([2, 3, "N"]);
        expect(move([7, 3], [0, 3, "W"])).toEqual([0, 3, "W"]);
        expect(move([7, 3], [5, 0, "S"])).toEqual([5, 0, "S"]);
    });
});