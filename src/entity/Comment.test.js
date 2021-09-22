import { describe, test, expect, jest } from "@jest/globals";
import Comment from "./Comment";
import CommentDontHaveContent from "./errors/CommentDontHaveContent";
import CommentIsMoreThan from "./errors/CommentIsMoreThan";

describe("#Comment", () => {
  test("should it create comment with sucess", () => {
    const response = Comment.create({
      userId: 1,
      message: "Testing message",
      userProps: {},
    });

    expect(response instanceof Comment).toBeTruthy();
  });

  test("should it NOT create comment because message is more than 250 caracteres", () => {
    const response = () =>
      Comment.create({
        userId: 1,
        message:
          "Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,Testing message,",
        userProps: {},
      });

    expect(response).toThrow(new CommentIsMoreThan());
  });

  test("should it NOT create comment because message is empty", () => {
    const response = () =>
      Comment.create({
        userId: 1,
        message: "     ",
        userProps: {},
      });

    expect(response).toThrow(new CommentDontHaveContent());
  });
});
