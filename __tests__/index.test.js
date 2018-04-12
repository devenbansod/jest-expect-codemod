var fs = require("fs");
var fixturesDirectory = "./__tests__/fixtures/";

describe("Transformation tests", () => {
  it("Transform Assert", () => {
    const changedSource = fs.readFileSync(
      fixturesDirectory + "assert/input.js",
      "utf-8",
    );
    const expectedSource = fs.readFileSync(
      fixturesDirectory + "assert/output.js",
      "utf-8",
    );
    expect(changedSource).toBe(expectedSource);
  });

  it("Transform ChaiAssert", () => {
    const changedSource = fs.readFileSync(
      fixturesDirectory + "chaiAssert/input.js",
      "utf-8",
    );
    const expectedSource = fs.readFileSync(
      fixturesDirectory + "chaiAssert/output.js",
      "utf-8",
    );

    expect(changedSource).toBe(expectedSource);
  });

  it("Transform ChaiExpect", () => {
    const changedSource = fs.readFileSync(
      fixturesDirectory + "chaiExpect/input.js",
      "utf-8",
    );
    const expectedSource = fs.readFileSync(
      fixturesDirectory + "chaiExpect/output.js",
      "utf-8",
    );

    expect(changedSource).toBe(expectedSource);
  });

  it("Transform ExpectInstanceOf", () => {
    const changedSource = fs.readFileSync(
      fixturesDirectory + "expectInstanceOf/input.js",
      "utf-8",
    );
    const expectedSource = fs.readFileSync(
      fixturesDirectory + "expectInstanceOf/output.js",
      "utf-8",
    );

    expect(changedSource).toBe(expectedSource);
  });

  it("Transform ExpectToBeUndefined", () => {
    const changedSource = fs.readFileSync(
      fixturesDirectory + "expectToBeUndefined/input.js",
      "utf-8",
    );
    const expectedSource = fs.readFileSync(
      fixturesDirectory + "expectToBeUndefined/output.js",
      "utf-8",
    );

    expect(changedSource).toBe(expectedSource);
  });
});
