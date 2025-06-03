import express, { type Request, type Response } from "express";
import { db } from "./db";
import { attendees, attendeesInsertSchema } from "./db/schema/attendee";
import "dotenv/config";
import pageNotFoundMiddleware from "./middlewares/404.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import validation from "./middlewares/validation.middleware";
import { feedback, feedbackInsertSchema } from "./db/schema/feedback";
import asyncWrap from "./utils/asyncWrapper";
import cors from "cors";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to TechWave '25 API" });
});

app.post(
  "/register",
  validation(attendeesInsertSchema),
  asyncWrap(async (req: Request, res: Response) => {
    const body = req.body;
    await db.insert(attendees).values(body);
  }),
);

app.post(
  "/feedbacks",
  validation(feedbackInsertSchema),
  asyncWrap(async (req: Request, res: Response) => {
    const body = req.body;
    await db.insert(feedback).values(body);
  }),
);

app.use(pageNotFoundMiddleware);
app.use(errorMiddleware);
app.listen(PORT, () => console.log(`app is running on ${PORT}`));
