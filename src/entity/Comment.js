import CommentDontHaveContent from "./errors/CommentDontHaveContent.js";
import CommentIsMoreThan from "./errors/CommentIsMoreThan.js";

export default class Comment {
  constructor({ feedbackId, message, userProps }) {
    this.feedbackId = feedbackId;
    this.message = message;
    this.userProps = userProps;
  }

  static create({ feedbackId, message, userProps }) {
    CommentIsMoreThan.Validate(message);
    CommentDontHaveContent.Validate(message);

    return new Comment({ feedbackId, message, userProps });
  }
}
