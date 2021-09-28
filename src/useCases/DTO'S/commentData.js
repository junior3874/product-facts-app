export default class CommentDataDTO {
  constructor({ id, message, userProps }) {
    this.id = id;
    this.content = message;
    this.user = userProps;
  }
}
