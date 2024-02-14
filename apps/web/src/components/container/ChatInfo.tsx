import { useNavigate, useParams } from "react-router-dom";
import { useGetFriends } from "../../features/hooks/dm-hooks/useGetFriends.hook";
import "../../styles/scroll.css";
import { useSetRecoilState } from "recoil";
import { dmAtom } from "../../features/store/atoms/dm-atoms/dm.atom";
import { FRIEND } from "typings";

const ChatInfo = () => {
  const { loading, friends } = useGetFriends();
  return (
    <div className="relative h-[90vh] w-full px-3 scrollw overflow-y-scroll py-2 ">
      {loading && (
        <div>
          <FriendBoxLoading />
          <FriendBoxLoading />
          <FriendBoxLoading />
          <FriendBoxLoading />
          <FriendBoxLoading />
          <FriendBoxLoading />
          <FriendBoxLoading />
        </div>
      )}
      {!loading &&
        friends &&
        friends.map((friend) => {
          return <FriendBox friend={friend} key={friend.id} />;
        })}
    </div>
  );
};

const FriendBox = ({ friend }: { friend: FRIEND }) => {
  const { id } = useParams();
  return (
    <div
      onClick={() => {
        window.location.assign("/dms/" + friend.roomId + "/" + friend.id);
      }}
      className={`h-[10vh] w-full text-white/85 ${friend.roomId === id ? "bg-white/10" : ""}  flex relative my-2 hover:bg-white/10 cursor-pointer rounded-lg hover:text-white transition-all`}
    >
      <div className="h-full w-[20%] flex justify-center items-center">
        {friend.image ? (
          <img
            className="overflow-hidden h-[5rem] w-[5rem] rounded-full p-2"
            src={friend.image}
          />
        ) : (
          <div className="text-3xl  text-white font-extrabold font-sans overflow-hidden h-[3.8rem] w-[3.8rem] rounded-full p-2 bg-green-400 flex items-center justify-center">
            {friend.name?.split("")[0]}
          </div>
        )}
      </div>
      <div className="h-full w-[80%]  py-2 px-3 flex flex-col items-start justify-center">
        <p className="w-full h-auto text-lg font-semibold font-sans">
          {friend.name}
        </p>
        <div className="flex w-full justify-between items-center">
          <p className="font-[100]">Hey babe did you reached ?</p>
          <p className="font-bold">11:59 pm</p>
        </div>
      </div>
    </div>
  );
};
const FriendBoxLoading = () => {
  return (
    <div className="h-[10vh] w-full text-white/85  flex relative my-2 hover:bg-white/10 cursor-pointer rounded-lg hover:text-white transition-all">
      <div className="h-full w-[20%] flex justify-center items-center">
        <div className="overflow-hidden h-[4rem] w-[4rem] rounded-full p-2 bg-white/50" />
      </div>
      <div className="h-full w-[80%]  py-2 px-3 flex flex-col items-start justify-center">
        <p className="w-full h-[1.2rem] my-2 rounded-xl text-lg font-semibold font-sans bg-white/30"></p>
        <div className="flex w-full justify-between items-center my-1">
          <p className="font-[100] bg-white/30 h-[.9rem] w-[10rem] rounded-xl" />
          <p className="font-bold bg-white/30 h-[.9rem] w-[2.5rem] rounded-xl"></p>
        </div>
      </div>
    </div>
  );
};

export default ChatInfo;
