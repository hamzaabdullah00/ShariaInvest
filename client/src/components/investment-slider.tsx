import { Slider } from "@/components/ui/slider";

interface InvestmentSliderProps {
  value: number;
  onChange: (amount: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function InvestmentSlider({ 
  value,
  onChange,
  min = 1000,
  max = 100000,
  step = 1000
}: InvestmentSliderProps) {
  const handleAmountChange = (values: number[]) => {
    const newAmount = values[0];
    onChange(newAmount);
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold text-black mb-3">
          {formatAmount(value)}
        </div>
        <Slider
          value={[value]}
          onValueChange={handleAmountChange}
          max={max}
          min={min}
          step={step}
          className="w-full investment-slider mb-2"
        />
        <div className="flex justify-between text-xs text-black">
          <span>₹{min.toLocaleString('en-IN')}</span>
          <span>₹{max.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
}