import Feedback from "../../../entity/Feedback";
import { ErrorResponseApi } from "./ErrorResponseApi";
import SucessResponseWithContentApi from "./SucessReponseWithContentApi";

export default interface IShowFeedback {
  showFeedback(
    feedbackId: number
  ): Promise<SucessResponseWithContentApi<Feedback> | ErrorResponseApi>;
}
