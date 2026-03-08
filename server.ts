import express from "express";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, "data.json");

async function readData() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return { tickets: [], activities: [] };
  }
}

async function writeData(data: any) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/data", async (req, res) => {
    const data = await readData();
    res.json(data);
  });

  app.post("/api/tickets", async (req, res) => {
    const data = await readData();
    const newTicket = req.body;
    data.tickets = [newTicket, ...data.tickets];
    await writeData(data);
    res.json(newTicket);
  });

  app.put("/api/tickets/:id", async (req, res) => {
    const data = await readData();
    const { id } = req.params;
    const updates = req.body;
    data.tickets = data.tickets.map((t: any) => 
      t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t
    );
    await writeData(data);
    res.json({ success: true });
  });

  app.delete("/api/tickets/:id", async (req, res) => {
    const data = await readData();
    const { id } = req.params;
    data.tickets = data.tickets.filter((t: any) => t.id !== id);
    await writeData(data);
    res.json({ success: true });
  });

  app.post("/api/activities", async (req, res) => {
    const data = await readData();
    const newActivity = req.body;
    data.activities = [newActivity, ...data.activities].slice(0, 50);
    await writeData(data);
    res.json(newActivity);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
