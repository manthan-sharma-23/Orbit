import { config } from "dotenv";

config();

export const SECRET_KEY = process.env.SECRET_KEY || "";
export const PORT = process.env.PORT || 3020;

export const RATELIMIT = Number(process.env.RATE_LIMIT) || 10;
export const REDIS_URL = process.env.REDIS_SERVER!;
