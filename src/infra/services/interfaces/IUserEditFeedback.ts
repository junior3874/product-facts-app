import Feedback from "../../../entity/Feedback";
import { ErrorResponseApi } from "./ErrorResponseApi";
import SucessResponseWithContentApi from "./SucessReponseWithContentApi";

export default interface IUserEditFeedback {
  handler(
    feedback: Feedback
  ): Promise<SucessResponseWithContentApi<Feedback> | ErrorResponseApi>;
}
