import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { TypographyH4 } from "@/components/ui/typography/h4";
import { createCommentToForum } from "@/features/funcs/forums/comments/createComment";
import { useGetForum } from "@/features/hooks/forums/useGetForumById";
import { forumsList } from "@/lib/static/global/forum/forum.list";
import _ from "lodash";
import { MessageSquare } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { BiComment, BiDownvote, BiShare, BiUpvote } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ForumPannel = () => {
  const { loading, forum } = useGetForum();
  const navigate = useNavigate();
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const [commentTextInput, setCommentTextInput] = useState<string | null>(null);

  if (!forum || forum === null) {
    return <div className="h-full w-full"></div>;
  }

  const matchedForum = forumsList.find(
    (item) => item.href === forum.forum_type
  );
  const color = matchedForum ? matchedForum.color : "";
  const dark = matchedForum ? matchedForum.dark : "";
  const forumTypeName = matchedForum ? matchedForum.name : "";
  const time = moment(forum.createdAt).format("LLL");

  if (loading) {
    return (
      <div className="h-full w-full">
        <Loading />
      </div>
    );
  }

  const createCommentHandler = () => {
    if (!commentTextInput || !forum.id) return;
    setIsCreatingComment(true);
    createCommentToForum({ comment: commentTextInput, forumId: forum.id })
      .then(() => {
        setIsCreatingComment(false);
        setCommentTextInput(null);
      })
      .catch((err) => {
        console.log(err);
        setIsCreatingComment(false);
      });
  };
  return (
    <div className="min-h-[80vh] w-full font-mono px-4 ">
      <div
        onClick={() =>
          navigate(`/home/globe/forum/${forum.forum_type}/${forum.id}`)
        }
        key={forum.id} // Assuming forum has an id, replace with unique key if available
        className=" rounded-sm min-h-[25vh] w-full mt-5 cursor-pointer font-mono flex flex-col"
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
        <TypographyH4 text={"// " + forum.title} className="my-3" />
        <div className="mb-2 text-[.8rem] flex justify-between gap-5 items-center text-white/80 tracking-wide">
          <div className="flex justify-between items-center gap-2">
            {forum.User?.image ? (
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={forum.User.image}
                  alt="avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ) : (
              <div className="w-6 h-6 rounded-full bg-white/85 text-black flex justify-center items-center font-medium font-sans p-2">
                {forum.User?.name?.split("")[0]}
              </div>
            )}
            <div className="text-[1rem] ml-2">{forum.User?.name}</div>
            <div className="text-sm text-white/60 ml-2 underline">
              {forum.User?.email?.split("@")[0]}
            </div>
          </div>
          <div className="text-white/90">{time}</div>
        </div>
        <div className="min-h-[4rem] my-3 text-white/80 leading-relaxed font-sans">
          {forum.data}
        </div>
        <div className="flex justify-between items-center text-xl mt-3 gap-3 text-white/70">
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
      <Separator className="my-6 bg-white/20" />
      <div className="h-auto border-0 p-2 px-3">
        <div className="min-h-[15rem] w-full border-[1px] gap-4 flex flex-col items-start justify-center border-[#1c2332] px-5 py-5">
          <div className="flex gap-2 items-center text-sm text-white/80">
            <MessageSquare />
            <p>ADD A COMMENT</p>
          </div>
          <Textarea
            value={commentTextInput || ""}
            className="min-h-[10rem] border-[.6px] border-white/40 focus-visible:ring-[2.5px] focus-within:border-blue-400/80 focus-visible:ring-blue-600/40 bg-transparent rounded-xs"
            style={{ height: "auto", resize: "vertical" }} // Added style attribute
            placeholder="Write your comment"
            onChange={(e) => setCommentTextInput(e.target.value)}
          />
          <div className="h-[3vh]  w-full flex justify-end items-center">
            <Button
              variant="default"
              className=" bg-[#131620] ring-[.7px] ring-[#849DFE] text-blue-400 hover:bg-[#161925] h-full min-w-[5vw] flex justify-center items-center gap-1 rounded-sm font-mono text-[.9rem]"
              aspect-auto
              onClick={createCommentHandler}
            >
              {isCreatingComment ? (
                <Loading />
              ) : (
                <p className="border-0 h-full  flex items-center justify-center font-mono my-2">
                  COMMENT
                </p>
              )}
            </Button>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default ForumPannel;
