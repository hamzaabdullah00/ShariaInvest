import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface InvestmentSliderProps {
  onAmountChange: (amount: number) => void;
}

export default function InvestmentSlider({ onAmountChange }: InvestmentSliderProps) {
  const [amount, setAmount] = useState(10000);

  const handleAmountChange = (value: number[]) => {
    const newAmount = value[0];
    setAmount(newAmount);
    onAmountChange(newAmount);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className="mx-4 mt-4 shadow-sm border border-gray-100">
      <CardHeader>
        <CardTitle>Investment Amount</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-olive mb-4">
            {formatAmount(amount)}
          </div>
          <Slider
            value={[amount]}
            onValueChange={handleAmountChange}
            max={100000}
            min={1000}
            step={1000}
            className="w-full investment-slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>₹1,000</span>
            <span>₹1,00,000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
