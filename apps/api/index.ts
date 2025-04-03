import express from "express";
const app = express();

import { prisma } from "db/client";
import { auth } from "./middleware";
import cors from "cors";
import { requestLogger } from "./requestLogger";

app.use(cors());
app.use(express.json());
app.use(requestLogger)


// Creating a new website URL
app.post("/api/v1/website", auth, async (req, res) => {
  try {
    const userId = req.userId!;
    const { url } = req.body;
    const data = await prisma.website.create({
      data: { userId:"1",url  },
    });
    res.json({ id: data.id });
  } catch (error) {
    console.error("Error creating website:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Getting website status
app.get("/api/v1/website/status", auth, async (req, res) => {
  try {
    const websiteId = req.query.websiteId as string;
    const userId = req.userId;

    const data = await prisma.website.findFirst({
      where: { id: websiteId, userId, disabled: false },
      include: { ticks: true },
    });

    if (!data) {
      res.status(404).json({ error: "Website not found" });
      return;
    }

    res.json({ data });
  } catch (error) {
    console.error("Error fetching website status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetching all websites
app.get("/api/v1/websites", auth, async (req, res) => {
  try {
    const userId = req.userId;
    const websites = await prisma.website.findMany({
      where: { userId:"1", disabled: false },
      include: { ticks: true },
    });
    res.json({ websites });
  } catch (error) {
    console.error("Error fetching websites:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Deleting a website (soft delete)
app.delete("/api/v1/website", auth, async (req, res) => {
  try {
    const websiteId = req.body.websiteId;
    const userId = req.userId;

    const website = await prisma.website.findFirst({
      where: { id: websiteId, userId, disabled: false },
    });
    if (!website) {
      res.status(404).json({ error: "Website not found" });
      return
    }

    await prisma.website.update({
      where: { id: websiteId },
      data: { disabled: true },
    });

    res.json({ message: "Website deleted successfully" });
  } catch (error) {
    console.error("Error deleting website:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(8080, () => {
  console.log("HTTP Server running on port 8080");
});
