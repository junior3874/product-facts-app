import { describe, test, expect, jest } from "@jest/globals";
import MissingParams from "../../../entity/errors/MissingParams.js";

import verifyFieldsThatNotExists from "./verifyFieldsThatNotExists.js";
describe("testing verifyFieldsThatNotExists", () => {
  test("should validation fields with sucess", () => {
    const fields = {
      name: "testing",
      age: 31,
      fullName: "testing",
    };

    const response = verifyFieldsThatNotExists(fields);
    expect(response).toEqual(undefined);
  });
  test("should validation fields not sucess", () => {
    const fields = {
      name: undefined,
      age: 31,
      fullName: undefined,
    };
    const expectedResult = {
      name: undefined,
      fullName: undefined,
    };

    const response = () => verifyFieldsThatNotExists(fields);

    expect(response).toThrow(new MissingParams(expectedResult));
  });
});
