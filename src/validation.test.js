const isValidPosition = require("./validation");

test("returns true when position is valid", () => {
    expect(isValidPosition(1, 2, 5, 5)).toBeTruthy;
    expect(isValidPosition(0, 0, 3, 6)).toBeTruthy;
    expect(isValidPosition(0, 4, 5, 4)).toBeTruthy;
    const grid = [6, 7];
    expect(isValidPosition(6, 7, [...grid])).toBeTruthy;
});

test("returns false when position is not valid", () => {
    expect(isValidPosition(6, 2, 5, 5)).toBeFalsy;
    expect(isValidPosition(1, 6, 5, 5)).toBeFalsy;
    expect(isValidPosition(-1, 0, 3, 6)).toBeFalsy;
    expect(isValidPosition(2, -1, 3, 6)).toBeFalsy;
    const grid = [5, 6];
    expect(isValidPosition(6, 7, [...grid])).toBeFalsy;
});