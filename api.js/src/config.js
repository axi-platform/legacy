export const PORT = process.env.PORT || "3000"
export const HOST = process.env.HOSTNAME || "localhost"
export const DATABASE_URL = process.env.DATABASE_URL || "mongodb://mongodb:27017/axi"

export const REDIS_HOST = process.env.REDIS_HOST || "redis"
export const REDIS_PORT = process.env.REDIS_PORT || "6379"

// A star at dawn, a bubble in a stream,
// A flash of lightning in a summer cloud,
// A flickering lamp, a phantom, and a dream.
// - Kama Sutra 868

// Appreciate this moment as a Human Being.
// Do what you think is right.

const DEFAULT_TOKEN = "astaratdawnabubbleinastreamaflashoflightninginasummercloud"
export const AUTH_TOKEN = process.env.AUTH_TOKEN || DEFAULT_TOKEN
