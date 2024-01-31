import Redis from "ioredis";
import { REDIS_URL } from "../../utils/constants/config";

const redisClient = new Redis(REDIS_URL);

export default redisClient;
