import Redis from "ioredis";
import { MESSAGE, MESSAGE_TYPE } from "typings";
import { MESSAGE_CHANNEL } from "../../utils/constants/config";

export default class RedisClient {
  private prev_message: any = "";
  private _redis: Redis;

  constructor(port: number) {
    this._redis = new Redis({ port });
  }

  private _publish(channel: string, message: any) {
    this._redis.publish(channel, JSON.stringify(message));
  }

  private _subscribe(channel: string) {
    this._redis.subscribe(channel);
  }

  private _listenMessageEvent(callback: (message: MESSAGE) => void) {
    this._redis.on("message", (channel: string, message: string) => {
      // return { channel, message };
      if (message !== this.prev_message) {
        const msg: MESSAGE = JSON.parse(message);
        if (channel === MESSAGE_CHANNEL) callback(msg);
        this.prev_message = message;
      }
    });
  }

  get client() {
    return this._redis;
  }
  get publish() {
    return this._publish;
  }

  get listenMessageEvent() {
    return this._listenMessageEvent;
  }

  get subscriber() {
    return this._subscribe;
  }
}
