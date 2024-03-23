import { TypographyH3 } from "@/components/ui/typography/h3";
import { timeAgo } from "@/lib/utils/rnad";
import { useNavigate } from "react-router-dom";
import { MAIL } from "typings";

const mails: MAIL[] = [
  {
    id: "1",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    to: "recipient1@example.com",
    from: "sender1@example.com",
    title: "Regarding Meeting Schedule",
    data: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed consequat ante quis sapien fermentum, sit amet rutrum est posuere. Fusce sed dui quis magna convallis cursus. Nullam vel bibendum est. Nulla at lacus nisi. Ut ac est a elit interdum tincidunt vel at lorem. Donec finibus vel eros nec volutpat.",
    isInvite: false,
    isRead: false,
    createdAt: new Date("2024-03-01T08:00:00Z"),
  },
  {
    id: "2235",
    description: "Praesent id arcu sem.",
    to: "recipient2@example.com",
    from: "sender2@example.com",
    title: "Project Collaboration Proposal",
    data: "Praesent id arcu sem. Ut tincidunt vitae lectus nec vestibulum. Integer sollicitudin congue massa, in aliquam est sollicitudin non. Sed eget posuere lorem. Duis vulputate purus sed magna bibendum lobortis. Mauris vel commodo mi. Sed ut ipsum vitae lorem efficitur maximus. Proin id rhoncus mi.",
    isInvite: true,
    isRead: false,
    inviteId: "1",
    createdAt: new Date("2024-03-02T10:00:00Z"),
    tags: [{ name: "Important" }, { name: "Priority" }],
  },
  {
    id: "237",
    description: "Praesent id arcu sem.",
    to: "recipient2@example.com",
    from: "sender2@example.com",
    title: "Project Collaboration Proposal",
    data: "Praesent id arcu sem. Ut tincidunt vitae lectus nec vestibulum. Integer sollicitudin congue massa, in aliquam est sollicitudin non. Sed eget posuere lorem. Duis vulputate purus sed magna bibendum lobortis. Mauris vel commodo mi. Sed ut ipsum vitae lorem efficitur maximus. Proin id rhoncus mi.",
    isInvite: true,
    isRead: false,
    inviteId: "1",
    createdAt: new Date("2024-03-02T10:00:00Z"),
    tags: [{ name: "Important" }, { name: "Priority" }],
  },
  {
    id: "2235",
    description: "Praesent id arcu sem.",
    to: "recipient2@example.com",
    from: "sender2@example.com",
    title: "Project Collaboration Proposal",
    data: "Praesent id arcu sem. Ut tincidunt vitae lectus nec vestibulum. Integer sollicitudin congue massa, in aliquam est sollicitudin non. Sed eget posuere lorem. Duis vulputate purus sed magna bibendum lobortis. Mauris vel commodo mi. Sed ut ipsum vitae lorem efficitur maximus. Proin id rhoncus mi.",
    isInvite: true,
    isRead: false,
    inviteId: "1",
    createdAt: new Date("2024-03-02T10:00:00Z"),
    tags: [{ name: "Important" }, { name: "Priority" }],
  },
  {
    id: "224526",
    description: "Praesent id arcu sem.",
    to: "recipient2@example.com",
    from: "sender2@example.com",
    title: "Project Collaboration Proposal",
    data: "Praesent id arcu sem. Ut tincidunt vitae lectus nec vestibulum. Integer sollicitudin congue massa, in aliquam est sollicitudin non. Sed eget posuere lorem. Duis vulputate purus sed magna bibendum lobortis. Mauris vel commodo mi. Sed ut ipsum vitae lorem efficitur maximus. Proin id rhoncus mi.",
    isInvite: true,
    isRead: false,
    inviteId: "1",
    createdAt: new Date("2024-03-02T10:00:00Z"),
    tags: [{ name: "Important" }, { name: "Priority" }],
  },
  {
    id: "22345",
    description: "Praesent id arcu sem.",
    to: "recipient2@example.com",
    from: "sender2@example.com",
    title: "Project Collaboration Proposal",
    data: "Praesent id arcu sem. Ut tincidunt vitae lectus nec vestibulum. Integer sollicitudin congue massa, in aliquam est sollicitudin non. Sed eget posuere lorem. Duis vulputate purus sed magna bibendum lobortis. Mauris vel commodo mi. Sed ut ipsum vitae lorem efficitur maximus. Proin id rhoncus mi.",
    isInvite: true,
    isRead: false,
    inviteId: "1",
    createdAt: new Date("2024-03-02T10:00:00Z"),
    tags: [{ name: "Important" }, { name: "Priority" }],
  },
  {
    id: "2908",
    description: "Praesent id arcu sem.",
    to: "recipient2@example.com",
    from: "sender2@example.com",
    title: "Project Collaboration Proposal",
    data: "Praesent id arcu sem. Ut tincidunt vitae lectus nec vestibulum. Integer sollicitudin congue massa, in aliquam est sollicitudin non. Sed eget posuere lorem. Duis vulputate purus sed magna bibendum lobortis. Mauris vel commodo mi. Sed ut ipsum vitae lorem efficitur maximus. Proin id rhoncus mi.",
    isInvite: true,
    isRead: false,
    inviteId: "1",
    createdAt: new Date("2024-03-02T10:00:00Z"),
    tags: [{ name: "Important" }, { name: "Priority" }],
  },
  {
    id: "2235",
    description: "Praesent id arcu sem.",
    to: "recipient2@example.com",
    from: "sender2@example.com",
    title: "Project Collaboration Proposal",
    data: "Praesent id arcu sem. Ut tincidunt vitae lectus nec vestibulum. Integer sollicitudin congue massa, in aliquam est sollicitudin non. Sed eget posuere lorem. Duis vulputate purus sed magna bibendum lobortis. Mauris vel commodo mi. Sed ut ipsum vitae lorem efficitur maximus. Proin id rhoncus mi.",
    isInvite: true,
    isRead: false,
    inviteId: "1",
    createdAt: new Date("2024-03-02T10:00:00Z"),
    tags: [{ name: "Important" }, { name: "Priority" }],
  },
  {
    id: "4",
    description: "Praesent id arcu sem.",
    to: "recipient2@example.com",
    from: "sender2@example.com",
    title: "Project Collaboration Proposal",
    data: "Praesent id arcu sem. Ut tincidunt vitae lectus nec vestibulum. Integer sollicitudin congue massa, in aliquam est sollicitudin non. Sed eget posuere lorem. Duis vulputate purus sed magna bibendum lobortis. Mauris vel commodo mi. Sed ut ipsum vitae lorem efficitur maximus. Proin id rhoncus mi.",
    isInvite: true,
    isRead: false,
    inviteId: "1",
    createdAt: new Date("2024-03-02T10:00:00Z"),
    tags: [{ name: "Important" }, { name: "Priority" }],
  },
  // Include other mail objects here
];

