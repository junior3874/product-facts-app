import { describe, test, expect, jest } from "@jest/globals";
import FieldIsMoreThan from "../../entity/errors/FieldIsMoreThan";
import MissingParam from "../../entity/errors/MissingParam";
import Message from "../../entity/valuesObject/message";
import PostFeedbackCommentController from "./postFeedbackCommentController";

describe("#postFeedbackComment", () => {
  const makeSut = () => {
    const mockPostFeedbacksUseCase = {
      handler: jest.fn(),
    };

    const sut = new PostFeedbackCommentController(mockPostFeedbacksUseCase);

    return { sut, spy: mockPostFeedbacksUseCase.handler };
  };

  test("should create comment with sucess", async () => {
    const { sut, spy } = makeSut();

    const response = await sut.handler({
      feedbackId: 1,
      message: "testing",
      userProps: {},
    });

    const mockResponse = {
      error: false,
      message: "comment created with sucess",
    };

    expect(response).toEqual(mockResponse);
    expect(spy).toHaveBeenCalledWith({
      feedbackId: 1,
      message: "testing",
      userProps: {},
    });
  });
  test("should NOT create comment because message is empty", async () => {
    const { sut, spy } = makeSut();

    spy.mockImplementationOnce(() => {
      throw new MissingParam("message");
    });

    const expectedResult = {
      error: true,
      typeError: new MissingParam("message"),
      message: new MissingParam("message").message,
    };

    const response = await sut.handler({
      feedbackId: 1,
      userProps: {},
      message: "",
    });

    expect(response).toEqual(expectedResult);
    expect(spy).toHaveBeenCalled();
  });

  test("should it NOT create comment because message is bigger that 250 caracteres", async () => {
    const mockPostCommentFeedbackUseCase = {
      handler: jest.fn(),
    };

    const { sut, spy } = makeSut();
    spy.mockImplementationOnce(() => {
      throw new FieldIsMoreThan("message", Message.maxMessageSize);
    });

    const expectedResult = {
      error: true,
      typeError: new FieldIsMoreThan("message", Message.maxMessageSize),
      message: new FieldIsMoreThan("message", Message.maxMessageSize).message,
    };

    const response = await sut.handler({
      feedbackId: 1,
      userProps: {},
      message: "",
    });
    expect(response).toEqual(expectedResult);
  });
});
