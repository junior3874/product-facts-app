import { Upvote } from "../../../entity/Feedback";
import { ErrorResponseApi } from "./ErrorResponseApi";
import SucessResponseApi from "./SucessResponseApi";

export interface IUserRemoveUpvote {
  handler(upvote: Upvote): Promise<SucessResponseApi | ErrorResponseApi>;
}
