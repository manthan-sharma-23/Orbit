import { REDIS_PORT } from "../../utils/constants/config";
import RedisClient from "./redis.service";

export const redis = new RedisClient(REDIS_PORT);

const client = redis.client;

export default client;
