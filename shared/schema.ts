import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  password: text("password").notNull(),
  language: text("language").notNull().default("en"),
  isKycVerified: boolean("is_kyc_verified").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  fundName: text("fund_name").notNull(),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  navPrice: decimal("nav_price", { precision: 8, scale: 2 }).notNull(),
  units: decimal("units", { precision: 12, scale: 4 }).notNull(),
  status: text("status").notNull().default("completed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // 'investment', 'zakat', 'withdrawal'
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  description: text("description").notNull(),
  status: text("status").notNull().default("completed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const forumRooms = pgTable("forum_rooms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  memberCount: integer("member_count").notNull().default(0),
  lastActivity: timestamp("last_activity").defaultNow(),
});

export const forumThreads = pgTable("forum_threads", {
  id: serial("id").primaryKey(),
  roomId: integer("room_id").notNull(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  replyCount: integer("reply_count").notNull().default(0),
  upvotes: integer("upvotes").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ngoProjects = pgTable("ngo_projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  targetAmount: decimal("target_amount", { precision: 12, scale: 2 }).notNull(),
  currentAmount: decimal("current_amount", { precision: 12, scale: 2 }).notNull().default("0"),
  category: text("category").notNull(),
  deadline: text("deadline").notNull(),
});

export const prayerTimes = pgTable("prayer_times", {
  id: serial("id").primaryKey(),
  city: text("city").notNull(),
  fajr: text("fajr").notNull(),
  dhuhr: text("dhuhr").notNull(),
  asr: text("asr").notNull(),
  maghrib: text("maghrib").notNull(),
  isha: text("isha").notNull(),
  date: text("date").notNull(),
});

export const navData = pgTable("nav_data", {
  id: serial("id").primaryKey(),
  fundName: text("fund_name").notNull(),
  navValue: decimal("nav_value", { precision: 8, scale: 2 }).notNull(),
  date: timestamp("date").notNull(),
});

export const halalFunds = pgTable("halal_funds", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  riskLevel: text("risk_level").notNull(), // 'low', 'moderate', 'high'
  expectedReturn: decimal("expected_return", { precision: 5, scale: 2 }).notNull(),
  currentNav: decimal("current_nav", { precision: 8, scale: 2 }).notNull(),
  category: text("category").notNull(), // 'sukuk', 'equity', 'etf', 'balanced', 'money_market'
  minimumInvestment: decimal("minimum_investment", { precision: 10, scale: 2 }).notNull().default("1000"),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  createdAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertForumThreadSchema = createInsertSchema(forumThreads).omit({
  id: true,
  createdAt: true,
  replyCount: true,
  upvotes: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type ForumRoom = typeof forumRooms.$inferSelect;
export type ForumThread = typeof forumThreads.$inferSelect;
export type InsertForumThread = z.infer<typeof insertForumThreadSchema>;
export type NgoProject = typeof ngoProjects.$inferSelect;
export type PrayerTime = typeof prayerTimes.$inferSelect;
export type NavData = typeof navData.$inferSelect;
export type HalalFund = typeof halalFunds.$inferSelect;
