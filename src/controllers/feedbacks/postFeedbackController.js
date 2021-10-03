export default class PostFeedbackController {
  constructor(createCommentUseCase) {
    this.createFeedbackUseCase = createCommentUseCase;
  }

  async handler({ user, title, category, status, description }) {
    try {
      await this.createFeedbackUseCase.handler({
        user,
        title,
        category,
        status,
        description,
      });

      return {
        error: false,
        message: "feedback created with sucess",
      };
    } catch (err) {
      return { error: true, typeError: err };
    }
  }
}
