import PostFeedbackCommentController from "../controllers/feedbacks/postFeedbackCommentController";
import ShowFeedbacksWithAxios from "../infra/services/showFeedbackWithAxios";
import CreateCommentUseCase from "../useCases/createCommentUseCase";

export default function makePostFeedbackCommentController() {
  const showFeedbackWithAxios = new ShowFeedbacksWithAxios();
  const createCommentUseCase = new CreateCommentUseCase(showFeedbackWithAxios);
  const postFeedbackCommentController = new PostFeedbackCommentController(
    createCommentUseCase
  );
  return postFeedbackCommentController;
}
