import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware";
import { sendMessageToDB } from "../controllers/message-controller/addMessage.controller";
import { fetchMessages } from "../controllers/message-controller/fetchMessages.controller";

const router: Router = Router();

router.get("/getmessages/:roomId", authUser, fetchMessages);
router.post("/sendmessage", authUser, sendMessageToDB);

export default router;
