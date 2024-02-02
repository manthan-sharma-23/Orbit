import e from "express";
import ApiRoutes from "./api";
import { config } from "dotenv";
import { PORT } from "./utils/constants/config";
import http from "http";
import { WebSocketConfig } from "./services/socket/socket.service";

config();
const app = e();
const port = PORT;
const server = http.createServer(app);
WebSocketConfig(server);

app.use("/api", ApiRoutes);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
