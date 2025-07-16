import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import NavChart from "@/components/nav-chart";
import type { Transaction, NgoProject } from "@shared/schema";

export default function Dashboard() {
  const { data: transactions, isLoading: transactionsLoading } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const { data: ngoProjects, isLoading: projectsLoading } = useQuery<NgoProject[]>({
    queryKey: ["/api/ngo-projects"],
  });

  // Calculate portfolio values
  const investmentTransactions = transactions?.filter(t => t.type === 'investment') || [];
  const totalInvestment = investmentTransactions.reduce((sum, t) => sum + parseFloat(t.amount), 0);
  const currentValue = totalInvestment * 1.074; // 7.4% gain
  const gainAmount = currentValue - totalInvestment;
  const gainPercent = totalInvestment > 0 ? (gainAmount / totalInvestment) * 100 : 0;

  return (
    <div className="screen-content">
      {/* Portfolio Overview */}
      <div className="bg-black mx-4 mt-4 rounded-lg p-6 text-white border border-black" style={{ height: '140px' }}>
        <h3 className="text-lg font-semibold mb-4 text-white">Investment Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white opacity-80 text-sm">Total Investment</p>
            <p className="text-2xl font-bold text-white">₹{totalInvestment.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-white opacity-80 text-sm">Current Value</p>
            <p className="text-2xl font-bold text-white">₹{Math.round(currentValue).toLocaleString()}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <i className="fas fa-arrow-up text-white"></i>
          <span className="text-white font-medium">
            +{gainPercent.toFixed(2)}% (₹{Math.round(gainAmount).toLocaleString()})
          </span>
          <span className="text-white opacity-80 text-sm">This month</span>
        </div>
      </div>

      {/* NAV Chart */}
      <div className="mb-6">
        <NavChart />
      </div>

      {/* Asset Allocation */}
      <Card className="mx-4 mb-6 border border-black rounded-lg pt-[-1px] pb-[20px] mt-[80px]" style={{ height: '180px' }}>
        <CardHeader className="pb-2">
          <CardTitle className="section-header text-black">Asset Allocation</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
              <svg className="w-12 h-12" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#666" strokeWidth="2"/>
                <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#000" strokeWidth="2" strokeDasharray="35 65" strokeDashoffset="25"/>
                <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#000" strokeWidth="2" strokeDasharray="25 75" strokeDashoffset="60"/>
                <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#000" strokeWidth="2" strokeDasharray="20 80" strokeDashoffset="85"/>
              </svg>
            </div>
            <div className="flex-1 ml-4 space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Real Estate</span>
                <span className="text-sm font-medium text-black">35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">SMEs</span>
                <span className="text-sm font-medium text-black">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Venture Capital</span>
                <span className="text-sm font-medium text-black">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-black">Innovation</span>
                <span className="text-sm font-medium text-black">20%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="mx-4 mb-20 border border-black rounded-lg mt-[24px]" style={{ minHeight: '200px' }}>
        <CardHeader className="pb-2 flex-shrink-0">
          <CardTitle className="section-header text-black">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 overflow-y-auto" style={{ maxHeight: '180px' }}>
          {transactionsLoading ? (
            <div className="space-y-3 pr-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-12"></div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="h-3 bg-gray-200 rounded w-10 mb-1"></div>
                    <div className="h-2 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3 pr-2">
              {transactions?.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3 min-w-0 flex-1">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <i className={`${
                        transaction.type === 'investment' 
                          ? 'fas fa-plus text-white' 
                          : 'fas fa-hand-holding-heart text-white'
                      } text-xs`}></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm text-black truncate">
                        {transaction.type === 'investment' ? 'Investment' : 'Zakat Donation'}
                      </p>
                      <p className="text-black text-xs truncate">
                        {new Date(transaction.createdAt!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-semibold text-black text-sm">₹{transaction.amount}</p>
                    <p className="text-black text-xs">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
