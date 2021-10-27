const manageRovers = require("./rovers_manager");

describe("manageRovers", () => {
    test("throws an error if arguments missing", () => {
        expect(() => {
            manageRovers();
        }).toThrow("grid is required");

        expect(() => {
            manageRovers([3, 6]);
        }).toThrow("positions is required");

        expect(() => {
            manageRovers([3, 6], [[1, 2, "N"], [3, 3, "E"]]);
        }).toThrow("instructions is required");
    });

    test("throws an error if arguments invalid", () => {
        expect(() => {
            manageRovers([1, 5], [1, 5, "N"], ["LMLMLMLMM"]);
        }).toThrow("invalid positions");

        expect(() => {
            manageRovers([1, 5], [[1, 5, "N"], [1, 5, "S"]], ["LMLMLMLMM", "LMLMM"]);
        }).toThrow("duplicate coordinates");

        expect(() => {
            manageRovers([1, 5], [[1, 4, "E"]], "LMLMLSLMM");
        }).toThrow("invalid instructions");

        expect(() => {
            manageRovers([1, 5], [[1, 4, "E"], [1, 2, "E"]], ["LMLMLLMM"]);
        }).toThrow("invalid instructions");
    });

    test("returns an array of new positions when all arguments valid and no clashes", () => {
        expect(manageRovers([3, 3], [[1, 2, "N"]], ["M"])).toEqual([[1, 3, "N"]]);
        expect(manageRovers([7, 4], [[1, 2, "N"], [2, 2, "N"]], ["LM", "RM"])).toEqual([[0, 2, "W"], [3, 2, "E"]]);
        expect(manageRovers([5, 5], [[1, 2, "N"], [3, 3, "E"]], ["LMLMLMLMM", "MMRMMRMRRM"])).toEqual([[1, 3, "N"], [5, 1, "E"]]);
        expect(manageRovers([15, 5], [[11, 3, "W"]], ["MLLMMRMM"])).toEqual([[12, 1, "S"]]);
        const result = manageRovers([10, 10], [[0, 0, "N"], [3, 3, "E"], [7, 5, "W"]], ["RMLM", "MMRM", "LLMMM"]);
        const expected = [[1, 1, "N"], [5, 2, "S"], [10, 5, "E"]];
        expect(result).toEqual(expected);
    });

    test("returns an array of last possible positions when all arguments valid but rovers clashing", () => {
        expect(manageRovers([7, 4], [[1, 2, "E"], [2, 2, "W"]], ["M", "RM"])).toEqual([[1, 2, "E"], [2, 3, "N"]]);
        expect(manageRovers([5, 5], [[3, 2, "N"], [3, 3, "E"]], ["LMRMRMLMM", "MMRMMRMRRM"])).toEqual([[2, 3, "E"], [5, 1, "E"]]);
        const result = manageRovers([10, 10], [[0, 0, "N"], [3, 3, "W"], [4, 5, "W"]], ["RMLM", "MMLMMR", "LMMMRMMM"]);
        const expected = [[1, 1, "N"], [1, 2, "S"], [2, 2, "W"]];
        expect(result).toEqual(expected);
        const result2 = manageRovers([10, 10], [[0, 0, "N"], [3, 3, "W"], [4, 3, "W"]], ["RMLM", "MRMRMRM", "M"]);
        const expected2 = [[1, 1, "N"], [3, 3, "S"], [4, 3, "W"]];
        expect(result2).toEqual(expected2);
    });
});