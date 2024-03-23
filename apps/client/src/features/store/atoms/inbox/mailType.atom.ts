import { InboxMailType } from "@/lib/types/type";
import { atom } from "recoil";

export const MailTypeAtom = atom({
  key: "mail/type/atom",
  default: "all" as InboxMailType,
});
