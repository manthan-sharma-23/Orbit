export enum AuthPageParams {
  signup = "/signup",
  signin = "/signin",
  signout = "/signout",
}

export type InboxMailType = "all" | "read" | "unread" | "invites";

export enum FORUM_TYPE {
  DISCUSSIONS = "discussions",
  PUBLIC_DISCUSSIONS = "public_discussions",
  PRODUCT_IDEAS = "product_ideas",
  COLLABORATIONS = "collaborations",
  TECHNICAL_QUESTIONS = "technical_questions",
}

export enum FORUM_INTERACTION_OPTIONS {
  up = "up",
  down = "down",
  bookmark_undo = "bookmark_undo",
  bookmark = "bookmark",
}
