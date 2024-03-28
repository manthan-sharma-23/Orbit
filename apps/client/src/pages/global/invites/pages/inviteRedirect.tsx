import { InvitesNav } from "@/lib/static/global/static/invitesNav";
import React from "react";
import { useParams } from "react-router-dom";
import Pending from "./pending";
import Friends from "./friends";
import Invites from "./invites";
import SentRequests from "./sentRequests";

const InviteRedirect = () => {
  const { path } = useParams();

  if (path === InvitesNav.pending) return <Pending />;
  if (path === InvitesNav.friends) return <Friends />;
  if (path === InvitesNav.invites) return <Invites />;
  if (path === InvitesNav.sent) return <SentRequests />;

  return (
    <div className="h-full w-full flex justify-center items-center text-white/60 ">
      SNAP !
    </div>
  );
};

export default InviteRedirect;
