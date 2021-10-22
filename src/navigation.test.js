const navigateRover = require("./navigation");

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
    });
});