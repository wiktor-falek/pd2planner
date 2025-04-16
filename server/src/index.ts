import app from "./app.js";
import { router as buildRouter } from "./routes/buildRouter.js";

const PORT = 8080;

app.use("/api/builds", buildRouter);

app.listen(PORT, "0.0.0.0", () => {
	console.log(`listening on localhost:${PORT}`);
});
