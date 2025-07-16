export const mockPrayerTimes = {
  Mumbai: {
    fajr: "5:23 AM",
    dhuhr: "12:45 PM", 
    asr: "4:30 PM",
    maghrib: "6:55 PM",
    isha: "8:10 PM"
  }
};

export const mockNavData = [
  { date: "2023-09-01", value: 10.80 },
  { date: "2023-10-01", value: 11.20 },
  { date: "2023-11-01", value: 11.85 },
  { date: "2023-12-01", value: 12.10 },
  { date: "2024-01-01", value: 12.45 }
];

export const mockTransactions = [
  {
    id: 1,
    type: "investment",
    amount: 5000,
    description: "Investment in Barakah Fund", 
    date: "2023-12-15",
    status: "completed"
  },
  {
    id: 2,
    type: "zakat",
    amount: 1250,
    description: "Zakat donation to Children's Education Fund",
    date: "2023-12-12", 
    status: "completed"
  },
  {
    id: 3,
    type: "investment", 
    amount: 10000,
    description: "Investment in Barakah Fund",
    date: "2023-11-28",
    status: "completed"
  }
];

export const mockForumRooms = [
  {
    id: 1,
    name: "Finance Q&A",
    description: "Investment guidance & tips",
    icon: "fas fa-chart-line",
    memberCount: 1200,
    lastActivity: "2h ago"
  },
  {
    id: 2, 
    name: "Local Events",
    description: "Community gatherings & events",
    icon: "fas fa-calendar-alt", 
    memberCount: 856,
    lastActivity: "4h ago"
  },
  {
    id: 3,
    name: "Culture & Faith", 
    description: "Islamic teachings & discussions",
    icon: "fas fa-mosque",
    memberCount: 2100,
    lastActivity: "6h ago"
  },
  {
    id: 4,
    name: "Education",
    description: "Learning & development", 
    icon: "fas fa-book",
    memberCount: 945,
    lastActivity: "1d ago"
  }
];

export const mockNgoProjects = [
  {
    id: 1,
    name: "Children's Education Fund",
    description: "Supporting underprivileged children's education",
    targetAmount: 100000,
    raisedAmount: 68000,
    category: "education"
  },
  {
    id: 2,
    name: "Clean Water Initiative", 
    description: "Providing clean water access to rural communities",
    targetAmount: 150000,
    raisedAmount: 67500,
    category: "water"
  }
];
