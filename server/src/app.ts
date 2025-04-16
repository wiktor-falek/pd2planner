import express from "express";
import cors from "cors";
import { router as buildRouter } from "./routes/buildRouter.js";

const app = express();

app.use(
	cors({
		origin: true,
	})
);
app.use(express.json());

app.use("/api/builds", buildRouter);

export default app;
