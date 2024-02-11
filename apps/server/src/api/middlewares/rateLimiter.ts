import { NextFunction, Request, Response } from "express";
import { RATELIMIT, REDIS_PORT } from "../../utils/constants/config";
import RedisClient from "../../services/redis/redis.service";
import {
  INTERNAL_SERVER_ERROR,
  TOO_MANY_REQUESTS,
} from "../../utils/static/codes.err";

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ip = req.connection.remoteAddress?.slice(0, 6) as string;

  // Ensure redisClient is a commandable Redis client
  const redisClient = new RedisClient(REDIS_PORT);
  const redis = redisClient.client;

  try {
    const response = await redis.multi().incr(ip).expire(ip, 60).exec();

    if (response) {
      if (response[0]) {
        const hit = response[0][1] as number;
        if (hit > RATELIMIT) {
          return res
            .status(TOO_MANY_REQUESTS.code)
            .json(TOO_MANY_REQUESTS.action);
        }
      }
    } else {
      console.error("Redis response is undefined");
      return res
        .status(INTERNAL_SERVER_ERROR.code)
        .json(INTERNAL_SERVER_ERROR.action);
    }
  } catch (error) {
    console.error("Redis error in rateLimiter:", error);
    return res
      .status(INTERNAL_SERVER_ERROR.code)
      .json(INTERNAL_SERVER_ERROR.action);
  }

  next();
}
