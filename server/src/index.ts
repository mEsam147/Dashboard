import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { ConnectionDatabase } from "./config/dbConnection";
import AnnouncementRoute from "./routes/announcement.route";
import quizRoute from "./routes/quiz.route";
import questionRoute from "./routes/question.route";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use("/api/announcement", AnnouncementRoute);
app.use("/api/quiz", quizRoute);
app.use("/api/question", questionRoute);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: "Internal server error" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  ConnectionDatabase();
});
