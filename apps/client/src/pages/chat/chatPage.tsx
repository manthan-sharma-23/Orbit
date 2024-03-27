import Loading from "@/components/ui/Loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useGetUserRooms } from "@/features/hooks/rooms/useGetUserRooms";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const ChatPage = () => {
  const { rooms, loading } = useGetUserRooms();
  const navigate = useNavigate();
  const { roomId } = useParams();

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="bg-[#0F0F0F] h-full w-full text-white">
      <div
        className="h-[8vh] w-full flex justify-start items-center  px-3"
        style={{ fontFamily: ' "Kode Mono", monospace' }}
      >
        <p className="font-semibold text-lg">&#47;&#47;&#47; CONVERSATIONS</p>
      </div>
      <Separator className="bg-white/10" />
      <div className="h-[92vh] w-full flex justify-start items-center px-10 py-6">
        <div className="h-full w-[18vw]">
          <ScrollArea className="h-full w-full flex flex-col  justify-center items-center">
            {rooms &&
              rooms.map((room) => {
                const friend = room.users[0];
                return (
                  <div
                    onClick={() => {
                      navigate(`/home/chat/${room.id}`);
                    }}
                    className={`mb-2 rounded-l-md w-full h-[4.2rem] flex justify-start items-center ${roomId === room.id ? "bg-white/5 border-r-2 border-white" : "hover:bg-white/5"} px-6 cursor-pointer gap-4`}
                  >
                    <div className="overflow-hidden h-[2.3rem] rounded-full">
                      <img src={friend.image} className="bg-black h-full " />
                    </div>
                    <div className="text-white/65 text-sm">
                      <p className="text-[1rem]">{friend.name}</p>
                      <p>@{friend.username}</p>
                    </div>
                  </div>
                );
              })}
          </ScrollArea>
        </div>
        <div className="h-full w-[45vw]">{roomId ? <Outlet /> : <Snap />}</div>
      </div>
    </div>
  );
};

const Snap = () => {
  return (
    <div className="h-full w-full flex justify-center items-center text-white/50">
      Select a chat
    </div>
  );
};

export default ChatPage;
