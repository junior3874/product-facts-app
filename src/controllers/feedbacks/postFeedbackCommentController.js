import FieldIsMoreThan from "../../entity/errors/FieldIsMoreThan.js";
import MissingParams from "../../entity/errors/MissingParams.js";
export default class PostFeedbackCommentController {
  constructor(createCommentUseCase) {
    this.createCommentUseCase = createCommentUseCase;
  }
  async handler({ feedbackId, message, userProps }) {
    try {
      await this.createCommentUseCase.handler({
        feedbackId,
        message,
        userProps,
      });

      return {
        error: false,
        message: "comment created with sucess",
      };
    } catch (err) {
      return {
        error: true,
        typeError: err,
        message: err.message,
      };
    }
  }
}
