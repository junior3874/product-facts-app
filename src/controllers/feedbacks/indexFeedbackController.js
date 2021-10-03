export default class IndexFeedbackController {
  constructor(IndexFeedbackUseCase) {
    this.indexFeedbackUseCase = IndexFeedbackUseCase;
  }
  async handler() {
    try {
      await this.indexFeedbackUseCase.handler();

      return {
        error: false,
        message: "request make with sucess",
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
