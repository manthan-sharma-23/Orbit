import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import getFriends from "../controllers/friend-controller/getFriends.controller";
import { createForum } from "../controllers/forum-controller/createForum.controller";
import { getForums } from "../controllers/forum-controller/getForums.controller";
import { getForumById } from "../controllers/forum-controller/getForumfromId.controller";
import { createCommentToForum } from "../controllers/forum-controller/comments/createComment.controller";
import { voteForum } from "../controllers/forum-controller/user-forums/vote.controller";

const router: Router = Router();

router
  .post("/create", authUser, createForum)
  .get("/all", authUser, getForums)
  .put("/vote/:forumId", authUser, voteForum)
  .post("/comment", authUser, createCommentToForum)
  .get("/:forumId", authUser, getForumById);

export default router;
