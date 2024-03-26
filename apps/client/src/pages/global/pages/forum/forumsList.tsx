import Loading from "@/components/ui/Loading";
import { Separator } from "@/components/ui/separator";
import { useGetForums } from "@/features/hooks/forums/useGetForums";
import { forumsList } from "@/lib/static/global/forum/forum.list";
import _ from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FORUM } from "typings";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import {
  BiShare,
  BiSolidDownvote,
  BiSolidUpvote,
  BiUpvote,
} from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import ForumPannel from "./forumPannel";
import { voteForum } from "@/features/funcs/forums/vote/voteForum";
import { FORUM_INTERACTION_OPTIONS } from "@/lib/types/type";

const ForumsList = () => {
  const { forumId } = useParams();

  const { loading, forums } = useGetForums();

  console.log("hey");

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
    </div>
  );
};

interface Vote {
  isUpVoted: boolean;
  isDownVoted: boolean;
  isBookmarked: boolean;
}

const Forum = ({ forum }: { forum: FORUM }) => {
  const navigate = useNavigate();
  const [detail, setDetails] = useState<Vote>({
    isUpVoted: false,
    isDownVoted: false,
    isBookmarked: false,
  });
  const matchedForum = forumsList.find(
    (item) => item.href === forum.forum_type
  );
  const color = matchedForum ? matchedForum.color : "";
  const dark = matchedForum ? matchedForum.dark : "";
  const forumTypeName = matchedForum ? matchedForum.name : "";
  const timeFromNow = moment(forum.createdAt).fromNow(false);

  useEffect(() => {
    if (forum.UserForums.length > 0) {
      setDetails({
        isUpVoted: forum.UserForums[0].isUpVoted,
        isDownVoted: forum.UserForums[0].isDownVoted,
        isBookmarked: forum.UserForums[0].isBookmarked,
      });
    }
  }, []);

  const handleUpVote = (action: boolean) => {
    setDetails((v) => ({ ...v, isUpVoted: action }));
    if (action === true) {
      voteForum({
        forumId: forum.id!,
        vote_type: FORUM_INTERACTION_OPTIONS.up,
      });
    } else {
      voteForum({
        forumId: forum.id!,
      });
    }
  };
  const handleDownVote = (action: boolean) => {
    setDetails((v) => ({ ...v, isDownVoted: action }));
    if (action === true) {
      voteForum({
        forumId: forum.id!,
        vote_type: FORUM_INTERACTION_OPTIONS.down,
      });
    } else {
      voteForum({
        forumId: forum.id!,
      });
    }
  };
  const handleBookmark = (action: boolean) => {
    setDetails((v) => ({ ...v, isBookmarked: action }));
    if (action === true) {
      voteForum({
        forumId: forum.id!,
        vote_type: FORUM_INTERACTION_OPTIONS.bookmark,
      });
    } else {
      voteForum({
        forumId: forum.id!,
        vote_type: FORUM_INTERACTION_OPTIONS.bookmark_undo,
      });
    }
  };

  const navigateToForum = () => {
    navigate(`/home/globe/forum/${forum.forum_type}/${forum.id}`);
  };
  return (
    <>
      <div
        key={forum.id} // Assuming forum has an id, replace with unique key if available
        className="hover:bg-white/10 rounded-sm min-h-[25vh] w-full pl-5 p-3  font-mono flex flex-col"
      >
        <div className="w-auto" onClick={navigateToForum}>
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
        <p className="text-xl cursor-pointer" onClick={navigateToForum}>
          /// {forum.title}
        </p>
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
              {detail.isUpVoted ? (
                <BiSolidUpvote onClick={() => handleUpVote(false)} />
              ) : (
                <BiUpvote onClick={() => handleUpVote(true)} />
              )}
              <p>{forum.up_vote}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              {detail.isDownVoted ? (
                <BiSolidDownvote onClick={() => handleDownVote(false)} />
              ) : (
                <BiDownvote onClick={() => handleDownVote(true)} />
              )}
              <p>{forum.down_vote}</p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <BiComment />
              <p>{forum.comments?.length}</p>
            </div>
          </span>
          <span className="flex gap-5 text-xl">
            {detail.isBookmarked ? (
              <FaBookmark onClick={() => handleBookmark(false)} />
            ) : (
              <FaRegBookmark onClick={() => handleBookmark(true)} />
            )}
            <BiShare />
          </span>
        </div>
      </div>
      <Separator className="bg-white/5" />
    </>
  );
};

export default ForumsList;
