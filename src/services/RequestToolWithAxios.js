import RequestContract from "./RequestContract";

class RequestToolWithAxios extends RequestContract {
  constructor(api) {
    super();
    this.api = api;
  }
}

import axios from "axios";

export const api = axios.create({
  baseURL: "",
  params: {
    timestamp: new Date().getTime(),
  },
});

const requestContractWithAxios = new RequestToolWithAxios(api);

requestContractWithAxios.setGetAllFeedbacks(() => {
  return requestContractWithAxios.api
    .get("/static-feedback.json")
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

export default requestContractWithAxios;
