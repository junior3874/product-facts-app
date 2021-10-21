import { User } from "@/entity/Feedback";

export type replyCommentDTO = {
  content: string;
  user: User;
  commentId: number;
};
