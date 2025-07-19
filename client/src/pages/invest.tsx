import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Shield, Target } from "lucide-react";
import { Link } from "wouter";
import type { HalalFund } from "@shared/schema";

export default function Invest() {
  const { data: halalFunds = [], isLoading } = useQuery<HalalFund[]>({
    queryKey: ["/api/halal-funds"],
  });

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
          <p className="text-gray-600">Loading halal investment options...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="pt-4 pb-4 px-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-black">Halal Investments</h1>
        <p className="text-sm text-gray-600">Choose from our Shariah-compliant investment options</p>
      </div>

      <div className="screen-content pb-24">
        {/* Investment Options */}
        <div className="px-4 pt-6 space-y-4">
          {halalFunds.map((fund) => (
            <Link key={fund.id} href={`/fund/${fund.id}`}>
              <Card className="border border-black rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <CardHeader className="pb-3 pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg text-black font-semibold">
                      {fund.name}
                    </CardTitle>
                    <Badge className={getRiskLevelColor(fund.riskLevel)}>
                      {fund.riskLevel} risk
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{fund.description}</p>
                </CardHeader>
                <CardContent className="pt-0 pb-6">
                  <div className="space-y-4">
                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Expected Return</p>
                          <p className="text-sm font-medium text-black">{Number(fund.expectedReturn).toFixed(1)}% p.a.</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Target className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-xs text-gray-500">Current NAV</p>
                          <p className="text-sm font-medium text-black">₹{Number(fund.currentNav).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Minimum Investment */}
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-gray-500" />
                      <div>
                        <p className="text-xs text-gray-500">Minimum Investment</p>
                        <p className="text-sm font-medium text-black">₹{Number(fund.minimumInvestment).toLocaleString('en-IN')}</p>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-between items-center pt-2">
                      <Button 
                        className="bg-black text-white hover:bg-gray-800"
                        size="sm"
                      >
                        Invest Now
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-black text-black hover:bg-black hover:text-white"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Explore More Funds Section */}
        <div className="mx-4 mt-8">
          <h3 className="text-lg font-semibold text-black mb-4">Explore More Funds</h3>
          <Card className="border border-black rounded-lg">
            <CardContent className="pt-6 pb-6">
              <div className="text-center">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h4 className="font-semibold text-black mb-2">Additional Investment Options</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Discover more halal investment opportunities tailored to your financial goals.
                </p>
                <Button className="bg-black text-white hover:bg-gray-800">
                  View All Funds
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Information Card */}
        <Card className="mx-4 mt-6 border border-black rounded-lg">
          <CardContent className="pt-6 pb-6">
            <div className="text-center">
              <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="font-semibold text-black mb-2">100% Shariah Compliant</h3>
              <p className="text-sm text-gray-600 mb-4">
                All our investment products are certified by Islamic scholars and comply with Shariah principles.
              </p>
              <div className="grid grid-cols-2 gap-4 text-xs text-gray-500">
                <div className="text-center">
                  <p className="font-medium text-black">No Riba</p>
                  <p>Interest-free investments</p>
                </div>
                <div className="text-center">
                  <p className="font-medium text-black">Halal Only</p>
                  <p>Ethically screened assets</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}