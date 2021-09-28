import ShowFeedbackController from "../controllers/feedbacks/showFeedbackController";
import ShowFeedbacksWithAxios from "../infra/services/showFeedbackWithAxios";

function makeShowFeedbackControllerWithShowAxiosService() {
  const showFeedbacksWithAxios = new ShowFeedbacksWithAxios();
  return new ShowFeedbackController(showFeedbacksWithAxios);
}

export default makeShowFeedbackControllerWithShowAxiosService;
