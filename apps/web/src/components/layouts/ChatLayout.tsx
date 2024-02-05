import { Outlet } from "react-router-dom";
import ChatProfilePannel from "../containers/ChatProfilePannel";
import { useGetUserQuery } from "../../lib/store/reducers/user/user.slice";
import * as Io from "react-icons/io5";
import { BiSolidBell } from "react-icons/bi";
import { useState } from "react";
import Input from "../interface/Input";

const ChatLayout = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="h-screen w-[30vw]">
        <ChatProfilePannel />
      </div>
      <div className="h-screen w-3/4 bg-[#F0F0F0]">
        <SearchBar />
        <div className="h-[90vh] w-full px-2 pb-2 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const defaultProfile =
  "https://publish.purewow.net/wp-content/uploads/sites/2/2023/06/gosling-universal.jpg?resize=720%2C780";

const SearchBar = () => {
  const { data, isLoading } = useGetUserQuery();
  const [search, setSearch] = useState<boolean>(false);
  return (
    <div className="h-[10vh] w-full flex justify-center items-center px-2">
      <div className="w-[80%] h-full px-2 flex justify-between items-center">
        <div className="h-[60px] flex justify-between items-center w-[40vw]">
          <div
            className={`h-full w-[${search ? "40vw" : "5vw"}] transition-all duration-500 shadow-md rounded-xl bg-white px-4 cursor-pointer flex justify-start text-2xl font-bold items-center`}
          >
            <Io.IoSearchSharp onClick={() => setSearch((val) => !val)} />
            {search && (
              <input
                className="border-none text-gray-500 font-light text-xl mx-4 w-full focus:outline-none"
                placeholder="Enter the text to search "
              />
            )}
          </div>
        </div>
        <div className="cursor-pointer h-[3.5vw] shadow-lg w-[3.5vw] hover:text-[1.6rem] transition-all duration-200 bg-white rounded-xl flex justify-center items-center text-2xl text-gray-500">
          <BiSolidBell />
        </div>
      </div>
      <div className="w-[20%] h-[70px] bg-white shadow-md  flex justify-between items-center pr-3 mr-3 rounded-xl">
        <p className="min-w-[12rem] h-auto  text-[1rem] font-mono  px-8 tracking-wider ">
          {isLoading ? "isLoading..." : "Hey " + data?.user.name?.split(" ")[0]}
        </p>
        <span className=" h-[60px] w-[60px] border-2 border-white rounded-full overflow-hidden shadow-xl ">
          {isLoading ? (
            <div>Loading..</div>
          ) : (
            <img
              src={data?.user.image || defaultProfile}
              className=" h-full w-full  object-cover"
            />
          )}
        </span>
      </div>
    </div>
  );
};

export default ChatLayout;
