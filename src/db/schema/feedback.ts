import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod/v4";

export const feedback = pgTable("feedbacks", {
  id: varchar("id").primaryKey().$defaultFn(uuidv4),
  rating: text().notNull(),
  feedback: text().notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const feedbackInsertSchema = createInsertSchema(feedback, {
  rating: (schema) => schema.min(1, "rating is required").trim(),
  feedback: (schema) => schema.min(1, "feedback is required").trim(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type NewMessageParams = z.infer<typeof feedbackInsertSchema>;
