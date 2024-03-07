import e from "express";
import ApiRoutes from "./api";
import { config } from "dotenv";
import { PORT } from "./utils/constants/config";
import http from "http";
import SocketService from "./services/socket/socket.service";

config();

// express api
const app = e();
const port = PORT;

// http server to serve web socket
const server = http.createServer(app);

// web socket
export const socketServer = new SocketService(server);
socketServer.listenWebSocketServerEvents(socketServer.wss);

//express api endpoint '/api'
app.use("/api", ApiRoutes);

//listening app on desired port
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
