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
    <Card className="mx-4 mt-4 border border-black rounded-lg" style={{ height: '120px' }}>
      <CardHeader className="flex flex-col space-y-1.5 p-6 mt-[-4px] mb-[-4px] pt-[18px] pb-[18px]">
        <CardTitle className="section-header text-black">Investment Amount</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0 mt-[-30px] mb-[-30px]">
        <div className="text-center">
          <div className="text-2xl font-bold text-black mb-2">
            {formatAmount(amount)}
          </div>
          <Slider
            value={[amount]}
            onValueChange={handleAmountChange}
            max={100000}
            min={1000}
            step={1000}
            className="w-full investment-slider mb-2"
          />
          <div className="flex justify-between text-xs text-black">
            <span>₹1,000</span>
            <span>₹1,00,000</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
