import Dotenv from "dotenv-safe"

Dotenv.load({sample: ".env"})

export const PORT = process.env.PORT
export const HOST = process.env.HOSTNAME
export const DATABASE_URL = process.env.DATABASE_URL

export const REDIS_HOST = process.env.REDIS_HOST || "redis"
export const REDIS_PORT = process.env.REDIS_PORT || "6379"

export const AUTH_TOKEN = process.env.AUTH_TOKEN
