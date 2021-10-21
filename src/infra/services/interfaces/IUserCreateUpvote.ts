import { Upvote } from "../../../entity/Feedback";
import { ErrorResponseApi } from "./ErrorResponseApi";
import SucessResponseWithContentApi from "./SucessReponseWithContentApi";

export interface IUserCreateUpvote {
  handler(
    upvote: Upvote
  ): Promise<SucessResponseWithContentApi<Upvote> | ErrorResponseApi>;
}
