import { Input } from "@/components/ui/input";
import { IoLocationSharp, IoSearchOutline } from "react-icons/io5";
import { IoIosGlobe, IoIosOptions } from "react-icons/io";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetUsers } from "@/features/hooks/users/useGetUsers";
import Loading from "@/components/ui/Loading";
import { MdOutlineWork } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserInteract from "./user_interact";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/features/store/atoms/user.atom";

const FindMatesPage = () => {
  const { loading, users } = useGetUsers();
  const myId = useRecoilValue(userAtom).user?.id;

  if (loading || !myId) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }
  return (
    <div className="w-full h-full font-mono">
      <ScrollArea className="h-full w-full">
        <div className="w-[63%] h-full ml-5">
          <div className="bg-white/10 h-10 rounded-sm mt-4 w-full font-mono flex justify-start items-center px-4 text-lg text-white/70 gap-2">
            <span className="h-full flex justify-center items-center">
              <IoSearchOutline />
            </span>
            <p
              className="top-[1px] relative flex gap-3 justify-between  w-full"
              style={{ fontFamily: ' "Kode Mono", monospace' }}
            >
              SEARCH FOR MATES
              <p className="relative text-white/10 ml-3 ">
                ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
              </p>
            </p>
          </div>
          <div className="flex justify-center items-center my-2 h-10 gap-3">
            <Input
              className="w-full h-full border-[.6px] border-white/45 focus-visible:ring-[2.5px] focus-within:border-[#849DFE] focus-visible:ring-[#131620] bg-white/5  rounded-sm "
              placeholder="Search by Role or Username"
            />
            <div className="h-full w-10 border-[1px] bg-[#131620]  cursor-pointer text-lg flex justify-center items-center border-white/45 ring-[2.5px] border-[#849DFE] ring-[#131620]">
              <IoIosOptions className="text-2xl text-[#849DFE]" />
            </div>
          </div>
          <div className="h-auto w-full flex flex-wrap justify-between  p-0  ">
            {users &&
              users.map(
                (user, index) =>
                  user.id !== myId && (
                    <Dialog key={index}>
                      <DialogTrigger className="w-[49%] h-[23vh] mb-4">
                        <div className="w-full h-full border-[1px] border-white/15 my-2 p-1 hover:border-white/70 cursor-pointer">
                          <div className="h-full w-full border-[1px] p-1 border-white/10">
                            <div className="h-[35%] w-full bg-white/5 flex gap-2">
                              <div className="h-full w-[4.3rem]">
                                <img
                                  src={user.image}
                                  className="bg-black h-full w-full"
                                />
                              </div>
                              <div className="flex flex-col items-start justify-center gap-2 text-white/70">
                                <p
                                  style={{
                                    fontFamily: ' "Kode Mono", monospace',
                                  }}
                                >
                                  {user.name}
                                </p>
                                <p className="hover:underline hover:text-white/80">
                                  @{user.username}
                                </p>
                              </div>
                            </div>
                            <div className="h-[60%] flex flex-col justify-evenly items-start w-full my-2">
                              <div className="w-full h-[2.5rem] overflow-hidden flex justify-start gap-2 items-center">
                                {user.roles.slice(0, 2).map((role, index) => (
                                  <span
                                    key={index}
                                    style={{
                                      fontFamily: '"Kode Mono", monospace',
                                    }}
                                    className="border-[1px] border-blue-600/50 text-xs bg-[#2E2E2E] text-white/90 w-auto rounded-sm px-2 py-2"
                                  >
                                    {role}
                                  </span>
                                ))}
                                {user.roles.length > 2 && (
                                  <p
                                    style={{
                                      fontFamily: '"Kode Mono", monospace',
                                    }}
                                  >
                                    +{user.roles.length - 2}
                                  </p>
                                )}
                              </div>
                              <div className="mt-3 flex flex-col justify-start items-start gap-1 ">
                                <p className="flex text-sm text-white/60 gap-1">
                                  <MdOutlineWork className="relative top-[1px]" />
                                  {user.job}
                                </p>
                                <p className="flex text-sm text-white/60 gap-1">
                                  <IoIosGlobe className="relative top-[1px]" />
                                  {user.languages.map((lang) => (
                                    <p>{lang}</p>
                                  ))}
                                </p>
                                <p className="flex text-sm text-white/60 gap-1">
                                  <IoLocationSharp className="relative top-[1px]" />
                                  {user.country}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </DialogTrigger>
                      <DialogContent
                        style={{
                          fontFamily: '"Kode Mono", monospace',
                          borderRadius: "2px",
                        }}
                        className="bg-[#0F0F0F] text-white border-none p-0 border-white/50"
                      >
                        <UserInteract user={user} />
                        <DialogHeader className="h-0 w-0"></DialogHeader>
                        <DialogDescription className="h-0 w-0"></DialogDescription>
                      </DialogContent>
                    </Dialog>
                  )
              )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FindMatesPage;
