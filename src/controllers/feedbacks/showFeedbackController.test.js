import { describe, test, expect, jest } from "@jest/globals";
import FeedbackNotFound from "../../infra/services/errors/FeedbackNotFoundError";
import ShowFeedbackController from "./showFeedbackController";

describe("#show feedback controller", () => {
  const makeSut = () => {
    const mockShowFeedbackUseCase = {
      handler: jest.fn(),
    };

    const sut = new ShowFeedbackController(mockShowFeedbackUseCase);

    return { sut, spy: mockShowFeedbackUseCase.handler };
  };

  test("should it show feedback with sucess", async () => {
    const { sut, spy } = makeSut();

    spy.mockResolvedValue({ id: 1 });
    const response = await sut.handler(1);

    const expectedResult = {
      error: false,
      message: "request make with sucess",
      feedback: {
        id: 1,
      },
    };

    expect(response).toEqual(expectedResult);
    expect(spy).toHaveBeenCalledWith(1);
  });

  test("should not show feedback because feedback dont exist", async () => {
    const { sut, spy } = makeSut();

    spy.mockImplementation(() => {
      throw new FeedbackNotFound(1);
    });
    const response = await sut.handler(1);

    const expectedResult = {
      error: true,
      message: "feedback not exists",
      typeError: new FeedbackNotFound(),
    };

    expect(response).toEqual(expectedResult);
    expect(spy).toHaveBeenCalledWith(1);
  });
});
