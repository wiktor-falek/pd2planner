import app from "./app.js";

const PORT = 8080;

app.listen(PORT, "0.0.0.0", () => {
	console.log(`listening on localhost:${PORT}`);
});
