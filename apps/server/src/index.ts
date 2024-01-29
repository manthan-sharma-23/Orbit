import e from "express";
import ApiRoutes from "./api";
import { config } from "dotenv";
import { PORT } from "./utils/constants/config";

config();
const app = e();

const port = PORT;

app.use("/api", ApiRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
