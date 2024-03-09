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
  .use("/space", spaceRouter);

export default router;
