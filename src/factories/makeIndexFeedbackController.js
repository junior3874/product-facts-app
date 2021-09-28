import IndexFeedbackController from "../controllers/feedbacks/indexFeedbackController";
import IndexFeedbacksWithAxios from "../infra/services/indexFeedbackWithAxios";

function makeIndexFeedbackControllerWithIndexAxiosService() {
  const indexFeedbackWithAxios = new IndexFeedbacksWithAxios();
  return new IndexFeedbackController(indexFeedbackWithAxios);
}

export default makeIndexFeedbackControllerWithIndexAxiosService;
