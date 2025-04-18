import express from "express";
import cors from "cors";
import { router as buildRouter } from "./routes/buildRouter.js";
import morgan from "morgan";

const app = express();

app.use(
	cors({
		origin: true,
	})
);
app.use(express.json());

app.use(morgan(":status :method :url :response-time[2] ms"));

app.use("/api/builds", buildRouter);

export default app;
