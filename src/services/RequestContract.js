export default class RequestContract {
  constructor() {
    this.onGetAllFeedbacks = () => {};
    this.onPostFeedback = () => {};
    this.onGetCurrentUser = () => {};
  }

  setGetAllFeedbacks(fn) {
    this.onGetAllFeedbacks = fn;
    return this;
  }

  setPostFeedback(fn) {
    this.onPostFeedback = fn;
    return this;
  }

  setGetCurrentUser(fn) {
    this.onGetCurrentUser = fn;
    return this;
  }

  build() {}
}
