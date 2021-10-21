import Feedback from "../../../entity/Feedback";
import { feedbackDTO } from "../DTO/feedbackDTO";
import { ErrorResponseApi } from "./ErrorResponseApi";
import SucessResponseWithContentApi from "./SucessReponseWithContentApi";

export interface IUserCreateFeedback {
  createFeedback(
    feedback: feedbackDTO
  ): Promise<SucessResponseWithContentApi<Feedback> | ErrorResponseApi>;
}
