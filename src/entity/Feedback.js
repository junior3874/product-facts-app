import MissingParans from "./errors/MissingParans.js";

export default class Feedback {
  constructor({ UUID, title, category, status, description }) {
    this.UUID = UUID;
    this.title = title;
    this.category = category;
    this.status = status;
    this.description = description;
  }

  static create({ UUID, title, category, status, description }) {
    if (title == "") return new MissingParans("title");
    if (category == "") return new MissingParans("title");
    if (status == "") return new MissingParans("title");
    if (description == "") return new MissingParans("title");

    return new Feedback({ UUID, title, category, status, description });
  }
}
