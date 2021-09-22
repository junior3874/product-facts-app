export default class CommentIsMoreThan extends Error {
  constructor() {
    super("Comment is more than 250 caracteres");
  }

  static Validate(message) {
    const tratedMessage = message.trim();
    if (tratedMessage.length > 250) throw new CommentIsMoreThan();
  }
}
