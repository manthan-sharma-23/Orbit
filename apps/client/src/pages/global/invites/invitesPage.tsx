import { Separator } from "@/components/ui/separator";
import { InvitesNav } from "@/lib/static/global/static/invitesNav";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const InvitesPage = () => {
  const navigate = useNavigate();
  const { path } = useParams();

  return (
    <div className="h-full w-full px-5">
      <div className="w-[60%] h-full ">
        <div
          className="h-[7%] w-full flex text-2xl items-end justify-start gap-2"
          style={{ fontFamily: ' "Kode Mono", monospace' }}
        >
          <p
            onClick={() =>
              navigate(`/home/globe/invites/${InvitesNav.friends}`)
            }
            className={`cursor-pointer w-auto py-1 px-5 h-auto ${path === InvitesNav.friends ? "text-white/90 font-bold " : "text-white/60"}`}
          >
            {path === InvitesNav.friends && "> "}FRIENDS
          </p>
          <p
            onClick={() =>
              navigate(`/home/globe/invites/${InvitesNav.pending}`)
            }
            className={`cursor-pointer w-auto py-1 px-5 h-auto ${path === InvitesNav.pending ? "text-white/90 font-bold " : "text-white/60"}`}
          >
            {path === InvitesNav.pending && "> "}PENDING
          </p>
          <p
            onClick={() =>
              navigate(`/home/globe/invites/${InvitesNav.invites}`)
            }
            className={`cursor-pointer w-auto py-1 px-5 h-auto ${path === InvitesNav.invites ? "text-white/90 font-bold " : "text-white/60"}`}
          >
            {path === InvitesNav.invites && "> "}INVITES
          </p>
          <p
            onClick={() => navigate(`/home/globe/invites/${InvitesNav.sent}`)}
            className={`cursor-pointer w-auto py-1 px-5 h-auto ${path === InvitesNav.sent ? "text-white/90 font-bold " : "text-white/60"}`}
          >
            {path === InvitesNav.sent && "> "}SENT REQUESTS
          </p>
        </div>
        <Separator className="bg-white/10 my-3" />
        <div className="h-[90%] w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default InvitesPage;
