import constants from "../../lib/CommentConsts";
export default class CommentIsMoreThan extends Error {
  constructor() {
    super(`Comment is more than ${constants.maximumLength} caracteres`);
  }

  static Validate(message) {
    const tratedMessage = message.trim();
    if (tratedMessage.length > constants.maximumLength) {
      throw new CommentIsMoreThan();
    }
  }
}
