import { describe, test, expect, jest } from "@jest/globals";
import PostFeedbackController from "./postFeedbackController";

describe("#Post feedback testing", () => {
  const makeSut = () => {
    const mockPostFeedbackUseCase = {
      handler: jest.fn(),
    };

    const sut = new PostFeedbackController(mockPostFeedbackUseCase);

    return { sut, spy: mockPostFeedbackUseCase.handler };
  };
  test("should create new feedback with sucess", async () => {
    const { sut, spy } = makeSut();

    const feedback = {
      user: {},
      title: "testing",
      category: "testing",
      status: "testing",
      description: "testing",
    };

    const response = await sut.handler(feedback);

    const mockResponse = {
      error: false,
      message: "feedback created with sucess",
    };

    expect(response).toEqual(mockResponse);
    expect(spy).toHaveBeenCalledWith(feedback);
  });

  test("should NOT create new feedback because ocurred any error", async () => {
    const { sut, spy } = makeSut();

    spy.mockImplementationOnce(() => {
      throw new Error("any error");
    });

    const response = await sut.handler({
      user: {},
      title: "testing",
      category: "testing",
      status: "testing",
      description: "testing",
    });

    const expectedResponse = {
      error: true,
      typeError: new Error("any error"),
    };
    expect(response).toEqual(expectedResponse);
  });
});
