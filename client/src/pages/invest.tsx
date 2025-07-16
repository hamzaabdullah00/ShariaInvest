import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import InvestmentSlider from "@/components/investment-slider";
import type { InsertInvestment } from "@shared/schema";

export default function Invest() {
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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
    const navPrice = 12.45;
    const units = investmentAmount / navPrice;
    
    investmentMutation.mutate({
      userId: 1,
      fundName: "Barakah Equity Fund",
      amount: investmentAmount.toString(),
      navPrice: navPrice.toString(),
      units: units.toString(),
      status: "completed",
    });
  };

  const calculateReturns = (amount: number) => {
    const annualReturn = 8.5;
    const monthlyReturn = (amount * annualReturn) / (100 * 12);
    return monthlyReturn;
  };

  return (
    <div className="screen-content">
      {/* Header */}
      <div className="bg-white px-4 py-6 border-b border-gray-100">
        <h3 className="text-xl font-semibold mb-2">Shariah Investment</h3>
        <p className="text-gray-600 text-sm">Invest in halal, ethical opportunities</p>
      </div>

      {/* Investment Amount Slider */}
      <InvestmentSlider onAmountChange={setInvestmentAmount} />

      {/* Projected Returns */}
      <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Projected Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">8.5%</p>
              <p className="text-sm text-gray-600">Annual Return</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">95%</p>
              <p className="text-sm text-gray-600">Capital Protection</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gold bg-opacity-10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <i className="fas fa-certificate text-gold"></i>
              <span className="font-medium text-sm">Shariah Certified</span>
            </div>
            <p className="text-xs text-gray-600">
              This investment is verified and approved by our Shariah Advisory Board
            </p>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Expected Monthly Return:</span>
              <span className="font-semibold text-olive">
                ₹{calculateReturns(investmentAmount).toFixed(0)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fund Details */}
      <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
        <CardHeader>
          <CardTitle>Barakah Equity Fund</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Fund Size</span>
              <span className="font-medium">₹45.6 Cr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">NAV</span>
              <span className="font-medium text-green-600">₹12.45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Expense Ratio</span>
              <span className="font-medium">1.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Min Investment</span>
              <span className="font-medium">₹1,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Units to be allocated</span>
              <span className="font-medium">{(investmentAmount / 12.45).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment CTA */}
      <div className="mx-4 mt-4 mb-6">
        <Button 
          className="w-full bg-olive text-white hover:bg-olive/90 py-4 text-lg font-semibold shadow-lg"
          onClick={handleInvestment}
          disabled={investmentMutation.isPending}
        >
          {investmentMutation.isPending ? "Processing..." : "Confirm Investment"}
        </Button>
        <p className="text-center text-xs text-gray-500 mt-2">
          By investing, you agree to our terms and Shariah compliance guidelines
        </p>
      </div>
    </div>
  );
}
