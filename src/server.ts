import { initDB } from "./database";
import app from "./main";

const PORT = process.env.PORT || 4000;
const BASE_URL = process.env.BASEURL || "http://localhost";

async function startServer() {
  try {
    await initDB();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server started on ${BASE_URL}:${PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("Shutting down server...");
      server.close(() => {
        console.log("Server shut down.");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}
startServer();
