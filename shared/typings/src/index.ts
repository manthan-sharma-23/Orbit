import { z } from "zod";

//user controllers
export const INPUT_LOGIN_FORM = z.object({
  name: z.string().nullable(),
  email: z.string().email(),
  password: z.string().min(5),
});

export type INPUT_LOGIN_FORM = z.infer<typeof INPUT_LOGIN_FORM>;

export type OUTPUT_LOGIN_FORM = {
  message?: string;
  token: string;
};

export type USER = {
  name?: string;
  email: string;
  image?: any;
  emailVerified?: Date;
  id?: string;
  username: string;
  job: string;
  about: string;
  country: string;
  roles: string[];
  skills: string[];
  view: string;
  status: string;
  github?: string;
  twitter?: string;
  linkedIn?: string;
  stage?: string;
  languages: string[];
  workEx?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type FRIEND = {
  id?: string;
  name?: string;
  email?: string;
  image?: string;
};

export type OUTPUT_GET_USER = {
  message?: string;
  user: USER;
};

//
export const FRIEND_REQUEST_STATUS = {
  none: "none",
  pending: "pending",
  accepted: "accepted",
  rejected: "rejected",
};

export type MESSAGE_TYPE = "INFO" | "JOIN" | "MESSAGE" | "SPACE";

export type ROOM = {
  id: string;
  name?: string;
  users: USER[];
  createdAt: Date;
  messages: TEXT[];
};

export type FRIEND_REQUEST = {
  id: string;
  status: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MESSAGE = {
  type: MESSAGE_TYPE;
  payload: {
    roomId?: string;
    message?: TEXT;
    announcement?: string;
  };
  timeStamp: Date;
};

export type TEXT = {
  sendAt: Date;
  userId: string;
  text: string;
};

export enum TEAM_TYPE {
  inviteOnly = "invite_only",
  public = "public",
  private = "private",
}

export type TEAM = {
  id: string;
  name: string;
  description?: string;
  spaceId: string;
  type: TEAM_TYPE;
  color: string;
  members: USER_TEAM_SCHEMA[];
  threads: THREAD_SCHEMA[];
  Invites: INVITE[];
};

export enum TEAM_ROLE {
  admin = "admin",
  member = "member",
  coadmin = "coadmin",
}

export interface USER_SPACE_SCHEMA {
  id: string;
  role: TEAM_ROLE;
  userId: string;
  teamId: string;
  team: TEAM;
  user: USER;
  createdAt: Date;
  updatedAt: Date;
  space: SPACE_SCHEMA;
}

export interface USER_TEAM_SCHEMA {
  id: string;
  role: TEAM_ROLE;
  userId: string;
  spaceId: string;
  space: SPACE_SCHEMA;
  user: USER;
}

export interface SPACE_SCHEMA {
  id: string;
  name: string;
  description: string;
  image: string;
  createdBy: string;
  teams: TEAM[];
  UserSpace: USER_SPACE_SCHEMA[];
  invites: INVITE[];
}

export const THREADS_BASE = {
  general: {
    name: "general",
    type: "chat",
  },
  announcement: {
    name: "announcements",
    type: "announcement",
  },
};

export interface THREAD_SCHEMA {
  id: string;
  name: string;
  type: THREAD_TYPE;
  teamId: string;
  messages: THREAD_MESSAGE_SCHEMA[];
}

export interface THREAD_MESSAGE_SCHEMA {
  id?: number;
  isActive: boolean;
  threadId: string;
  data: string;
  userId: string;
  timeStamp: Date;
  User?: Partial<USER>;
}

export type THREAD_TYPE = "chat" | "announcement" | "audio" | "jam" | "video";

export enum THREAD_TYPES {
  CHAT = "chat",
  ANNOUNCEMENT = "announcement",
  AUDIO = "audio",
  JAM = "jam",
  VIDEO = "video",
}

export interface MAIL {
  id?: string;
  data: string;
  title: string;
  description?: string;
  isInvite: boolean;
  invite?: INVITE;
  from: string;
  to: string;
  userId?: string;
  User?: USER;
  isRead: boolean;
  inviteId?: string;
  createdAt: Date;
  tags?: Partial<TAG>[];
}

export interface INVITE {
  id: string;
  type: INVITE_TYPE;
  spaceId: string;
  Space?: SPACE_SCHEMA;
  teamId: string;
  Team?: TEAM;
  mails: MAIL[];
  from?: string;
  to: string;
  createdAt: Date;
  isRejected: boolean;
}

export enum INVITE_TYPE {
  space = "space",
  team = "team",
  friend = "friend",
}

export interface TAG {
  id: string;
  name: string;
  color: string;
}

export interface FORUM {
  id?: string;
  forum_type: FORUM_TYPE;
  title?: string;
  data: string;
  userId: string;
  User?: USER;
  comments?: COMMENT[];
  createdAt: Date;
  up_vote?: number;
  UserForums: USER_FORUM[];
  down_vote?: number;
}

export interface COMMENT {
  id?: string;
  comment: string;
  userId: string;
  User?: USER;
  forumId: string;
  Forum?: FORUM;
  createdAt: Date;
}

export enum FORUM_TYPE {
  DISCUSSIONS = "discussions",
  PUBLIC_DISCUSSIONS = "public_discussions",
  PUBLIC_IDEAS = "product_ideas",
  COLLABORATIONS = "collaborations",
  TECHNICAL_QUESTIONS = "technical_questions",
}

export enum FORUM_INTERACTION_OPTIONS {
  up = "up",
  down = "down",
  bookmark_undo = "bookmark_undo",
  bookmark = "bookmark",
}

export interface USER_FORUM {
  id?: string;
  isBookmarked: boolean;
  isUpVoted: boolean;
  isDownVoted: boolean;
  userId?: string;
  forumId?: string;
}
