export class User {
  public id: number;
  public image: string;
  public name: string;
  public username: string;

  constructor(userData: User) {
    this.id = userData.id;
    this.image = userData.image;
    this.name = userData.name;
    this.username = userData.username;
  }
}

export class Title {
  public title: string;
  public static maxSize = 60;
  constructor(title: string) {
    this.title = title;
  }
}

export class Category {
  public static categorys = ["enhancement", "bug", "feature"];
  public category: string;
  constructor(category: string) {
    this.category = category;
  }
}

export class Status {
  public static status = ["UX", "UI", "in-progress", "live", "planned"];
  public status: string;
  constructor(status: string) {
    this.status = status;
  }
}

export class Upvote {
  public id: number;
  public feedbackId: number;
  public userId: number;

  constructor({ id, feedbackId, userId }: Upvote) {
    this.id = id;
    this.feedbackId = feedbackId;
    this.userId = userId;
  }
}

export class Description {
  public static maxSize = 100;
  public description: string;
  constructor(description: string) {
    this.description = description;
  }
}
export class Comment {
  public static maxSizeCommentMessage = 250;
  public id: number;
  public user: User;
  public message: string;

  constructor({ id, user, message }: Comment) {
    this.id = id;
    this.user = user;
    this.message = message;
  }
}

export default class Feedback {
  public readonly id: number;
  public title: Title;
  public category: Category;
  public upvotes: Upvote[];
  public status: Status;
  public description: Description;
  public comments: Comment[];

  constructor(feedbackData: Feedback) {
    this.id = feedbackData.id;
    this.category = feedbackData.category;
    this.title = feedbackData.title;
    this.upvotes = feedbackData.upvotes;
    this.status = feedbackData.status;
    this.description = feedbackData.description;
    this.comments = feedbackData.comments;
  }
}
