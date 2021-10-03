export default class ShowFeedbackController {
  constructor(showFeedbackUseCase) {
    this.showFeedbackUseCase = showFeedbackUseCase;
  }

  async handler(id) {
    try {
      const response = await this.showFeedbackUseCase.handler(id);
      return {
        error: false,
        message: "request make with sucess",
        feedback: response,
      };
    } catch (err) {
      return {
        error: true,
        message: "feedback not exists",
        typeError: err,
      };
    }
  }
}
