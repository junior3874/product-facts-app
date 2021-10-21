import { Description, Title } from "../../entity/Feedback";
import { FnValidations } from "./validationFields";
import { expect, test, describe, jest } from "@jest/globals";
import validationFields from "./validationFields";

describe("validation fields in create feedback", () => {
  const fields: FnValidations = {
    ["title"]: (value: string) => {
      const tratedValue = value.trim();
      if (!tratedValue || tratedValue.length > Title.maxSize) {
        return true;
      }
    },
    ["description"]: (value: string) => {
      const tratedValue = value.trim();
      if (!tratedValue || tratedValue.length > Description.maxSize) {
        return true;
      }
    },
    ["category"]: (value: string) => {
      if (!value) return true;
    },
  };

  test("testing validation fields with one param", () => {
    const mockExpectedField = {
      value:
        "testing testingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtesting ",
      togglingError: jest.fn(),
      fieldName: "title",
    };

    const res = validationFields(fields, mockExpectedField);
    expect(res).toEqual(false);
    expect(mockExpectedField.togglingError).toHaveBeenCalledWith(true);
  });

  test("testing validation with  two params", () => {
    const mockExpectedField = [
      {
        value:
          "testing testingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtesting ",
        togglingError: jest.fn(),
        fieldName: "title",
      },
      {
        value:
          "testing testingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtestingtesting ",
        togglingError: jest.fn(),
        fieldName: "description",
      },
    ];

    const res = validationFields(fields, ...mockExpectedField);
    expect(res).toEqual(false);
    expect(mockExpectedField[0].togglingError).toHaveBeenCalledWith(true);
    expect(mockExpectedField[1].togglingError).toHaveBeenCalledWith(false);
  });
});
