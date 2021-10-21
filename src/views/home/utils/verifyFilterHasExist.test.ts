import { expect, test, describe, jest } from "@jest/globals";
import verifyFilterHasExist from "./verifyFiltersHasExist";

describe("testing verify filters", () => {
  test("verify filter has exist with sucess", () => {
    const listFilters = ["testing 1", "testing"];
    const res = verifyFilterHasExist("testing 1", listFilters);
    expect(res).toEqual("testing 1");
  });
});