const Mails = () => {
  return (
    <div className="h-full w-full">
      {mails.map((mail) => (
        <Mail mail={mail} />
      ))}
    </div>
  );
};

const Mail = ({ mail }: { mail: MAIL }) => {
  const time = timeAgo(mail.createdAt);
  const navigate = useNavigate();
  return (
    <div
      className="h-[20vh] w-full bg-[#EFEFF0] mb-2 rounded-lg flex flex-col cursor-pointer p-2 px-4"
      onClick={() => navigate(`/home/inbox/${mail.id}`)}
    >
      <div className="h-[50%] border-0 w-full flex justify-between items-center">
        <div>
          <TypographyH3 className=" " text={mail.title} />
          <div className="font-medium">{mail.User?.name}</div>
          <div className="font-medium">
            {mail.description?.slice(0, 70) + " ..."}
          </div>
        </div>
        <div className="border-0 h-full w-auto font-mono font-semibold">
          {time}
        </div>
      </div>
      <div className="h-[30%] border-0 w-full my-1 overflow-hidden">
        {mail.data}
      </div>
      <div className="h-[20%] border-0 w-full flex m-2 gap-4">
        {mail.tags?.map((tag) => (
          <div
            className={`bg-white/80 border-[1px] rounded-md border-black text-black w-auto h-8 flex justify-center items-center`}
          >
            <p className="m-2">{tag.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Mails;
