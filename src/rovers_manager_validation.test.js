const validateManagerArguments = require("./rovers_manager_validation");

describe("validateManagerArguments", () => {
    test("throws an error if arguments missing", () => {
        expect(() => {
            validateManagerArguments();
        }).toThrow("grid is required");

        expect(() => {
            validateManagerArguments([3, 6]);
        }).toThrow("positions is required");

        expect(() => {
            validateManagerArguments([3, 6], [[1, 2, "N"], [3, 3, "E"]]);
        }).toThrow("instructions is required");
    });

    test("throws an error if arguments invalid", () => {
        expect(() => {
            validateManagerArguments([1, 5], [1, 5, "N"], ["LMLMLMLMM"]);
        }).toThrow("invalid positions");

        expect(() => {
            validateManagerArguments([1, 5], [[1, 5, "N"], [1, 5, "S"]], ["LMLMLMLMM", "LMLMM"]);
        }).toThrow("duplicate coordinates");

        expect(() => {
            validateManagerArguments([1, 5], [[1, 4, "E"]], "LMLMLSLMM");
        }).toThrow("invalid instructions");

        expect(() => {
            validateManagerArguments([1, 5], [[1, 4, "E"], [1, 2, "E"]], ["LMLMLLMM"]);
        }).toThrow("invalid instructions");
    });
});