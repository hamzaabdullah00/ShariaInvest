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
      <div className="bg-white px-4 py-6 border-b border-black">
        <h3 className="text-xl font-semibold mb-2 text-black">Shariah Investment</h3>
        <p className="text-black text-sm">Invest in halal, ethical opportunities</p>
      </div>

      {/* Investment Amount Slider */}
      <InvestmentSlider onAmountChange={setInvestmentAmount} />

      {/* Projected Returns */}
      <Card className="mx-4 mt-4 border border-black rounded-lg" style={{ height: '120px' }}>
        <CardHeader className="pb-2">
          <CardTitle className="section-header text-black">Projected Returns</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="text-center p-2 bg-white border border-black rounded-lg">
              <p className="text-lg font-bold text-black">8.5%</p>
              <p className="text-xs text-black">Annual Return</p>
            </div>
            <div className="text-center p-2 bg-white border border-black rounded-lg">
              <p className="text-lg font-bold text-black">95%</p>
              <p className="text-xs text-black">Capital Protection</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-black">Expected Monthly:</span>
            <span className="font-semibold text-black">
              ₹{calculateReturns(investmentAmount).toFixed(0)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Fund Details */}
      <Card className="mx-4 mt-4 border border-black rounded-lg" style={{ height: '120px' }}>
        <CardHeader className="pb-2">
          <CardTitle className="section-header text-black">Barakah Equity Fund</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-black text-sm">Fund Size</span>
              <span className="font-medium text-black text-sm">₹45.6 Cr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black text-sm">NAV</span>
              <span className="font-medium text-black text-sm">₹12.45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black text-sm">Expense Ratio</span>
              <span className="font-medium text-black text-sm">1.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-black text-sm">Units to be allocated</span>
              <span className="font-medium text-black text-sm">{(investmentAmount / 12.45).toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment CTA */}
      <div className="mx-4 mt-4 mb-6">
        <Button 
          className="btn-primary"
          onClick={handleInvestment}
          disabled={investmentMutation.isPending}
        >
          {investmentMutation.isPending ? "Processing..." : "Confirm Investment"}
        </Button>
        <p className="text-center text-xs text-black mt-2">
          By investing, you agree to our terms and Shariah compliance guidelines
        </p>
      </div>
    </div>
  );
}
