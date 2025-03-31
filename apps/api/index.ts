import express from "express";
const app = express();

import { prisma } from "db/client";
import { auth } from "./middleware";

app.use(express.json());

app.get("/api/v1/website", auth, async (req, res) => {
  const userId = req.userId!;
  const { url } = req.body;
  const data = await prisma.website.create({
    data: {
      url,
      userId,
    },
  });
  res.json({
    id: data.id,
  });
});

app.get("/api/v1/website/status", auth, async (req, res) => {
  const websiteId = req.query.websiteId as unknown as string;
  const userId = req.userId;

  const data = prisma.website.findFirst({
    where: {
      id: websiteId,
      userId,
      disabled: false,
    },
    include: {
      ticks: true,
    },
  });
  res.json({
    data,
  });
});

app.get("api/v1/websites", async (req, res) => {
  const userId = req.userId;

  const websites = await prisma.website.findMany({
    where: {
      userId,
      disabled: false,
    },
  });
  res.json({
    websites,
  });
});

app.delete("api/v1/website", async (req, res) => {
  const websiteId = req.body.websiteId;
  const userId = req.userId;
  await prisma.website.update({
    where: {
      id: websiteId,
      userId,
    },
    data: {
      disabled: true,
    },
  });
});
app.listen(3001, () => {
  console.log("HTTP Server running on port 3001");
});
