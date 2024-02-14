import RedisClient from "./redis.service";

const redis = new RedisClient(6375);

const client = redis.client;

export default client;
