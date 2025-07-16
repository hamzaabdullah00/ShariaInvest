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
      <header className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-olive rounded-full flex items-center justify-center">
            <i className="fas fa-mosque text-gold text-sm"></i>
          </div>
          <div>
            <h2 className="font-semibold text-lg">
              {translations.as_salamu_alaikum || "As-Salamu Alaikum"}
            </h2>
            <p className="text-gray-500 text-sm">{user?.fullName || "Loading..."}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Bell className="text-gray-400" size={20} />
          <div className="w-8 h-8 bg-gradient-to-br from-olive to-gold rounded-full"></div>
        </div>
      </header>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-olive to-charcoal mx-4 mt-4 rounded-xl p-6 text-white">
        <h3 className="text-xl font-semibold mb-2">
          {translations.welcome_to_barakah || "Welcome to Barakah"}
        </h3>
        <p className="text-sand opacity-90 text-sm">
          {translations.shariah_compliant || "Your trusted partner for Shariah-compliant investments and community engagement"}
        </p>
        <div className="mt-4 flex items-center space-x-2">
          <i className="fas fa-shield-alt text-gold"></i>
          <span className="text-sm">100% Shariah Certified</span>
        </div>
      </div>

      {/* Prayer Times Card */}
      <PrayerTimesCard />

      {/* Quick Actions */}
      <div className="mx-4 mt-4">
        <h4 className="font-semibold text-lg mb-3">
          {translations.quick_actions || "Quick Actions"}
        </h4>
        <div className="grid grid-cols-3 gap-4">
          <Link href="/invest">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center bg-white shadow-sm">
              <i className="fas fa-coins text-gold text-xl mb-2"></i>
              <span className="text-sm font-medium">{translations.invest || "Invest"}</span>
            </Button>
          </Link>
          <Button variant="outline" className="h-auto p-4 flex flex-col items-center bg-white shadow-sm">
            <i className="fas fa-hand-holding-heart text-green-600 text-xl mb-2"></i>
            <span className="text-sm font-medium">{translations.zakat || "Zakat"}</span>
          </Button>
          <Link href="/community">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center bg-white shadow-sm">
              <i className="fas fa-comments text-blue-600 text-xl mb-2"></i>
              <span className="text-sm font-medium">{translations.forums || "Forums"}</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-12"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === 'investment' ? 'bg-green-100' : 'bg-blue-100'
                    }`}>
                      <i className={`${
                        transaction.type === 'investment' 
                          ? 'fas fa-arrow-up text-green-600' 
                          : 'fas fa-hand-holding-heart text-blue-600'
                      } text-xs`}></i>
                    </div>
                    <div>
                      <p className="font-medium text-sm">
                        {transaction.type === 'investment' ? 'Investment Added' : 'Zakat Donated'}
                      </p>
                      <p className="text-gray-500 text-xs">{transaction.description}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-olive">₹{transaction.amount}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
