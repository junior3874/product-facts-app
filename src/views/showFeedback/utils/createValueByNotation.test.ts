import { test, expect } from "@jest/globals";

import createValueByNotation from "./createValueByNotation";

test("create prop by notation", () => {
  const mockObject = {
    id: 1,
  };

  createValueByNotation(mockObject, "azi", 1);

  const expectedObject = {
    azi: 1,
    id: 1,
  };
  expect(mockObject).toEqual(expectedObject);
});
