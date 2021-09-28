export default class FeedbackNotFound extends Error {
  constructor() {
    const message = "Feedback not found";
    super(message);
  }
}
