import Comment from "../../entity/Comment";
import MissingParam from "../../entity/errors/MissingParam";

export default class PostReplyFeedbackCommentController {
  constructor(postReplyFeedbackUseCase) {
    this.postReplyFeedbackUseCase = postReplyFeedbackUseCase;
  }

  async handler({ feedbackId, message, userProps, commentReplyId }) {
    try {
      await this.postReplyFeedbackUseCase.handler({
        feedbackId,
        message,
        userProps,
        commentReplyId,
      });

      return {
        error: false,
        message: "comment reply created with sucess",
      };
    } catch (err) {
      return {
        error: true,
        typeError: err,
      };
    }
  }
}
