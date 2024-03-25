import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetForums } from "@/features/hooks/forums/useGetForums";
import { forumsList } from "@/lib/static/global/forum/forum.list";
import _ from "lodash";
import { Bookmark } from "lucide-react";
import moment from "moment";
import React from "react";
import { FORUM } from "typings";
import { FaRegBookmark } from "react-icons/fa6";
import { BiShare, BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import ForumPannel from "./forumPannel";

const ForumsList = () => {
  const { path, forumId } = useParams();

  const { loading, forums } = useGetForums({ forum_type: path });

  if (forumId) {
    return <ForumPannel />;
  }

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-full w-full border-0 flex flex-col justify-start items-center mt-3 gap-3">
      {forums && forums.map((forum) => <Forum forum={forum} />)}
      {forums && forums.map((forum) => <Forum forum={forum} />)}
      {forums && forums.map((forum) => <Forum forum={forum} />)}
    </div>
  );
};

const Forum = ({ forum }: { forum: FORUM }) => {
  const navigate = useNavigate();
  const matchedForum = forumsList.find(
    (item) => item.href === forum.forum_type
  );
  const color = matchedForum ? matchedForum.color : "";
  const dark = matchedForum ? matchedForum.dark : "";
  const forumTypeName = matchedForum ? matchedForum.name : "";
  const timeFromNow = moment(forum.createdAt).fromNow(false);
  return (
    <>
      <div
        onClick={() =>
          navigate(`/home/globe/forum/${forum.forum_type}/${forum.id}`)
        }
        key={forum.id} // Assuming forum has an id, replace with unique key if available
        className="hover:bg-white/10 rounded-sm min-h-[25vh] w-full pl-5 p-3 cursor-pointer font-mono flex flex-col"
      >
        <div className="w-auto">
          <span
            className="inline-flex h-8 items-center gap-2 font-mono rounded-md px-4 pt-1 mb-2"
            style={{ border: "1px solid " + color, backgroundColor: dark }}
          >
            <div
              className="h-[8px] w-[8px] rounded-sm rotate-45 relative bottom-[1px]"
              style={{ backgroundColor: color }}
            />
            <p
              style={{ color }}
              className="w-auto text-xs font-mono tracking-wide my-2"
            >
              {_.upperCase(forumTypeName)}
            </p>
          </span>
        </div>
        <p className="text-xl">/// {forum.title}</p>
        <div className="text-[.8rem] flex justify-between items-center text-white/80 tracking-wide">
          <div className="flex justify-center items-center gap-2">
            {forum.User?.image ? (
              <img />
            ) : (
              <div className="w-5 h-5 rounded-full bg-white/85 text-black flex justify-center items-center font-medium font-sans p-2">
                {forum.User?.name?.split("")[0]}
              </div>
            )}
            <div className="text-[1rem]">{forum.User?.name?.split(" ")[0]}</div>
            <div className="text-sm text-white/60 ml-2 underline">
              {forum.User?.email?.split("@")[0]}
            </div>
          </div>
          <div>{timeFromNow}</div>
        </div>
        <div className="min-h-[4rem] my-3 text-white/80">
          {forum.data.slice(0, 250)} ...
        </div>
        <div className="flex justify-between items-center text-xl gap-3 text-white/70">
          <span className="flex gap-3 text-xl ">
            <div className="flex justify-center items-center gap-2">
              <BiUpvote />
              <p>{forum.up_vote}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <BiDownvote />
              <p>{forum.down_vote}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <BiComment />
              <p>{forum.comments?.length}</p>
            </div>
          </span>
          <span className="flex gap-5 text-xl">
            <FaRegBookmark />
            <BiShare />
          </span>
        </div>
      </div>
      <Separator className="bg-white/5" />
    </>
  );
};

export default ForumsList;
