import Feedback from "../../../entity/Feedback";
import { ErrorResponseApi } from "./ErrorResponseApi";
import SucessResponseWithContentApi from "./SucessReponseWithContentApi";

export interface IUserIndexFeedbacks {
  userIndexFeedbacks(
    userId: number
  ): Promise<SucessResponseWithContentApi<Feedback[]> | ErrorResponseApi>;
}
