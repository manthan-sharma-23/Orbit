import { z } from "zod";

//user controllers
export const INPUT_LOGIN_FORM = z.object({
  name: z.string(),
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
};

export type FRIEND = {
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
  pending: "pending",
  accepted: "accepted",
  rejected: "rejected",
};

export const ROOM_TYPE = {
  group: "group",
  person: "person",
};

export type FRIEND_REQUEST = {
  id: string;
  status: string;
  senderId: string;
  receiverId: string;
};

// Web Socket types
export enum ChatEvent {
  SendMessage = "send_message",
  RequestAllMessages = "request_all_messages",
  SendAllMessages = "send_all_messages",
  RecieveMessages = "recieve_message",
}
