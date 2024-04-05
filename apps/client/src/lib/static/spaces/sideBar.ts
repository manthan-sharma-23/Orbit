import { SiBandsintown, SiProgress } from "react-icons/si";
import { CgGoogleTasks } from "react-icons/cg";
import { FaRegCircle, FaVideo } from "react-icons/fa6";
import { MdManageAccounts } from "react-icons/md";
import { BiSolidCubeAlt } from "react-icons/bi";

export const SpacesSideIcons = [
  {
    href: "townhall",
    icon: SiBandsintown,
    name: "Town Hall",
  },
  {
    href: "info",
    icon: FaRegCircle,
    name: "Space Info",
  },
  {
    href: "progress",
    icon: SiProgress,
    name: "Progress",
  },
  {
    href: "meetings",
    icon: FaVideo,
    name: "Meetings",
  },
];
export const TeamsSideIcons = [
  {
    href: "manage",
    icon: MdManageAccounts,
    name: "Manage Team",
  },
  {
    href: "assignments",
    icon: CgGoogleTasks,
    name: "Assignments",
  },
  {
    href: "schedule",
    icon: BiSolidCubeAlt,
    name: "Schedule",
  },
];
