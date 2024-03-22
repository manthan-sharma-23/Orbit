import Redis from "ioredis";
import { MESSAGE, MESSAGE_TYPE } from "typings";
import { MESSAGE_CHANNEL } from "../../utils/constants/config";

export default class RedisClient {
  private _redis: Redis;

  constructor(port: number) {
    this._redis = new Redis({ port });
  }

  get client() {
    return this._redis;
  }
}
