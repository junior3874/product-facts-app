import { describe, test, expect, jest } from "@jest/globals";
import ApiNotFoundError from "../../infra/services/errors/ApiNotFoundError";

import IndexFeedbackController from "./indexFeedbackController";

describe("#IndexFeedbackController", () => {
  const makeSut = () => {
    const mockIndexFeedbacksUseCase = {
      handler: jest.fn(),
    };

    const sut = new IndexFeedbackController(mockIndexFeedbacksUseCase);

    return { sut, spy: mockIndexFeedbacksUseCase.handler };
  };
  test("should index feedbacks with a sucess", async () => {
    const { sut, spy } = makeSut();

    const mockResponse = {
      error: false,
      message: "request make with sucess",
    };

    const response = await sut.handler();
    expect(spy).toHaveBeenCalled();
    expect(response).toEqual(mockResponse);
  });

  test("should not index feedbacks, because api is not active", async () => {
    const { sut, spy } = makeSut();

    spy.mockImplementationOnce(() => {
      throw new ApiNotFoundError();
    });

    const response = await sut.handler();

    const objectError = {
      error: true,
      typeError: new ApiNotFoundError(),
      message: new ApiNotFoundError().message,
    };

    expect(response).toEqual(objectError);
  });
});
