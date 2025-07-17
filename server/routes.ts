import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInvestmentSchema, insertTransactionSchema, insertForumThreadSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get current user (mock authentication)
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser(1); // Mock current user
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get user investments
  app.get("/api/investments", async (req, res) => {
    try {
      const investments = await storage.getUserInvestments(1);
      res.json(investments);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create investment
  app.post("/api/investments", async (req, res) => {
    try {
      const validatedData = insertInvestmentSchema.parse(req.body);
      const investment = await storage.createInvestment(validatedData);
      res.status(201).json(investment);
    } catch (error) {
      res.status(400).json({ message: "Invalid investment data" });
    }
  });

  // Get user transactions
  app.get("/api/transactions", async (req, res) => {
    try {
      const transactions = await storage.getUserTransactions(1);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create transaction
  app.post("/api/transactions", async (req, res) => {
    try {
      const validatedData = insertTransactionSchema.parse(req.body);
      const transaction = await storage.createTransaction(validatedData);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ message: "Invalid transaction data" });
    }
  });

  // Get forum rooms
  app.get("/api/forum/rooms", async (req, res) => {
    try {
      const rooms = await storage.getForumRooms();
      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get forum threads
  app.get("/api/forum/threads/:roomId", async (req, res) => {
    try {
      const roomId = parseInt(req.params.roomId);
      const threads = await storage.getForumThreads(roomId);
      res.json(threads);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Create forum thread
  app.post("/api/forum/threads", async (req, res) => {
    try {
      const validatedData = insertForumThreadSchema.parse(req.body);
      const thread = await storage.createForumThread(validatedData);
      res.status(201).json(thread);
    } catch (error) {
      res.status(400).json({ message: "Invalid thread data" });
    }
  });

  // Get NGO projects
  app.get("/api/ngo-projects", async (req, res) => {
    try {
      const projects = await storage.getNgoProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get prayer times
  app.get("/api/prayer-times/:city", async (req, res) => {
    try {
      const city = req.params.city;
      const prayerTimes = await storage.getPrayerTimes(city);
      if (!prayerTimes) {
        return res.status(404).json({ message: "Prayer times not found for this city" });
      }
      res.json(prayerTimes);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Get NAV data
  app.get("/api/nav-data/:fundName", async (req, res) => {
    try {
      const fundName = req.params.fundName;
      const period = req.query.period as string || "1M";
      let limit = 30;
      
      // Set limit based on period
      switch (period) {
        case "1W":
          limit = 7;
          break;
        case "1M":
          limit = 30;
          break;
        case "3M":
          limit = 90;
          break;
        case "1Y":
          limit = 365;
          break;
        default:
          limit = 30;
      }
      
      const navData = await storage.getNavData(fundName, limit);
      res.json(navData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
