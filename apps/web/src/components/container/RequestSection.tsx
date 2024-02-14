import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userSelector } from "../../features/store/selectors/user.selector";
import { FaUserFriends } from "react-icons/fa";
import { RiTimer2Fill } from "react-icons/ri";
import { IoPersonAddSharp } from "react-icons/io5";
import { selectFriendDialougeAtom } from "../../features/store/atoms/dm-atoms/friendDialouge.atom";

const options = {
  friends: "friends",
  addFriend: "notifs",
  pending: "pending",
};

const RequestSection = () => {
  const username = useRecoilValue(userSelector);
  return (
    <div className="w-full h-full bg-black/30">
      <div className="bg-transparent w-full h-[15%] text-white font-sans flex justify-center items-center text-2xl font-medium tracking-wide">
        {username.username}
        <img src="" />
      </div>
      <div className="bg-black h-[85%] w-full rounded-t-2xl">
        <FriendContainer />
      </div>
    </div>
  );
};

const FriendContainer = () => {
  const [render, setRender] = useRecoilState(selectFriendDialougeAtom);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-[10%] w-full text-white/70 flex text-2xl justify-center items-center">
        <p
          className={`h-full w-1/3 flex justify-center items-center ${render === options.friends ? "text-yellow-500" : ""} cursor-pointer`}
        >
          <FaUserFriends onClick={() => setRender(options.friends)} />
        </p>
        <p
          className={`border-x-[1px] border-white/55 h-[65%] w-1/3 flex justify-center items-center ${render === options.pending ? "text-yellow-500" : ""} cursor-pointer`}
        >
          <RiTimer2Fill onClick={() => setRender(options.pending)} />
        </p>
        <p
          className={`h-full w-1/3 flex justify-center items-center ${render === options.addFriend ? "text-yellow-500" : ""} cursor-pointer`}
        >
          <IoPersonAddSharp onClick={() => setRender(options.addFriend)} />
        </p>
      </div>
      <div className="h-[90%] w-full text-white">
        <ContentFriendDialouge render={render} />
      </div>
    </div>
  );
};

const ContentFriendDialouge = ({ render }: { render: string }) => {
  if (render === options.friends) {
    return (
      <div className="h-full w-full overflow-y-scroll py-1 px-2 scrollw">
        <EachFriend />
        <EachFriend />
        <EachFriend />
        <EachFriend />
      </div>
    );
  }
};

const EachFriend = () => {
  return (
    <div className="h-[9vh] w-full my-2 hover:bg-white/20 rounded-lg cursor-pointer flex justify-center items-center">
      <div className="h-full w-[25%] flex justify-center items-center">
        <img
          className="overflow-hidden h-[5rem] w-[5rem] rounded-full p-2"
          src="https://images-platform.99static.com/pULAgn-AED8QzzPGS40V0GCDOEk=/0x0:1000x1000/500x500/top/smart/99designs-contests-attachments/130/130378/attachment_130378088"
        />
      </div>
      <div className="h-full w-[75%]  py-2 px-3 flex items-center justify-start">
        <p className="w-full h-auto text-lg font-semibold font-sans">
          Alexandra Botez
        </p>
        <p className="text-white/80 font-extralight flex items-center justify-center  gap-2">
          <p className="bg-green-300 h-[10px] w-[10px]" />
          <p>Online</p>
        </p>
      </div>
    </div>
  );
};

export default RequestSection;
