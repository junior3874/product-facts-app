import sortedBy from "@/infra/utils/sortedBy";
import axios, { AxiosInstance } from "axios";
import Feedback, { Comment, Repliy, User } from "../../entity/Feedback";
import { feedbackDTO } from "./DTO/feedbackDTO";
import { replyCommentDTO } from "./DTO/replyCommentDTO";
import { ErrorResponseApi } from "./interfaces/ErrorResponseApi";
import { IGetUser } from "./interfaces/IGetUser";
import { IIndexFeedbacks } from "./interfaces/IIndexFeedbacks";
import IShowFeedback from "./interfaces/iShowFeedback";
import { IUserCreateComment } from "./interfaces/IUserCreateComment";
import { IUserCreateFeedback } from "./interfaces/IUserCreateFeedback";
import { IUserCreateReplyComment } from "./interfaces/IUserCreateReplyComment";
import { IUserIndexFeedbacks } from "./interfaces/IUserIndexFeedbacks";
import SucessReponseWithContentApi from "./interfaces/SucessReponseWithContentApi";

export default class FeedbackServicesWithAxios
  implements
    IUserCreateComment,
    IUserCreateFeedback,
    IShowFeedback,
    IIndexFeedbacks,
    IUserCreateReplyComment,
    IGetUser,
    IUserIndexFeedbacks
{
  api: AxiosInstance;
  constructor() {
    this.api = axios.create({
      baseURL: "/",
      timeout: 12000,
    });
  }
  async userIndexFeedbacks(
    userId: number
  ): Promise<SucessReponseWithContentApi<Feedback[]> | ErrorResponseApi> {
    const feedbacks = await this.indexFeedbacks({});
    if (feedbacks.error) {
      return {
        error: true,
        message: "feedbacks listing with sucess",
      };
    }

    const filteredFeedbacks = feedbacks.values.filter(
      (feedback) => feedback.user.id == userId
    );

    return {
      error: false,
      message: "feedbacks listing with sucess",
      values: filteredFeedbacks,
    };
  }
  async createFeedback(
    feedback: feedbackDTO
  ): Promise<SucessReponseWithContentApi<Feedback> | ErrorResponseApi> {
    const res = await this.api.post("/feedback").then();

    const expectedFeedback = {
      ...feedback,
      id: Math.floor(Math.random() * 1000),
      comments: [],
      upvotes: [],
    } as unknown as Feedback;

    return {
      error: false,
      message: "feedback created with sucess",
      values: expectedFeedback,
    };
  }
  async showUser(): Promise<
    SucessReponseWithContentApi<Feedback> | ErrorResponseApi
  > {
    const res = await this.api.get("static-user.json").then((res) => res.data);

    return {
      error: false,
      message: "user get with sucess",
      values: res.currentUser,
    };
  }
  async createReplyComment(
    comment: replyCommentDTO
  ): Promise<SucessReponseWithContentApi<Repliy> | ErrorResponseApi> {
    // const response = await this.api
    //   .post("/feedback")
    //   .then((res) => res.data)
    //   .catch((err) => err);

    const expectedReply = {
      ...comment,

      id: Math.floor(Math.random() * 1000),
    } as unknown as Repliy;

    return {
      error: false,
      message: "comment reply created with sucess",
      values: expectedReply,
    };
  }
  async indexFeedbacks(
    params: Object
  ): Promise<SucessReponseWithContentApi<Feedback[]> | ErrorResponseApi> {
    const response = await this.api
      .get("/static-feedback.json", { params })
      .then((res) => res.data)
      .catch((err) => console.log(err));

    type expectedParams = {
      sorted: string;
      filteredBy?: string;
    };
    const tratedParams = params as expectedParams;
    if (tratedParams.sorted || tratedParams.filteredBy) {
      const sortedFeedbacks = tratedParams.sorted
        ? (sortedBy(tratedParams.sorted, response) as unknown as Feedback[])
        : undefined;
      const filteredFeedbacks = sortedFeedbacks
        ? sortedFeedbacks.filter(
            (feedback) => feedback.category === tratedParams.filteredBy
          )
        : response.filter(
            (feedback: Feedback) =>
              feedback.category === tratedParams.filteredBy
          );

      return {
        error: false,
        message: "request make with sucess",
        values:
          filteredFeedbacks.length > 0 ? filteredFeedbacks : sortedFeedbacks,
      };
    }

    return {
      error: false,
      message: "request make with sucess",
      values: response,
    };
  }
  async showFeedback(
    feedbackId: number
  ): Promise<SucessReponseWithContentApi<Feedback> | ErrorResponseApi> {
    const response = await axios
      .get("/static-feedback.json")
      .then((res) => res.data)
      .catch((err) => err);

    return {
      error: false,
      message: "request make with sucess",
      values: response.find((element: Feedback) => element.id == feedbackId),
    };
  }

  async createComment(
    comment: Comment
  ): Promise<SucessReponseWithContentApi<Comment> | ErrorResponseApi> {
    // const response = await this.api
    //   .post("/feedback", comment)
    //   .then((res) => res.data)
    //   .catch((err) => err);

    return {
      error: false,
      message: "comment create with sucess",
      values: comment,
    };
  }
}
