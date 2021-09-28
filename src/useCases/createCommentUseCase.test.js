import { describe, test, expect, jest } from "@jest/globals";
import CreateCommentUseCase from "./createCommentUseCase";

describe("#Create comment use case", () => {
  test("should it create comment with sucess", async () => {
    const mockShowFeedback = {
      show: jest.fn(),
    };

    const userData = {
      feedbackId: 1,
      message: "testing message",
      userProps: {},
    };

    const showFeedbackResponseMock = {
      id: userData.feedbackId,
      title: "testing",
      category: "testing",
      upvotes: 42,
      status: "testing",
      description: "testing",
    };

    mockShowFeedback.show.mockResolvedValue(showFeedbackResponseMock);

    const createCommentUseCase = new CreateCommentUseCase(mockShowFeedback);

    const response = await createCommentUseCase.create(userData);

    const mockExpectedResult = {
      id: userData.feedbackId,
      title: "testing",
      category: "testing",
      upvotes: 42,
      status: "testing",
      description: "testing",
      comments: [
        {
          id: 1,
          content: userData.message,
          user: userData.userProps,
        },
      ],
    };
    expect(response).toEqual(mockExpectedResult);
  });
});
