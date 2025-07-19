import { 
  users, investments, transactions, forumRooms, forumThreads, ngoProjects, prayerTimes, navData,
  type User, type InsertUser, type Investment, type InsertInvestment, 
  type Transaction, type InsertTransaction, type ForumRoom, type ForumThread, 
  type InsertForumThread, type NgoProject, type PrayerTime, type NavData 
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Investments
  getUserInvestments(userId: number): Promise<Investment[]>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  
  // Transactions
  getUserTransactions(userId: number): Promise<Transaction[]>;
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  
  // Forum
  getForumRooms(): Promise<ForumRoom[]>;
  getForumThreads(roomId: number): Promise<ForumThread[]>;
  createForumThread(thread: InsertForumThread): Promise<ForumThread>;
  
  // NGO Projects
  getNgoProjects(): Promise<NgoProject[]>;
  
  // Prayer Times
  getPrayerTimes(city: string): Promise<PrayerTime | undefined>;
  
  // NAV Data
  getNavData(fundName: string, limit?: number): Promise<NavData[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private investments: Map<number, Investment>;
  private transactions: Map<number, Transaction>;
  private forumRooms: Map<number, ForumRoom>;
  private forumThreads: Map<number, ForumThread>;
  private ngoProjects: Map<number, NgoProject>;
  private prayerTimes: Map<string, PrayerTime>;
  private navData: Map<number, NavData>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.investments = new Map();
    this.transactions = new Map();
    this.forumRooms = new Map();
    this.forumThreads = new Map();
    this.ngoProjects = new Map();
    this.prayerTimes = new Map();
    this.navData = new Map();
    this.currentId = 1;
    this.seedData();
  }

  private seedData() {
    // Seed user
    const user: User = {
      id: 1,
      username: "ahmed_ibrahim",
      email: "ahmed.ibrahim@email.com",
      fullName: "Ahmed Ibrahim",
      password: "hashed_password",
      language: "en",
      isKycVerified: true,
      createdAt: new Date(),
    };
    this.users.set(1, user);

    // Seed forum rooms
    const rooms: ForumRoom[] = [
      { id: 1, name: "Finance Q&A", description: "Investment guidance & tips", icon: "fas fa-chart-line", memberCount: 1200, lastActivity: new Date() },
      { id: 2, name: "Local Events", description: "Community gatherings & events", icon: "fas fa-calendar-alt", memberCount: 856, lastActivity: new Date() },
      { id: 3, name: "Culture & Faith", description: "Islamic teachings & discussions", icon: "fas fa-mosque", memberCount: 2100, lastActivity: new Date() },
      { id: 4, name: "Education", description: "Learning & development", icon: "fas fa-book", memberCount: 945, lastActivity: new Date() },
    ];
    rooms.forEach(room => this.forumRooms.set(room.id, room));

    // Seed NGO projects
    const projects: NgoProject[] = [
      { id: 1, name: "Children's Education Fund", description: "Supporting underprivileged children's education", targetAmount: "100000", currentAmount: "68000", category: "education", deadline: "2025-12-31" },
      { id: 2, name: "Clean Water Initiative", description: "Providing clean water access to rural communities", targetAmount: "150000", currentAmount: "67500", category: "water", deadline: "2026-03-15" },
      { id: 3, name: "Healthcare Support", description: "Medical aid for elderly community members", targetAmount: "80000", currentAmount: "45000", category: "health", deadline: "2025-10-20" },
      { id: 4, name: "Mosque Renovation", description: "Renovating the community mosque", targetAmount: "200000", currentAmount: "125000", category: "infrastructure", deadline: "2025-09-30" },
      { id: 5, name: "Food Distribution", description: "Daily meals for underprivileged families", targetAmount: "60000", currentAmount: "38000", category: "food", deadline: "2025-08-15" },
    ];
    projects.forEach(project => this.ngoProjects.set(project.id, project));

    // Seed prayer times
    const prayerTime: PrayerTime = {
      id: 1,
      city: "Mumbai",
      fajr: "5:23 AM",
      dhuhr: "12:45 PM",
      asr: "4:30 PM",
      maghrib: "6:55 PM",
      isha: "8:10 PM",
      date: new Date().toISOString().split('T')[0],
    };
    this.prayerTimes.set("Mumbai", prayerTime);

    // Seed NAV data
    // Generate realistic NAV data with consistent upward trend
    const generateNavData = () => {
      const navPoints: NavData[] = [];
      let currentId = 1;
      let currentValue = 10.00;
      const now = new Date();
      
      // Generate data for 1 year with daily points
      for (let days = 365; days >= 0; days--) {
        const date = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
        
        // Add positive volatility (0% to +3% daily change)
        const changePercent = Math.random() * 0.03; // 0% to +3%
        currentValue = currentValue * (1 + changePercent);
        
        // Add consistent upward trend over time
        const trendFactor = 1 + (0.003 * (365 - days) / 365); // Stronger positive trend
        currentValue *= trendFactor;
        
        navPoints.push({
          id: currentId++,
          fundName: "Barakah Equity Fund",
          navValue: currentValue.toFixed(2),
          date: date
        });
      }
      
      return navPoints;
    };

    const navDataPoints = generateNavData();
    navDataPoints.forEach(data => this.navData.set(data.id, data));

    // Seed transactions
    const transactions: Transaction[] = [
      { id: 1, userId: 1, type: "investment", amount: "5000", description: "Investment in Barakah Fund", status: "completed", createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
      { id: 2, userId: 1, type: "zakat", amount: "1250", description: "Zakat donation to Children's Education Fund", status: "completed", createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
      { id: 3, userId: 1, type: "investment", amount: "10000", description: "Investment in Barakah Fund", status: "completed", createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) },
    ];
    transactions.forEach(transaction => this.transactions.set(transaction.id, transaction));

    this.currentId = 10;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, createdAt: new Date() };
    this.users.set(id, user);
    return user;
  }

  async getUserInvestments(userId: number): Promise<Investment[]> {
    return Array.from(this.investments.values()).filter(investment => investment.userId === userId);
  }

  async createInvestment(insertInvestment: InsertInvestment): Promise<Investment> {
    const id = this.currentId++;
    const investment: Investment = { ...insertInvestment, id, createdAt: new Date() };
    this.investments.set(id, investment);
    return investment;
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values())
      .filter(transaction => transaction.userId === userId)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createTransaction(insertTransaction: InsertTransaction): Promise<Transaction> {
    const id = this.currentId++;
    const transaction: Transaction = { ...insertTransaction, id, createdAt: new Date() };
    this.transactions.set(id, transaction);
    return transaction;
  }

  async getForumRooms(): Promise<ForumRoom[]> {
    return Array.from(this.forumRooms.values());
  }

  async getForumThreads(roomId: number): Promise<ForumThread[]> {
    return Array.from(this.forumThreads.values()).filter(thread => thread.roomId === roomId);
  }

  async createForumThread(insertThread: InsertForumThread): Promise<ForumThread> {
    const id = this.currentId++;
    const thread: ForumThread = { 
      ...insertThread, 
      id, 
      replyCount: 0, 
      upvotes: 0, 
      createdAt: new Date() 
    };
    this.forumThreads.set(id, thread);
    return thread;
  }

  async getNgoProjects(): Promise<NgoProject[]> {
    return Array.from(this.ngoProjects.values());
  }

  async getPrayerTimes(city: string): Promise<PrayerTime | undefined> {
    return this.prayerTimes.get(city);
  }

  async getNavData(fundName: string, limit: number = 30): Promise<NavData[]> {
    return Array.from(this.navData.values())
      .filter(data => data.fundName === fundName)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-limit);
  }
}

export const storage = new MemStorage();
