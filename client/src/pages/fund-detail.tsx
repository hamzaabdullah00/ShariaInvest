import { useState, useRef } from "react";
import { useParams } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Shield, Target, PieChart, History } from "lucide-react";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import InvestmentSlider from "@/components/investment-slider";
import NavChart from "@/components/nav-chart";
import type { HalalFund, InsertInvestment, Transaction, Investment } from "@shared/schema";

export default function FundDetail() {
  const { id } = useParams();
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [manualAmount, setManualAmount] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  const { data: fund, isLoading } = useQuery<HalalFund>({
    queryKey: ["/api/halal-funds", id],
    enabled: !!id,
  });

  const { data: transactions = [] } = useQuery<Transaction[]>({
    queryKey: ["/api/transactions"],
  });

  const { data: investments = [] } = useQuery<Investment[]>({
    queryKey: ["/api/investments"],
  });

  const investmentMutation = useMutation({
    mutationFn: async (data: InsertInvestment) => {
      const response = await apiRequest("POST", "/api/investments", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Investment Successful",
        description: "Your investment has been processed successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/investments"] });
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
    },
    onError: () => {
      toast({
        title: "Investment Failed",
        description: "There was an error processing your investment. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInvestment = () => {
    if (!fund) return;
    
    const navPrice = Number(fund.currentNav);
    const units = investmentAmount / navPrice;
    
    investmentMutation.mutate({
      userId: 1,
      fundName: fund.name,
      amount: investmentAmount.toString(),
      navPrice: navPrice.toString(),
      units: units.toString(),
      status: "completed",
    });
  };

  const calculateReturns = (amount: number) => {
    if (!fund) return 0;
    const annualReturn = Number(fund.expectedReturn);
    const monthlyReturn = (amount * annualReturn) / (100 * 12);
    return monthlyReturn;
  };

  const handleManualEntry = () => {
    const amount = parseFloat(manualAmount);
    if (!isNaN(amount) && amount > 0) {
      const minInvestment = Number(fund?.minimumInvestment || 1000);
      if (amount < minInvestment) {
        toast({
          title: "Minimum Investment Required",
          description: `Minimum investment for this fund is ₹${minInvestment.toLocaleString('en-IN')}.`,
          variant: "destructive",
        });
        return;
      }
      setInvestmentAmount(amount);
      confirmButtonRef.current?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    } else {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid investment amount.",
        variant: "destructive",
      });
    }
    setManualAmount("");
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleManualEntry();
    }
  };

  const resetAmount = () => {
    const minInvestment = Number(fund?.minimumInvestment || 10000);
    setInvestmentAmount(minInvestment);
    setManualAmount("");
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fund details...</p>
        </div>
      </div>
    );
  }

  if (!fund) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Fund not found</p>
          <Link href="/invest">
            <Button className="bg-black text-white hover:bg-gray-800">
              Back to Investments
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Mock asset allocation data
  const assetAllocation = [
    { name: 'Islamic Equity', value: 45, color: '#374151' },
    { name: 'Sukuk Bonds', value: 30, color: '#6b7280' },
    { name: 'Cash & Commodities', value: 15, color: '#9ca3af' },
    { name: 'Real Estate (REITs)', value: 10, color: '#d1d5db' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-4 pb-4 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-2">
          <Link href="/invest">
            <Button variant="ghost" size="sm" className="p-1">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-black">{fund.name}</h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge className={getRiskLevelColor(fund.riskLevel)}>
                {fund.riskLevel} risk
              </Badge>
              <span className="text-sm text-gray-600">{fund.description}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="screen-content pb-24">
        {/* Investment Amount Section */}
        <Card className="mx-4 mt-6 border border-black rounded-lg">
          <CardHeader className="pb-3 pt-6">
            <CardTitle className="text-lg text-black">Investment Amount</CardTitle>
            <p className="text-sm text-gray-600">Choose your investment amount (Min: ₹{Number(fund.minimumInvestment).toLocaleString('en-IN')})</p>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="space-y-6">
              <InvestmentSlider 
                value={investmentAmount} 
                onChange={setInvestmentAmount}
                min={Number(fund.minimumInvestment)}
                max={500000}
                step={1000}
              />
              
              {/* Manual Input */}
              <div className="space-y-3">
                <p className="text-sm font-medium text-black">Enter amount manually:</p>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      value={manualAmount}
                      onChange={(e) => setManualAmount(e.target.value)}
                      onKeyDown={handleEnterPress}
                      className="border-black focus:ring-0 focus:border-black"
                    />
                  </div>
                  <Button
                    onClick={handleManualEntry}
                    className="bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 border-black"
                  >
                    Enter
                  </Button>
                  <Button
                    onClick={resetAmount}
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* Investment Summary */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Investment Amount:</span>
                    <span className="text-sm font-medium text-black">₹{investmentAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current NAV:</span>
                    <span className="text-sm font-medium text-black">₹{Number(fund.currentNav).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Units Allocated:</span>
                    <span className="text-sm font-medium text-black">{(investmentAmount / Number(fund.currentNav)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Expected Monthly Returns:</span>
                    <span className="text-sm font-medium text-black">₹{calculateReturns(investmentAmount).toFixed(0)}</span>
                  </div>
                </div>
              </div>

              {/* Confirm Investment Button */}
              <Button 
                ref={confirmButtonRef}
                onClick={handleInvestment}
                disabled={investmentMutation.isPending}
                className="w-full bg-black text-white hover:bg-gray-800 py-3"
                size="lg"
              >
                {investmentMutation.isPending ? "Processing..." : "Confirm Investment"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* NAV Performance Chart */}
        <Card className="mx-4 mt-6 border border-black rounded-lg">
          <CardHeader className="pb-3 pt-6">
            <CardTitle className="flex items-center text-lg text-black">
              <TrendingUp className="w-5 h-5 mr-2" />
              NAV Performance
            </CardTitle>
            <p className="text-sm text-gray-600">Historical Net Asset Value trends</p>
          </CardHeader>
          <CardContent className="pb-6">
            <NavChart fundName={fund.name} />
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card className="mx-4 mt-6 border border-black rounded-lg">
          <CardHeader className="pb-3 pt-6">
            <CardTitle className="flex items-center text-lg text-black">
              <PieChart className="w-5 h-5 mr-2" />
              Asset Allocation
            </CardTitle>
            <p className="text-sm text-gray-600">Fund portfolio breakdown</p>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="space-y-4">
              {assetAllocation.map((asset, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: asset.color }}
                    ></div>
                    <span className="text-sm text-black">{asset.name}</span>
                  </div>
                  <span className="text-sm font-medium text-black">{asset.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card className="mx-4 mt-6 border border-black rounded-lg">
          <CardHeader className="pb-3 pt-6">
            <CardTitle className="flex items-center text-lg text-black">
              <History className="w-5 h-5 mr-2" />
              Recent Transactions
            </CardTitle>
            <p className="text-sm text-gray-600">Your latest investment activities</p>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="space-y-3">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm text-black font-medium">{transaction.description}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.createdAt!).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-black">
                    ₹{Number(transaction.amount).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              {transactions.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">No transactions yet</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Fund Summary */}
        <Card className="mx-4 mt-6 border border-black rounded-lg">
          <CardHeader className="pb-3 pt-6">
            <CardTitle className="flex items-center text-lg text-black">
              <Shield className="w-5 h-5 mr-2" />
              Fund Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-black">{Number(fund.expectedReturn).toFixed(1)}%</p>
                <p className="text-sm text-gray-600">Expected Return</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-black">₹{Number(fund.currentNav).toFixed(2)}</p>
                <p className="text-sm text-gray-600">Current NAV</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-black">{fund.riskLevel}</p>
                <p className="text-sm text-gray-600">Risk Level</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-xl font-bold text-black">₹{Number(fund.minimumInvestment).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                <p className="text-sm text-gray-600">Min Investment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}