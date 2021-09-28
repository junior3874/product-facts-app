import axios from "axios";
import FeedbackNotFound from "./errors/FeedbackNotFoundError";

export default class ShowFeedbacksWithAxios {
  async show(id) {
    const response = await axios
      .get("/static-feedback.json")
      .then((res) => res.data)
      .catch((err) => console.log(err));

    const expectedResponse = response.productRequests.find(
      (element) => element.id == id
    );
    return expectedResponse;
  }
}
