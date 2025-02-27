import { createClient } from "redis";
import config from "../config/configSetup";

export const client = createClient({ url: config.REDIS_INSTANCE_URL });
client.on("error", (err) => console.log("Redis Client Error", err));
(async () => await client.connect())();

export class Redis {
  public async setData(key: string, value: string, expiry: number = 3600) {
    await client.setEx(key, expiry, value);
  }

  public async getData(key: string) {
    return await client.get(key);
  }

  public async deleteData(key: string) {
    await client.del(key);
  }

  public async flush() {
    await client.flushAll();
  }
}
