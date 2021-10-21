import { Repliy } from "../../../entity/Feedback";
import { replyCommentDTO } from "../DTO/replyCommentDTO";
import { ErrorResponseApi } from "./ErrorResponseApi";
import SucessResponseWithContentApi from "./SucessReponseWithContentApi";

export interface IUserCreateReplyComment {
  createReplyComment(
    comment: replyCommentDTO
  ): Promise<SucessResponseWithContentApi<Repliy> | ErrorResponseApi>;
}
