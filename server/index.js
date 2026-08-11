import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import trackRouter from "./track.js";
import mojoRouter from "./mojo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = Number(process.env.PORT) || 3000;
const distPath = path.join(__dirname, "..", "dist");

app.set("trust proxy", true);
app.use(express.json({ limit: "32kb" }));

app.use("/api", trackRouter);
app.use("/api/mojo", mojoRouter);

app.use(express.static(distPath, { maxAge: "1d", index: false }));

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  if (!process.env.MOJO_PASSWORD) {
    console.warn("MOJO_PASSWORD is not set — /mojo admin login disabled");
  }
});
