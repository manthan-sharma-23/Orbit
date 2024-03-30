import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { acceptInvite } from "@/features/funcs/invites/acceptInvite";
import { rejectInvite } from "@/features/funcs/invites/rejectInvite";
import { useGetTeamInvites } from "@/features/hooks/invites/useGetTeamInvites";
import _ from "lodash";

const Invites = () => {
  const { invites, loading } = useGetTeamInvites();

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  const handleAcceptInvite = (inviteId: string) => {
    console.log(inviteId);
    acceptInvite({ inviteId }).then((data) => {
      if (data) {
        window.location.reload();
      }
    });
  };
  const handleRejectInvite = (inviteId: string) => {
    rejectInvite({ inviteId }).then((data) => {
      if (data) {
        window.location.reload();
      }
    });
  };

  return (
    <div
      className="h-full w-full text-white"
      style={{
        fontFamily: '"Kode Mono", monospace',
        borderRadius: "2px",
      }}
    >
      <ScrollArea className="h-full w-full flex flex-col">
        {invites.map((invite) => (
          <div className="h-[20vh] w-full border border-white/20 mb-3">
            <div className=" h-[65%] w-full flex justify-start items-center p-4 gap-3">
              <div className="h-full w-auto border border-white/30 p-1">
                <img
                  src={invite.Space?.image}
                  className="h-full border border-white/15 p-1"
                />
              </div>
              <div className="w-[90%] h-full flex flex-col items-start justify-around">
                <p className="text-xl font-bold w-full ">
                  {_.upperCase(invite.Space?.name)}
                </p>
                <div className="w-full flex text-sm gap-3 text-white/60">
                  <span>
                    <p
                      className=" font-semibold"
                      style={{ color: invite.Team?.color }}
                    >
                      {invite.Team?.name}
                    </p>
                    <p className=" font-medium">{invite.Team?.description}</p>
                  </span>
                  <p>{}</p>
                </div>
              </div>
            </div>
            <Separator className="bg-white/20 " />
            <div className=" p-0 h-[35%]  w-full flex items-center justify-between gap-3 px-4">
              <div className="w-[9rem] border-white/55 text-white/55 h-[2rem] border flex justify-center items-center rounded-md">
                {invite.Team?.name === "Townhall"
                  ? "Space Invite"
                  : "Team Invite"}
              </div>
              <div className="h-full flex justify-center items-center gap-2">
                <Button
                  onClick={() => handleRejectInvite(invite.id)}
                  className="bg-white/80 text-black hover:bg-transparent hover:text-white font-semibold"
                >
                  Reject
                </Button>
                <Button
                  onClick={() => handleAcceptInvite(invite.id)}
                  className="bg-white/80  text-black hover:bg-transparent hover:text-white font-semibold"
                >
                  Accept
                </Button>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default Invites;
