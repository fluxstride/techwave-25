import type { Config } from "drizzle-kit";
import "dotenv/config";

const DB_URL =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_URL
    : process.env.PROD_DATABASE_URL;

export default {
  schema: "./src/db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: DB_URL as string,
  },
} satisfies Config;
