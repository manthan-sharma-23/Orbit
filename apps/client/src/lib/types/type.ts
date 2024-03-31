export enum AuthPageParams {
  signup = "/signup",
  signin = "/signin",
  signout = "/signout",
}

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

export const FRIEND_REQUEST_STATUS = {
  none: "none",
  pending: "pending",
  accepted: "accepted",
  rejected: "rejected",
};

export enum TEAM_TYPE {
  inviteOnly = "invite_only",
  public = "public",
  private = "private",
}

export type THREAD_TYPE = "chat" | "announcement" | "audio" | "jam" | "video";

export enum THREAD_TYPES {
  CHAT = "chat",
  ANNOUNCEMENT = "announcement",
  AUDIO = "audio",
  JAM = "jam",
  VIDEO = "video",
}