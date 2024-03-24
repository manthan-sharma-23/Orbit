import { TypographyH3 } from "@/components/ui/typography/h3";
import { timeAgo } from "@/lib/utils/rnad";
import { useNavigate } from "react-router-dom";
import { MAIL } from "typings";

const mails: MAIL[] = [];

const Mails = () => {
  return (
    <div className="h-full w-full">
      {mails && mails.map((mail) => <Mail mail={mail} />)}
    </div>
  );
};

const Mail = ({ mail }: { mail: MAIL }) => {
  const time = timeAgo(mail.createdAt);
  const navigate = useNavigate();
  return (
    <div
      className="h-[20vh] w-full bg-[#EFEFF0] mb-2 rounded-lg flex flex-col cursor-pointer p-2 px-3 "
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
      <div className="h-[20%] border-0 w-full flex my-2 gap-4">
        {mail.tags &&
          mail.tags?.map((tag) => (
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
