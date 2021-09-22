import CommentDontHaveContent from "./errors/CommentDontHaveContent.js";
import CommentIsMoreThan from "./errors/CommentIsMoreThan.js";

export default class Comment {
  constructor({ userId, message, userProps }) {
    this.userId = userId;
    this.message = message;
    this.userProps = userProps;
  }

  static create({ userId, message, userProps }) {
    CommentIsMoreThan.Validate(message);
    CommentDontHaveContent.Validate(message);

    return new Comment({ userId, message, userProps });
  }
}
