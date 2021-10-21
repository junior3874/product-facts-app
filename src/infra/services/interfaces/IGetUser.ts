import User from "../../../entity/Feedback";
import { ErrorResponseApi } from "./ErrorResponseApi";
import SucessResponseWithContentApi from "./SucessReponseWithContentApi";

export interface IGetUser {
  showUser(): Promise<SucessResponseWithContentApi<User> | ErrorResponseApi>;
}
