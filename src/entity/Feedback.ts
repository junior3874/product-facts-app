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
  public static maxSize = 60;
}

export class Category {
  public static categorys = ["enhancement", "bug", "feature", "UI", "UX"];
}

export class Status {
  public static status = ["in-progress", "live", "planned"];
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
}

export class Comment {
  public static maxSizeCommentContent = 250;
  public id: number;
  public user: User;
  public content: string;
  public replies?: Repliy[];

  constructor({ id, user, content, replies }: Comment) {
    this.id = id;
    this.user = user;
    this.content = content;
    this.replies = replies;
  }
}

export class Repliy extends Comment {
  public readonly commentId: number;
  constructor({ id, user, content, commentId, replies }: Repliy) {
    super({ id, user, content, replies });
    this.commentId = commentId;
  }
}

export default class Feedback {
  public readonly id: number;
  public title: Title;
  public category: string;
  public upvotes: Upvote[];
  public status: string;
  public description: string;
  public comments?: Comment[];
  public readonly user: User;

  constructor(feedbackData: Feedback) {
    this.id = feedbackData.id;
    this.category = feedbackData.category;
    this.title = feedbackData.title;
    this.upvotes = feedbackData.upvotes;
    this.status = feedbackData.status;
    this.description = feedbackData.description;
    this.comments = feedbackData.comments;
    this.user = feedbackData.user;
  }
}
