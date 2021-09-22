export default class CommentDontHaveContent extends Error {
  constructor() {
    super("Comment dont have content");
  }
  static Validate(message) {
    const tratedMessage = message.replace(/\s/g, "").trim();
    if (tratedMessage.length <= 0) throw new CommentDontHaveContent();
  }
}
