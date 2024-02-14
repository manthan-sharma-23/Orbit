import { atom } from "recoil";

// enum options {
//   "friends",
//   "pending",
//   "addFriend",
// }

// const INITIALSTATE: "friends" | "pending" | "addFriend" = "friends";

export const selectFriendDialougeAtom = atom({
  key: "selectFriendDialouge/atom",
  default: "addFriend",
});
