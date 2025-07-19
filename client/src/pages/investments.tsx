import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import NavChart from "@/components/nav-chart";
import type { Transaction, NgoProject } from "@shared/schema";

export default function Investments() {
  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const { data: ngoProjects = [] } = useQuery<NgoProject[]>({
    queryKey: ["/api/ngo-projects"],
  });

  const investmentTransactions = transactions.filter(t => t.type === 'investment');
  const totalInvested = investmentTransactions.reduce((sum, t) => sum + t.amount, 0);
  const currentValue = totalInvested * 1.074; // 7.4% gain
  const totalGain = currentValue - totalInvested;

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="pt-4 pb-4 px-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">My Investments</h1>
        <p className="text-sm text-gray-600">Track your Shariah-compliant investment portfolio</p>
      </div>

      <div className="screen-content pb-24">
        {/* Portfolio Overview */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg" style={{ minHeight: '180px' }}>
          <CardHeader className="pb-4 pt-8">
            <CardTitle className="section-header text-black">Portfolio Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-0 pb-8 px-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Current Value</p>
                <p className="text-2xl font-bold text-black">₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">Total Invested</p>
                <p className="text-2xl font-bold text-black">₹{totalInvested.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 mb-1">Total Gain</p>
              <p className="text-lg font-semibold" style={{ color: '#18A558' }}>
                +₹{totalGain.toLocaleString('en-IN', { maximumFractionDigits: 0 })} (+7.40%)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* NAV Chart */}
        <NavChart />

        {/* Asset Allocation */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg" style={{ minHeight: '200px' }}>
          <CardHeader className="pb-4 pt-6">
            <CardTitle className="section-header text-black">Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-black">Barakah Equity Fund</span>
                <span className="text-sm text-black">65%</span>
              </div>
              <Progress value={65} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-black">Barakah Sukuk Fund</span>
                <span className="text-sm text-black">25%</span>
              </div>
              <Progress value={25} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-black">Barakah Commodity Fund</span>
                <span className="text-sm text-black">10%</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg" style={{ minHeight: '240px' }}>
          <CardHeader className="pb-4 pt-6">
            <CardTitle className="section-header text-black">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-6" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <div className="space-y-3">
              {investmentTransactions.slice(-5).reverse().map((transaction, index) => (
                <div key={transaction.id || index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                      <i className="fas fa-arrow-up text-white text-xs"></i>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-black">{transaction.description}</p>
                      <p className="text-xs text-gray-600">Investment • Today</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-black">₹{transaction.amount.toLocaleString('en-IN')}</p>
                    <p className="text-xs" style={{ color: '#18A558' }}>+2.48%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Fund Summary */}
        <Card className="mx-4 mt-6 mb-6 border border-black rounded-lg" style={{ minHeight: '180px' }}>
          <CardHeader className="pb-4 pt-6">
            <CardTitle className="section-header text-black">Fund Summary</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 pb-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Current NAV</p>
                <p className="text-xl font-bold text-black">₹2,458.36</p>
                <p className="text-xs" style={{ color: '#18A558' }}>+7.40%</p>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">52W High</p>
                <p className="text-xl font-bold text-black">₹2,845.22</p>
                <p className="text-xs text-gray-600">15 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}