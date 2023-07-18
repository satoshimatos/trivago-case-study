import { Redis } from 'ioredis';

const redisClient = new Redis({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
});

function setCache(key: string, data: any, expirationTimeInSeconds: number): void {
    redisClient.set(key, JSON.stringify(data), 'EX', expirationTimeInSeconds);
}

async function getCache(key: string): Promise<any> {
    const cachedData = await redisClient.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
}

export { setCache, getCache };