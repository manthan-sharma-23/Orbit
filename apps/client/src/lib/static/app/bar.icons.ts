import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  ShoppingCart,
  Users2,
  CheckCircle,
  MessageCircleMore,
  Pin,
  Circle,
  LucideEarth,
} from "lucide-react";

export const navoption = {
  bar: [
    {
      title: "Global",
      label: "",
      icon: LucideEarth,
      variant: "default",
      href: "globe/forum/general",
    },
    {
      title: "Tasks",
      label: "",
      icon: CheckCircle,
      variant: "ghost",
      href: "tasks",
    },
    {
      title: "Messages",
      label: "27",
      icon: MessageCircleMore,
      variant: "ghost",
      href: "chat",
    },
    {
      title: "Spaces",
      label: "",
      icon: Circle,
      variant: "ghost",
      href: "spaces",
    },
    {
      title: "Notes",
      label: "",
      icon: Pin,
      variant: "ghost",
      href: "notes",
    },
    {
      title: "Drafts",
      label: "9",
      icon: File,
      variant: "ghost",
      href: "drafts",
    },
  ],
};
