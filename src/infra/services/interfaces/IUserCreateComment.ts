import { Comment } from "../../../entity/Feedback";
import { ErrorResponseApi } from "./ErrorResponseApi";
import SucessResponseWithContentApi from "./SucessReponseWithContentApi";

export interface IUserCreateComment {
  createComment(
    comment: Comment
  ): Promise<SucessResponseWithContentApi<Comment> | ErrorResponseApi>;
}
