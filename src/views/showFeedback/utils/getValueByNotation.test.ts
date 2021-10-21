import { test, expect } from "@jest/globals";

import getValueByNotation from "./getValueByNotation";
test("testing function", () => {
  const mockObject = {
    test: {
      id: 1,
    },
  };

  const res = getValueByNotation(mockObject, "test.id");
  expect(res).toEqual(1);
});
