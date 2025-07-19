import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowRight, TrendingUp, Shield, Target, Calculator, Heart, DollarSign } from "lucide-react";
import { Link } from "wouter";
import NavChart from "@/components/nav-chart";
import InvestmentSlider from "@/components/investment-slider";
import type { HalalFund, Investment } from "@shared/schema";

export default function Investments() {
  const [activeTab, setActiveTab] = useState<'my-portfolio' | 'zakat' | 'explore'>('my-portfolio');
  const [showInvestmentSection, setShowInvestmentSection] = useState(false);
  const [investmentAmount, setInvestmentAmount] = useState(5000);
  const [manualAmount, setManualAmount] = useState("5000");
  const confirmSectionRef = useRef<HTMLDivElement>(null);
  
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

  const handleInvestNowClick = () => {
    setShowInvestmentSection(true);
    setTimeout(() => {
      if (confirmSectionRef.current) {
        confirmSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleAmountChange = (amount: number) => {
    setInvestmentAmount(amount);
    setManualAmount(amount.toString());
  };

  const handleManualAmountChange = (value: string) => {
    setManualAmount(value);
    const numValue = parseInt(value) || 0;
    if (numValue >= 1000 && numValue <= 100000) {
      setInvestmentAmount(numValue);
    }
  };

  const resetAmount = () => {
    setInvestmentAmount(5000);
    setManualAmount("5000");
  };

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

  const FundSummaryCard = () => (
    <Card className="border border-black rounded-lg">
      <CardHeader className="pb-3 pt-6">
        <CardTitle className="text-lg text-black">Fund Summary</CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500">Asset Type</p>
              <p className="text-sm font-medium text-black">Halal Equity</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Risk Level</p>
              <p className="text-sm font-medium text-black">Moderate</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Launch Date</p>
              <p className="text-sm font-medium text-black">Jan 2020</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500">Fund Size</p>
              <p className="text-sm font-medium text-black">₹2,450 Cr</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Min Investment</p>
              <p className="text-sm font-medium text-black">₹1,000</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Exit Load</p>
              <p className="text-sm font-medium text-black">1% (&lt; 1 year)</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
      <div className="px-4 pt-4">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('my-portfolio')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'my-portfolio'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            My Portfolio
          </button>
          <button
            onClick={() => setActiveTab('zakat')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'zakat'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Zakat
          </button>
          <button
            onClick={() => setActiveTab('explore')}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'explore'
                ? 'border-black text-black'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Explore Funds (Phase 2)
          </button>
        </div>
      </div>

      <div className="screen-content pb-24">
        {activeTab === 'my-portfolio' && (
          <div className="px-4 pt-6 space-y-6">
            {/* Fund Name Header */}
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-black">Barakah Halal Fund</h2>
            </div>

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
                      ₹{totalInvestment > 0 ? totalInvestment.toLocaleString('en-IN', { maximumFractionDigits: 0 }) : '0'}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-300 mb-2">Current Value</p>
                    <p className="text-lg font-bold text-white">
                      ₹{currentValue > 0 ? currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 }) : '0'}
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

            {/* NAV Performance Chart */}
            <div className="-mx-4">
              <NavChart />
            </div>

            {/* Fund Summary Card */}
            <FundSummaryCard />

            {/* Invest Now Button */}
            <div className="pt-2">
              <Button
                onClick={handleInvestNowClick}
                className="w-full bg-black text-white hover:bg-gray-800 py-4 text-base font-medium"
              >
                Invest Now
              </Button>
            </div>

            {/* Investment Section */}
            {showInvestmentSection && (
              <div className="space-y-6 pt-4">
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Investment Amount</h3>
                  
                  {/* Manual Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-black mb-2">
                      Enter Amount (₹)
                    </label>
                    <Input
                      type="number"
                      value={manualAmount}
                      onChange={(e) => handleManualAmountChange(e.target.value)}
                      className="border-black focus:border-black focus:ring-black text-lg font-medium"
                      placeholder="5000"
                      min="1000"
                      max="100000"
                    />
                  </div>

                  {/* Investment Slider */}
                  <div className="mb-8">
                    <InvestmentSlider
                      value={investmentAmount}
                      onChange={handleAmountChange}
                      min={1000}
                      max={100000}
                      step={1000}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4 mb-6">
                    <Button
                      onClick={handleAmountChange.bind(null, investmentAmount)}
                      className="flex-1 bg-black text-white hover:bg-gray-800 h-12"
                    >
                      Enter
                    </Button>
                    <Button
                      onClick={resetAmount}
                      variant="outline"
                      className="flex-1 border-black text-black hover:bg-black hover:text-white h-12"
                    >
                      Reset
                    </Button>
                  </div>
                </div>

                {/* Confirm Investment Section */}
                <div ref={confirmSectionRef} className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-black mb-4">Confirm Investment</h3>
                  <Card className="border border-black rounded-lg">
                    <CardContent className="pt-6 pb-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Investment Amount</span>
                          <span className="text-base font-semibold text-black">₹{investmentAmount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Current NAV</span>
                          <span className="text-base font-semibold text-black">₹12.45</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Units Allocated</span>
                          <span className="text-base font-semibold text-black">{(investmentAmount / 12.45).toFixed(2)}</span>
                        </div>
                        <div className="pt-4">
                          <Button className="w-full bg-black text-white hover:bg-gray-800 py-4 text-base font-medium">
                            Confirm Investment
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'zakat' && (
          <div className="px-4 pt-6 space-y-6">
            {/* Calculate Zakat Card */}
            <Card className="border border-black rounded-lg">
              <CardHeader className="pb-3 pt-6">
                <CardTitle className="flex items-center text-black text-lg">
                  <Calculator className="mr-3" size={20} />
                  Calculate Zakat
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <p className="text-sm text-gray-600 mb-4">Calculate your annual zakat obligation based on your wealth</p>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Calculate My Zakat
                </Button>
              </CardContent>
            </Card>

            {/* Start Zakat SIP Card */}
            <Card className="border border-black rounded-lg">
              <CardHeader className="pb-3 pt-6">
                <CardTitle className="flex items-center text-black text-lg">
                  <DollarSign className="mr-3" size={20} />
                  Start Zakat SIP
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <p className="text-sm text-gray-600 mb-4">Set up automatic monthly zakat contributions</p>
                <Button className="w-full bg-black text-white hover:bg-gray-800">
                  Setup Monthly Zakat
                </Button>
              </CardContent>
            </Card>

            {/* Current Zakat Summary */}
            <Card className="border border-black rounded-lg">
              <CardHeader className="pb-3 pt-6">
                <CardTitle className="flex items-center text-black text-lg">
                  <Heart className="mr-3" size={20} />
                  Your Zakat Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 pb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-black">₹8,500</p>
                    <p className="text-sm text-gray-600">Total Zakat Given</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-black">3</p>
                    <p className="text-sm text-gray-600">Causes Supported</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-black">Supported Causes:</p>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>• Education for underprivileged children</p>
                    <p>• Healthcare for elderly community members</p>
                    <p>• Clean water projects in rural areas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Donation Options */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-black">Donate Zakat</h3>
              
              <Card className="border border-black rounded-lg">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-black">By NGO</h4>
                      <p className="text-sm text-gray-600">Choose specific organizations</p>
                    </div>
                    <Button className="bg-black text-white hover:bg-gray-800">
                      Browse NGOs
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-black rounded-lg">
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-black">By Cause</h4>
                      <p className="text-sm text-gray-600">Support meaningful causes</p>
                    </div>
                    <Button 
                      onClick={() => setActiveTab('explore')}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      View Causes
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'explore' && (
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