import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import InvestmentSlider from "@/components/investment-slider";
import NavChart from "@/components/nav-chart";
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
      <div className="mb-6">
        <InvestmentSlider onAmountChange={setInvestmentAmount} />
      </div>
      {/* Projected Returns */}
      <Card className="bg-card text-card-foreground shadow-sm mx-4 border border-black rounded-lg mt-[13px] mb-[13px]" style={{ height: '210px' }}>
        <CardHeader className="flex flex-col space-y-1.5 p-6 pb-2 mt-[-15px] mb-[-15px]">
          <CardTitle className="section-header text-black">Projected Returns</CardTitle>
        </CardHeader>
        <CardContent className="pt-4 px-8 pb-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="text-center p-4 bg-white border border-black rounded-lg">
              <p className="text-xl font-bold text-black mb-2">8.5%</p>
              <p className="text-sm text-black">Annual Return</p>
            </div>
            <div className="text-center p-4 bg-white border border-black rounded-lg">
              <p className="text-xl font-bold text-black mb-2">95%</p>
              <p className="text-sm text-black">Capital Protection</p>
            </div>
          </div>
          <div className="flex justify-between items-center px-2">
            <span className="text-sm text-black">Expected Monthly:</span>
            <span className="font-semibold text-black">
              ₹{calculateReturns(investmentAmount).toFixed(0)}
            </span>
          </div>
        </CardContent>
      </Card>
      {/* NAV Chart */}
      <div className="mb-6">
        <NavChart />
      </div>
      
      {/* Investment CTA */}
      <div className="mx-4 mb-8">
        <Button 
          className="btn-primary mt-[29.5px] mb-[29.5px]"
          onClick={handleInvestment}
          disabled={investmentMutation.isPending}
        >
          {investmentMutation.isPending ? "Processing..." : "Confirm Investment"}
        </Button>
        <p className="text-center text-xs text-gray-600 mt-1">
          By investing, you agree to our terms and Barakah Fund guidelines
        </p>
      </div>
    </div>
  );
}
