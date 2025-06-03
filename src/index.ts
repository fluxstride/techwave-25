import express, { response, type Request, type Response } from "express";
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
app.use(cors({ origin: "https://techwave-25.vercel.app" }));

app.get("/", (req, res) => {
  res.json({ success: true, message: "Welcome to TechWave '25 API" });
});

app.post(
  "/register",
  validation(attendeesInsertSchema),
  asyncWrap(async (req: Request, res: Response) => {
    const body = req.body;
    await db.insert(attendees).values(body);
    res.status(201).json({
      status: true,
      message: "Attendance recorded successfully",
    });
  }),
);

app.post(
  "/feedbacks",
  validation(feedbackInsertSchema),
  asyncWrap(async (req: Request, res: Response) => {
    const body = req.body;
    await db.insert(feedback).values(body);
    res.status(201).json({
      status: true,
      message: "Feedback recorded successfully",
    });
  }),
);

app.use(pageNotFoundMiddleware);
app.use(errorMiddleware);
// app.listen(PORT, () => console.log(`app is running on ${PORT}`));

export default app;
