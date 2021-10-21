import Feedback from "../../../entity/Feedback";
import { ErrorResponseApi } from "./ErrorResponseApi";
import SucessResponseWithContentApi from "./SucessReponseWithContentApi";

export interface IIndexFeedbacks {
  indexFeedbacks(
    params: Object
  ): Promise<SucessResponseWithContentApi<Feedback[]> | ErrorResponseApi>;
}
