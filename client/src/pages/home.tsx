import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/lib/language-context";
import { Link } from "wouter";
import PrayerTimesCard from "@/components/prayer-times-card";
import type { User, Transaction } from "@shared/schema";

export default function Home() {
  const { translations } = useLanguage();
  
  const { data: user } = useQuery<User>({
    queryKey: ["/api/user"],
  });

  const { data: transactions, isLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const recentTransactions = transactions?.slice(0, 2) || [];

  return (
    <div className="screen-content">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex items-center justify-between border-b border-black">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <i className="fas fa-mosque text-white text-sm"></i>
          </div>
          <div>
            <h2 className="font-semibold text-lg text-black">
              {translations.as_salamu_alaikum || "As-Salamu Alaikum"}
            </h2>
            <p className="text-black text-sm">{user?.fullName || "Loading..."}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="text-black" size={20} />
          <div className="w-8 h-8 bg-black rounded-full"></div>
        </div>
      </header>
      {/* Welcome Banner */}
      <div className="bg-black mx-4 rounded-lg p-6 text-white border border-black mt-[7px] mb-[7px] pt-[20px] pb-[35px]" style={{ height: '140px' }}>
        <h3 className="text-xl font-semibold mb-2 text-white">
          {translations.welcome_to_barakah || "Welcome to Barakah"}
        </h3>
        <p className="text-white text-sm">
          {translations.shariah_compliant || "Your trusted partner for Shariah-compliant investments and community engagement"}
        </p>
        <div className="mt-2 flex items-center space-x-2">
          <i className="fas fa-shield-alt text-white"></i>
          <span className="text-sm text-white">100% Shariah Certified</span>
        </div>
      </div>
      {/* Prayer Times Card */}
      <PrayerTimesCard />
      {/* Quick Actions */}
      <div className="mx-4 mb-6">
        <h4 className="section-header text-black mb-4">
          {translations.quick_actions || "Quick Actions"}
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/invest" className="block">
            <Button variant="outline" className="w-full h-12 bg-white border-black text-black hover:bg-black hover:text-white flex items-center justify-center">
              <i className="fas fa-coins mr-2"></i>
              <span className="text-sm font-medium">{translations.invest || "Invest"}</span>
            </Button>
          </Link>
          <Button variant="outline" className="w-full h-12 bg-white border-black text-black hover:bg-black hover:text-white flex items-center justify-center">
            <i className="fas fa-hand-holding-heart mr-2"></i>
            <span className="text-sm font-medium">{translations.zakat || "Zakat"}</span>
          </Button>
          <Link href="/community" className="block">
            <Button variant="outline" className="w-full h-12 bg-white border-black text-black hover:bg-black hover:text-white flex items-center justify-center">
              <i className="fas fa-comments text-black mr-2"></i>
              <span className="text-sm font-medium">{translations.forums || "Forums"}</span>
            </Button>
          </Link>
          <Link href="/dashboard" className="block">
            <Button variant="outline" className="w-full h-12 bg-white border-black text-black hover:bg-black hover:text-white flex items-center justify-center">
              <i className="fas fa-chart-bar text-black mr-2"></i>
              <span className="text-sm font-medium">{translations.dashboard || "Dashboard"}</span>
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Recent Activity */}
      <Card className="mx-4 mb-8 border border-black rounded-lg" style={{ height: '160px' }}>
        <CardHeader className="pb-2">
          <CardTitle className="section-header text-black">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {isLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-10"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <i className={`${
                        transaction.type === 'investment' 
                          ? 'fas fa-arrow-up text-white' 
                          : 'fas fa-hand-holding-heart text-white'
                      } text-xs`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-black">
                        {transaction.type === 'investment' ? 'Investment Added' : 'Zakat Donated'}
                      </p>
                      <p className="text-black text-xs">{transaction.description}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-black">₹{transaction.amount}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
