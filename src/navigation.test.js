const {
    navigateRover,
    move
} = require("./navigation");

describe("navigateRover", () => {
    test("returns new position when instructions correct and no clashes", () => {
        expect(navigateRover([3, 3], [1, 2, "N"], "M", [])).toEqual([1, 3, "N"]);
        expect(navigateRover([7, 4], [1, 2, "N"], "LM", [[0, 0, "W"]])).toEqual([0, 2, "W"]);
        expect(navigateRover([5, 5], [1, 2, "N"], "LMLMLMLMM", [[3, 3, "E"]])).toEqual([1, 3, "N"]);
        const occupied = [[2, 4, "W"], [2, 5, "W"], [0, 1, "S"]];
        expect(navigateRover([5, 5], [3, 3, "E"], "MMRMMRMRRM", occupied)).toEqual([5, 1, "E"]);
        expect(navigateRover([15, 5], [11, 3, "W"], "MLLMMRMM", occupied)).toEqual([12, 1, "S"]);
    });

    test("returns last possible position when instructions lead off the grid", () => {
        expect(navigateRover([3, 3], [1, 3, "N"], "M", [])).toEqual([1, 3, "N"]);
        expect(navigateRover([3, 3], [0, 0, "E"], "MMLMMLLMMM", [])).toEqual([2, 0, "S"]);
        expect(navigateRover([0, 0], [0, 0, "W"], "MMLMMLLMMM", [])).toEqual([0, 0, "W"]);
        expect(navigateRover([5, 4], [5, 4, "W"], "LMLMRR", [])).toEqual([5, 3, "E"]);
    });

    test("returns last possible position when instructions lead to occupied position", () => {
        const occupied = [[4, 2, "W"], [1, 3, "W"], [4, 3, "E"], [1, 5, "S"]];
        expect(navigateRover([5, 5], [1, 2, "N"], "M", occupied)).toEqual([1, 2, "N"]);
        expect(navigateRover([4, 6], [0, 0, "E"], "MMLMMRMMM", occupied)).toEqual([3, 2, "E"]);
        expect(navigateRover([4, 5], [0, 0, "N"], "MMMMRMLM", occupied)).toEqual([1, 4, "N"]);
        expect(navigateRover([5, 5], [5, 4, "W"], "MLML", occupied)).toEqual([4, 4, "S"]);
    });
});

describe("move", () => {
    test("returns new position and true if move is within the grid", () => {
        expect(move([5, 5], [1, 4, "E"], [])).toEqual([[2, 4, "E"], true]);
        expect(move([5, 5], [2, 4, "N"], [])).toEqual([[2, 5, "N"], true]);
        expect(move([0, 1], [0, 0, "N"], [])).toEqual([[0, 1, "N"], true]);
        expect(move([3, 3], [2, 3, "E"], [])).toEqual([[3, 3, "E"], true]);
        expect(move([3, 3], [3, 3, "W"], [])).toEqual([[2, 3, "W"], true]);
        expect(move([3, 3], [3, 3, "S"], [])).toEqual([[3, 2, "S"], true]);
    });

    test("returns old position and false if move leads off the grid", () => {
        expect(move([5, 5], [5, 3, "E"], [])).toEqual([[5, 3, "E"], false]);
        expect(move([5, 5], [2, 5, "N"], [])).toEqual([[2, 5, "N"], false]);
        expect(move([0, 0], [0, 0, "W"], [])).toEqual([[0, 0, "W"], false]);
        expect(move([3, 3], [2, 3, "N"], [])).toEqual([[2, 3, "N"], false]);
        expect(move([7, 3], [0, 3, "W"], [])).toEqual([[0, 3, "W"], false]);
        expect(move([7, 3], [5, 0, "S"], [])).toEqual([[5, 0, "S"], false]);
    });

    test("returns new position and true if move leads to unoccupied position", () => {
        expect(move([5, 5], [1, 4, "E"], [[3, 4, "E"]])).toEqual([[2, 4, "E"], true]);
        expect(move([5, 5], [2, 4, "N"], [[2, 4, "S"], [1, 4, "E"]])).toEqual([[2, 5, "N"], true]);
        expect(move([3, 3], [2, 3, "E"], [[1, 3, "E"]])).toEqual([[3, 3, "E"], true]);
        expect(move([4, 5], [1, 3, "E"], [[4, 2, "E"]])).toEqual([[2, 3, "E"], true]);
    });

    test("returns old position and false if move leads to occupied postion", () => {
        const occupied = [[2, 4, "W"], [2, 5, "W"], [0, 1, "S"]];
        expect(move([5, 5], [1, 4, "E"], occupied)).toEqual([[1, 4, "E"], false]);
        expect(move([5, 5], [2, 4, "N"], occupied)).toEqual([[2, 4, "N"], false]);
        expect(move([0, 1], [0, 0, "N"], occupied)).toEqual([[0, 0, "N"], false]);
    });
});