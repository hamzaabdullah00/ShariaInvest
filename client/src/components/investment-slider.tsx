import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface InvestmentSliderProps {
  onAmountChange: (amount: number) => void;
  manualAmount: string;
  setManualAmount: (amount: string) => void;
  onManualEntry: () => void;
  onManualReset: () => void;
}

export default function InvestmentSlider({ 
  onAmountChange, 
  manualAmount, 
  setManualAmount, 
  onManualEntry, 
  onManualReset 
}: InvestmentSliderProps) {
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
    <Card className="mx-4 mt-4 border border-black rounded-lg" style={{ height: '250px' }}>
      <CardHeader className="flex flex-col space-y-1.5 px-6 pt-4 pb-2">
        <CardTitle className="section-header text-black">Investment Amount</CardTitle>
      </CardHeader>
      <CardContent className="px-6 pt-0 pb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-black mb-3">
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
          <div className="flex justify-between text-xs text-black mb-4">
            <span>₹1,000</span>
            <span>₹1,00,000</span>
          </div>
          
          {/* Manual Entry Section */}
          <div className="mt-3 space-y-2">
            <Input
              type="number"
              placeholder="Enter amount manually"
              value={manualAmount}
              onChange={(e) => setManualAmount(e.target.value)}
              className="w-full text-black border-black text-sm h-8"
              min="1"
              step="1"
            />
            <div className="flex gap-2">
              <Button 
                onClick={onManualEntry}
                className="flex-1 text-xs h-7"
                style={{ 
                  backgroundColor: 'var(--accent-green)', 
                  color: 'white',
                  borderColor: 'var(--accent-green)'
                }}
              >
                Enter
              </Button>
              <Button 
                onClick={onManualReset}
                variant="outline"
                className="flex-1 border-black text-black hover:bg-gray-100 text-xs h-7"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
