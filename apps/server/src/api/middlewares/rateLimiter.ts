import { NextFunction, Request, Response } from "express";
import redisClient from "../../services/redis/redis";
import { Redis } from "ioredis";
import { RATELIMIT } from "../../utils/constants/config";

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const ip = req.connection.remoteAddress?.slice(0, 6) as string;

  // Ensure redisClient is a commandable Redis client
  const redis = redisClient as Redis;

  try {
    const response = await redis.multi().incr(ip).expire(ip, 60).exec();

    if (response) {
      if (response[0]) {
        const hit = response[0][1] as number;
        if (hit > RATELIMIT) {
          return res
            .status(429)
            .json({ message: "Too many requests persecond" });
        }
      }
    } else {
      console.error("Redis response is undefined");
      return res.status(500).json({ message: "Internal server error" });
    }
  } catch (error) {
    console.error("Redis error in rateLimiter:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

  next();
}
