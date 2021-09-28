import FeedbackNotFound from "../infra/services/errors/FeedbackNotFoundError";
import CommentDataDTO from "./DTO'S/commentData";

export default class CreateCommentUseCase {
  constructor(feedbackStorage) {
    this.feedbackStorage = feedbackStorage;
  }

  async handler(commentData) {
    const findFeedback = await this.feedbackStorage.show(commentData.id);
    if (!findFeedback) throw new FeedbackNotFound();

    findFeedback.comments ??= [];
    const generateUUID = findFeedback.comments.length + 1;
    const commenDataTrated = new CommentDataDTO({
      ...commentData,
      id: generateUUID,
    });
    findFeedback.comments.push(commenDataTrated);
    return findFeedback;
  }
}
