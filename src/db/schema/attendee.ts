import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod/v4";

export const attendees = pgTable("attendees", {
  id: varchar("id").primaryKey().$defaultFn(uuidv4),
  name: text().notNull(),
  email: text().notNull(),
  phoneNumber: text("phone_number").notNull(),
  level: text("level").notNull(),
  department: text("department").notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const attendeesInsertSchema = createInsertSchema(attendees, {
  name: (schema) => schema.min(1, "name is required").trim(),
  email: (schema) => z.email("email is required"),
  phoneNumber: (schema) => schema.min(1, "phone number is required").trim(),
  department: (schema) => schema.min(1, "department is required").trim(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type NewMessageParams = z.infer<typeof attendeesInsertSchema>;
