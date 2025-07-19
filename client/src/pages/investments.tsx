import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Shield, Target } from "lucide-react";
import { Link } from "wouter";
import type { HalalFund, Investment } from "@shared/schema";

export default function Investments() {
  const [activeTab, setActiveTab] = useState<'my-portfolio' | 'explore'>('my-portfolio');
  
  const { data: halalFunds = [] } = useQuery<HalalFund[]>({
    queryKey: ["/api/halal-funds"],
  });

  const { data: investments = [] } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
  });

  // Calculate portfolio metrics
  const totalInvestment = investments.reduce((sum, inv) => sum + Number(inv.amount), 0);
  const currentValue = investments.reduce((sum, inv) => {
    // Mock current value calculation with 8.5% annual growth
    const monthsHeld = Math.floor((Date.now() - new Date(inv.createdAt!).getTime()) / (1000 * 60 * 60 * 24 * 30));
    const monthlyReturn = 0.085 / 12; // 8.5% annual return divided by 12 months
    return sum + (Number(inv.amount) * Math.pow(1 + monthlyReturn, monthsHeld));
  }, 0);
  
  const totalReturn = currentValue - totalInvestment;
  const cagr = totalInvestment > 0 ? ((totalReturn / totalInvestment) * 100) : 0;

  // Group investments by fund
  const investmentsByFund = investments.reduce((acc, inv) => {
    const existing = acc.find(item => item.fundName === inv.fundName);
    if (existing) {
      existing.totalAmount += Number(inv.amount);
      existing.investments.push(inv);
    } else {
      acc.push({
        fundName: inv.fundName,
        totalAmount: Number(inv.amount),
        investments: [inv]
      });
    }
    return acc;
  }, [] as { fundName: string; totalAmount: number; investments: Investment[] }[]);

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const PortfolioFundCard = ({ fundData }: { fundData: { fundName: string; totalAmount: number; investments: Investment[] } }) => {
    const monthsHeld = Math.floor((Date.now() - new Date(fundData.investments[0].createdAt!).getTime()) / (1000 * 60 * 60 * 24 * 30));
    const monthlyReturn = 0.085 / 12; // 8.5% annual return
    const currentValue = fundData.totalAmount * Math.pow(1 + monthlyReturn, monthsHeld);
    const returns = currentValue - fundData.totalAmount;
    const returnPercent = (returns / fundData.totalAmount) * 100;

    const fund = halalFunds.find(f => f.name === fundData.fundName);

    return (
      <Link href={`/fund/${fund?.id || 1}`}>
        <Card className="border border-black rounded-lg hover:bg-gray-50 transition-colors cursor-pointer mb-4">
          <CardHeader className="pb-3 pt-6">
            <div className="flex justify-between items-start mb-2">
              <CardTitle className="text-lg text-black font-semibold">
                {fundData.fundName}
              </CardTitle>
              <Badge className="bg-black text-white">
                Invested
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0 pb-6">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500">Current Value</p>
                <p className="text-sm font-medium text-black">₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Invested</p>
                <p className="text-sm font-medium text-black">₹{fundData.totalAmount.toLocaleString('en-IN')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Returns</p>
                <p className="text-sm font-medium" style={{ color: returnPercent >= 0 ? '#B2D2A4' : '#ff6b6b' }}>
                  {returnPercent >= 0 ? '+' : ''}{returnPercent.toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  };

  const ExploreFundCard = ({ fund }: { fund: HalalFund }) => (
    <Link key={fund.id} href={`/fund/${fund.id}`}>
      <Card className="border border-black rounded-lg hover:bg-gray-50 transition-colors cursor-pointer mb-6">
        <CardHeader className="pb-4 pt-8">
          <div className="flex justify-between items-start mb-3">
            <CardTitle className="text-lg text-black font-semibold">
              {fund.name}
            </CardTitle>
            <Badge className={getRiskLevelColor(fund.riskLevel)}>
              {fund.riskLevel} risk
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{fund.description}</p>
        </CardHeader>
        <CardContent className="pt-0 pb-8">
          <div className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Expected Return</p>
                  <p className="text-sm font-medium text-black">{Number(fund.expectedReturn).toFixed(1)}% p.a.</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-xs text-gray-500">Min Investment</p>
                  <p className="text-sm font-medium text-black">₹{Number(fund.minInvestment).toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            {/* Shariah Compliance */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Shariah Compliant</span>
              </div>
              <div className="text-right">
                <Button 
                  className="bg-black text-white hover:bg-gray-800 text-xs px-4 py-2"
                  size="sm"
                >
                  Invest Now
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <div className="pt-4 pb-4 px-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">My Investments</h1>
        <p className="text-sm text-gray-600">Manage your halal investment portfolio</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-white sticky top-0 z-10">
        <button
          onClick={() => setActiveTab('my-portfolio')}
          className={`flex-1 py-4 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'my-portfolio'
              ? 'border-black text-black bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          My Portfolio
        </button>
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex-1 py-4 px-4 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'explore'
              ? 'border-black text-black bg-white'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Explore Funds
        </button>
      </div>

      <div className="screen-content pb-24">
        {activeTab === 'my-portfolio' ? (
          <div className="px-4 pt-6 space-y-6">
            {/* Portfolio Summary Card */}
            <Card className="bg-black text-white rounded-lg border-0">
              <CardHeader className="pb-4 pt-8">
                <CardTitle className="text-lg text-white">Portfolio Summary</CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-8">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-xs text-gray-300 mb-2">Total Invested</p>
                    <p className="text-lg font-bold text-white">
                      ₹{totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-300 mb-2">Current Value</p>
                    <p className="text-lg font-bold text-white">
                      ₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-300 mb-2">CAGR</p>
                    <p className="text-lg font-bold" style={{ color: cagr >= 0 ? '#B2D2A4' : '#ff6b6b' }}>
                      {cagr >= 0 ? '+' : ''}{cagr.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investment Fund Cards */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black">My Fund Holdings</h3>
              {investmentsByFund.length > 0 ? (
                investmentsByFund.map((fundData, index) => (
                  <PortfolioFundCard key={index} fundData={fundData} />
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No investments yet</p>
                  <Button 
                    onClick={() => setActiveTab('explore')}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    Explore Investment Options
                  </Button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="px-4 pt-6">
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-black mb-2">Halal Investment Options</h3>
                <p className="text-sm text-gray-600">Choose from our Shariah-compliant investment funds</p>
              </div>
              {halalFunds.map((fund) => (
                <ExploreFundCard key={fund.id} fund={fund} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}