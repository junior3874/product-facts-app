import { describe, test, expect, jest } from "@jest/globals";
import Comment from "../../entity/Comment";
import PostReplyFeedbackCommentController from "./postReplyFeedbackCommentController";

describe("#postReplyFeedbackCommentController", () => {
  const makeSut = () => {
    const mockPostFeedbackReplyCommentUseCase = {
      handler: jest.fn(),
    };

    const sut = new PostReplyFeedbackCommentController(
      mockPostFeedbackReplyCommentUseCase
    );

    return { sut, spy: mockPostFeedbackReplyCommentUseCase.handler };
  };
  test("should it create replay feedback with sucess", async () => {
    const { sut, spy } = makeSut();

    const response = await sut.handler({
      feedbackId: 1,
      userProps: {},
      message: "testing message",
      commentReplyId: 1,
    });

    const expectedResult = {
      error: false,
      message: "comment reply created with sucess",
    };

    expect(response).toEqual(expectedResult);
    expect(spy).toHaveBeenCalledWith({
      feedbackId: 1,
      userProps: {},
      message: "testing message",
      commentReplyId: 1,
    });
  });

  test("should NOT create reply feedback, because ocurred any error in other layers", async () => {
    const { sut, spy } = makeSut();

    spy.mockImplementation(() => {
      throw new Error("any error");
    });

    const response = await sut.handler({});

    const expectedResponse = {
      error: true,
      typeError: new Error("any error"),
    };

    expect(response).toEqual(expectedResponse);
  });
});
