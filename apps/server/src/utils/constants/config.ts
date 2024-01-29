import { config } from "dotenv";

config();

export const SECRET_KEY = process.env.SECRET_KEY || "";
export const PORT = process.env.PORT || 3020;
