import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "dotenv/config";

const DB_URL =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_URL
    : process.env.PROD_DATABASE_URL;

const client = postgres(DB_URL as string);
export const db = drizzle(client);
