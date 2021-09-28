import axios from "axios";

export default class IndexFeedbacksWithAxios {
  async index() {
    const response = await axios
      .get("/static-feedback.json")
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return response.productRequests;
  }
}
