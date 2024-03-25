import e, { Router } from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import userRouter from "./routes/user.routes";
import featureRouter from "./routes/feature.routes";
import roomRouter from "./routes/room.routes";
import messageRouter from "./routes/message.routes";
import teamRouter from "./routes/team.routes";
import spaceRouter from "./routes/space.routes";
import threadRouter from "./routes/thread.routes";
import mailRouter from "./routes/mail.routes";
import inviteRouter from "./routes/invite.routes";
import forumRouter from "./routes/forum.routes";

const router: Router = Router();

router
  .use(cors())
  .use(e.json())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(morgan(":method :url :status :res[content-length] - :response-time ms"))
  .use("/user", userRouter)
  .use("/feature", featureRouter)
  .use("/room", roomRouter)
  .use("/messages", messageRouter)
  .use("/team", teamRouter)
  .use("/space", spaceRouter)
  .use("/threads", threadRouter)
  .use("/mails", mailRouter)
  .use("/invites", inviteRouter)
  .use("/forums", forumRouter);

export default router;
